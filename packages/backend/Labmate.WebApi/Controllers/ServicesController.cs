using Labmate.Persistence;
using Labmate.Persistence.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Labmate.WebApi.Controllers;

[ApiController]
[Route("api/services")]
public class ServicesController : ControllerBase
{
	private readonly LabmateContext _dbContext;

	public ServicesController(LabmateContext dbContext)
	{
		_dbContext = dbContext;
	}

	[HttpGet]
	[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<Service>))]
	public async Task<IActionResult> GetServices(CancellationToken cancellationToken) =>
		Ok(await _dbContext.Services.Include(s => s.StatusCheckConfiguration).ToListAsync(cancellationToken));

	[HttpGet("{id:guid}")]
	[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Service))]
	[ProducesResponseType(StatusCodes.Status404NotFound)]
	public async Task<IActionResult> GetService(Guid id, CancellationToken cancellationToken)
	{
		var service = await _dbContext.Services
			.Include(s => s.StatusCheckConfiguration)
			.SingleOrDefaultAsync(s => s.Id == id, cancellationToken);

		return service == null
			? NotFound()
			: Ok(service);
	}

	[HttpPost]
	[ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Service))]
	[ProducesResponseType(StatusCodes.Status400BadRequest)]
	public async Task<IActionResult> CreateService(Service service, CancellationToken cancellationToken)
	{
		if (service.Id != Guid.Empty)
		{
			return BadRequest("Id must be empty");
		}

		_dbContext.Services.Add(service);
		await _dbContext.SaveChangesAsync(cancellationToken);
		return CreatedAtAction(nameof(GetService), new { id = service.Id }, service);
	}

	[HttpPut("{id:guid}")]
	[ProducesResponseType(StatusCodes.Status204NoContent)]
	[ProducesResponseType(StatusCodes.Status400BadRequest)]
	[ProducesResponseType(StatusCodes.Status404NotFound)]
	public async Task<IActionResult> UpdateService(Guid id, Service service, CancellationToken cancellationToken)
	{
		if (id != service.Id)
		{
			return BadRequest("Id mismatch");
		}

		var serviceExists = await _dbContext.Services.AnyAsync(s => s.Id == id, cancellationToken);
		if (!serviceExists)
		{
			return NotFound();
		}
		
		// the id of the status check configuration is not delivered by the client
		var statusCheckConfigurationId = await _dbContext.Services
			.Include(s => s.StatusCheckConfiguration)
			.Where(s => s.Id == id)
			.Select(s => s.StatusCheckConfiguration.Id)
			.SingleAsync(cancellationToken);

		service.StatusCheckConfiguration.Id = statusCheckConfigurationId;

		_dbContext.Services.Update(service);
		await _dbContext.SaveChangesAsync(cancellationToken);
		return NoContent();
	}

	[HttpDelete("{id:guid}")]
	[ProducesResponseType(StatusCodes.Status204NoContent)]
	[ProducesResponseType(StatusCodes.Status404NotFound)]
	public async Task<IActionResult> DeleteService(Guid id, CancellationToken cancellationToken)
	{
		var service = await _dbContext.Services.FindAsync(new object[] { id }, cancellationToken);
		if (service == null)
		{
			return NotFound();
		}

		_dbContext.Services.Remove(service);
		await _dbContext.SaveChangesAsync(cancellationToken);
		return NoContent();
	}
}