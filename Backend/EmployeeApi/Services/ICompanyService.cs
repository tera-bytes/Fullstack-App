using EmployeeApi.DTOs;

namespace EmployeeApi.Services;

public interface ICompanyService
{
    Task<IEnumerable<CompanyDto>> GetAllAsync(CancellationToken ct);
}
