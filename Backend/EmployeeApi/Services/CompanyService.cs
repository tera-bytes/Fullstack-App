using EmployeeApi.Data;
using EmployeeApi.DTOs;
using Microsoft.EntityFrameworkCore;

namespace EmployeeApi.Services;

public class CompanyService : ICompanyService
{
    private readonly AppDbContext _db;
    public CompanyService(AppDbContext db) => _db = db;

    public async Task<IEnumerable<CompanyDto>> GetAllAsync(CancellationToken ct)
        => await _db.Companies.AsNoTracking()
            .OrderBy(c => c.CompanyName)
            .Select(c => new CompanyDto(c.ID, c.CompanyName, c.Domain, c.Industry, c.Website))
            .ToListAsync(ct);
}
