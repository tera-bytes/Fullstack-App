namespace EmployeeApi.DTOs;

public record CompanyDto(
    int ID,
    string CompanyName,
    string Domain,
    string? Industry,
    string? Website
);
