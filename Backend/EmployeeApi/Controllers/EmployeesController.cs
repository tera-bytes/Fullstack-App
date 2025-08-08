using EmployeeApi.DTOs;
using EmployeeApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    private readonly IEmployeeService _svc;
    public EmployeesController(IEmployeeService svc) => _svc = svc;

    /// lists with pagination and optional search
    [HttpGet]
    public async Task<ActionResult<Pagination<EmployeeListItemDto>>> GetAll(
        [FromQuery] string? search,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        CancellationToken ct = default)
        => await _svc.GetAllAsync(search, page, pageSize, ct);

    ///get single employee 
    [HttpGet("{id:int}")]
    public async Task<ActionResult<EmployeeDetailDto>> GetById(int id, CancellationToken ct)
    {
        var dto = await _svc.GetByIdAsync(id, ct);
        return dto is null ? NotFound() : dto; // returning dto will be 200
    }

    /// post request
    [HttpPost]
    public async Task<ActionResult<EmployeeDetailDto>> Create([FromBody] EmployeeCreateDto dto, CancellationToken ct)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);
        var created = await _svc.CreateAsync(dto, ct);
        return CreatedAtAction(nameof(GetById), new { id = created.ID }, created);
    }

    /// update by id
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] EmployeeUpdateDto dto, CancellationToken ct)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);
        var ok = await _svc.UpdateAsync(id, dto, ct);
        return ok ? NoContent() : NotFound();
    }

    ///deletes by id
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
        => (await _svc.DeleteAsync(id, ct)) ? NoContent() : NotFound();
}
