using System.Text.Json.Serialization;


namespace EmployeeApi.Models;

// create the company model based on sql schema
public class Company
{
    public int ID { get; set; }
    public string CompanyName { get; set; } = null!;
    public string Domain { get; set; } = null!;
    public string? Industry { get; set; }
    public string? Website { get; set; }
    

}
