using System.ComponentModel.DataAnnotations;

namespace EmployeeApi.DTOs;

public record EmployeeListItemDto(
    int ID,
    string Name,
    string Email,
    string? Phone,
    string? JobTitle,
    bool IsActive,
    DateTime CreatedAt,
    CompanyDto Company
);

public record EmployeeDetailDto(
    int ID,
    string Name,
    string Email,
    string? Phone,
    string? JobTitle,
    int CompanyID,
    bool IsActive,
    DateTime CreatedAt,
    CompanyDto Company
);

public class EmployeeCreateDto
{
    [Required, StringLength(255)]
    public string Name { get; set; } = null!;

    [Required, EmailAddress, StringLength(255)]
    public string Email { get; set; } = null!;

    [Phone, StringLength(50)]
    public string? Phone { get; set; }

    [StringLength(255)]
    public string? JobTitle { get; set; }

    [Range(1, int.MaxValue)]
    public int CompanyID { get; set; }

    public bool IsActive { get; set; } = true;
}

public class EmployeeUpdateDto : EmployeeCreateDto { }
