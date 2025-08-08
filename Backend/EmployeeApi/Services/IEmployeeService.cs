using EmployeeApi.DTOs;

namespace EmployeeApi.Services;

//define crud functions
public interface IEmployeeService
{
    Task<Pagination<EmployeeListItemDto>> GetAllAsync(string? search, int page, int pageSize, CancellationToken ct);
    Task<EmployeeDetailDto?> GetByIdAsync(int id, CancellationToken ct);
    Task<EmployeeDetailDto> CreateAsync(EmployeeCreateDto dto, CancellationToken ct);
    Task<bool> UpdateAsync(int id, EmployeeUpdateDto dto, CancellationToken ct);
    Task<bool> DeleteAsync(int id,  CancellationToken ct);
}
