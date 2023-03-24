using Labmate.Persistence.Model;
using Microsoft.EntityFrameworkCore;

namespace Labmate.Persistence;

public class LabmateContext : DbContext
{
	private readonly string _dbPath;

	public LabmateContext()
	{
		var folder = Environment.SpecialFolder.LocalApplicationData; //TODO: move to configuration
		var path = Environment.GetFolderPath(folder);
		_dbPath = Path.Join(path, "labmate.db");
	}

	public DbSet<Service> Services => Set<Service>();

	protected override void OnConfiguring(DbContextOptionsBuilder options) =>
		options.UseSqlite($"Data Source={_dbPath}");

	protected override void OnModelCreating(ModelBuilder modelBuilder) =>
		modelBuilder.ApplyConfigurationsFromAssembly(typeof(LabmateContext).Assembly);
}