namespace EmployeeApi.DTOs;

public class Pagination<T>
{
    public IReadOnlyList<T> Items { get; init; } = Array.Empty<T>();
    public int Page { get; init; }
    public int PageSize { get; init; }
    public int TotalItems { get; init; }
    public int TotalPages => (int)Math.Ceiling((double)TotalItems / Math.Max(1, PageSize));
}
