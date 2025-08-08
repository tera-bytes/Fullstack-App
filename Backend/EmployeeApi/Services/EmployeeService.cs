using EmployeeApi.Data;
using EmployeeApi.DTOs;
using Microsoft.EntityFrameworkCore;

namespace EmployeeApi.Services;

public class EmployeeService : IEmployeeService
{
    private readonly AppDbContext _db;
    public EmployeeService(AppDbContext db) => _db = db;

    //searchable and paged list of employees
    public async Task<Pagination<EmployeeListItemDto>> GetAllAsync(string? search, int page, int pageSize, CancellationToken ct)
    {
        page = Math.Max(page, 1);
        pageSize = Math.Clamp(pageSize, 1, 100);

        // Join companies found for each employee with the employee data
        var q = from e in _db.Employees.AsNoTracking()
                join c in _db.Companies.AsNoTracking() on e.CompanyID equals c.ID
                select new { e, c };

        //match by search keywords
        if (!string.IsNullOrWhiteSpace(search))
        {
            //  case-insensitive
            q = q.Where(x =>
                EF.Functions.ILike(x.e.Name, $"%{search}%") ||
                EF.Functions.ILike(x.e.Email, $"%{search}%") ||
                (x.e.JobTitle != null && EF.Functions.ILike(x.e.JobTitle, $"%{search}%"))
            );
        }

        var total = await q.CountAsync(ct);

        //one page of items wrapped in employee list dto
        var items = await q.OrderBy(x => x.e.ID)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new EmployeeListItemDto(
                x.e.ID, x.e.Name, x.e.Email, x.e.Phone, x.e.JobTitle,
                x.e.IsActive, x.e.CreatedAt,
                new CompanyDto(x.c.ID, x.c.CompanyName, x.c.Domain, x.c.Industry, x.c.Website) // aggregate company info
            ))
            .ToListAsync(ct);

        //return all pages of items
        return new Pagination<EmployeeListItemDto>
        {
            Items = items,
            Page = page,
            PageSize = pageSize,
            TotalItems = total
        };
    }

    //show employee details by id, also nest company details
    public async Task<EmployeeDetailDto?> GetByIdAsync(int id, CancellationToken ct)
    {
        return await (from e in _db.Employees.AsNoTracking()
                      join c in _db.Companies.AsNoTracking() on e.CompanyID equals c.ID
                      where e.ID == id
                      select new EmployeeDetailDto(
                          e.ID, e.Name, e.Email, e.Phone, e.JobTitle, e.CompanyID,
                          e.IsActive, e.CreatedAt,
                          new CompanyDto(c.ID, c.CompanyName, c.Domain, c.Industry, c.Website)
                      )).FirstOrDefaultAsync(ct);
    }

    //post request
    public async Task<EmployeeDetailDto> CreateAsync(EmployeeCreateDto dto, CancellationToken ct)
    {
        // validate input
        if (!await _db.Companies.AnyAsync(c => c.ID == dto.CompanyID, ct))
            throw new ArgumentException("CompanyID does not exist.");

        if (await _db.Employees.AnyAsync(e => EF.Functions.ILike(e.Email, dto.Email), ct))
            throw new ArgumentException("Email already exists.");

        
        //map dto to ef entity

        var e = new Models.Employee
        {
            Name = dto.Name.Trim(),
            Email = dto.Email.Trim(),
            Phone = dto.Phone?.Trim(),
            JobTitle = dto.JobTitle?.Trim(),
            CompanyID = dto.CompanyID,
            IsActive = dto.IsActive,
            CreatedAt = DateTime.UtcNow
        };

        _db.Employees.Add(e);
        await _db.SaveChangesAsync(ct);

        return (await GetByIdAsync(e.ID, ct))!;
    }

    //update existing employee
    public async Task<bool> UpdateAsync(int id, EmployeeUpdateDto dto, CancellationToken ct)
    {   
        //fetch employee by id e
        var e = await _db.Employees.FindAsync(new object?[] { id }, ct);
        if (e == null) return false;
        
        //validate changes
        if (e.CompanyID != dto.CompanyID &&
            !await _db.Companies.AnyAsync(c => c.ID == dto.CompanyID, ct))
            throw new ArgumentException("CompanyID does not exist.");

        if (!string.Equals(e.Email, dto.Email, StringComparison.OrdinalIgnoreCase) &&
            await _db.Employees.AnyAsync(x => EF.Functions.ILike(x.Email, dto.Email) && x.ID != id, ct))
            throw new ArgumentException("Email already exists.");
        

        //update
        e.Name = dto.Name.Trim();
        e.Email = dto.Email.Trim();
        e.Phone = dto.Phone?.Trim();
        e.JobTitle = dto.JobTitle?.Trim();
        e.CompanyID = dto.CompanyID;
        e.IsActive = dto.IsActive;

        await _db.SaveChangesAsync(ct);
        return true;
    }

    //delete request
    public async Task<bool> DeleteAsync(int id, CancellationToken ct)
    {
        //find object and validate
        var e = await _db.Employees.FindAsync(new object?[] { id }, ct);
        if (e == null) return false;
        //remove employee
        _db.Employees.Remove(e);
        await _db.SaveChangesAsync(ct);
        return true;
    }
}
