namespace EmployeeApi.Models;

public class Company
{
    public int ID { get; set; }
    public string CompanyName { get; set; } = null!;
    public string Domain { get; set; } = null!;
    public string? Industry { get; set; }
    public string? Website { get; set; }

    public ICollection<Employee>? Employees { get; set; }
}
