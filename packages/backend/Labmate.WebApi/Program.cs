using Labmate.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Labmate.WebApi;

public static class Program
{
	public static async Task Main(string[] args)
	{
		var builder = WebApplication.CreateBuilder(args);

		builder.Services.AddControllers();
		builder.Services.AddEndpointsApiExplorer();
		builder.Services.AddSwaggerGen();
		builder.Services.AddCors();
		builder.Services.AddSpaStaticFiles(
			configuration =>
			{
				var rootPath = builder.Configuration.GetValue<string>("ClientRootPath")!;
				configuration.RootPath = rootPath;
			});

		builder.Services.AddDbContext<LabmateContext>();

		var app = builder.Build();

		if (app.Environment.IsDevelopment())
		{
			app.UseSwagger();
			app.UseSwaggerUI();
			app.UseCors(o => o.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader());
		}

		app.UseAuthorization();
		app.MapControllers();

		app.UseStaticFiles();
		app.UseSpaStaticFiles();
		app.UseSpa(c => c.Options.SourcePath = app.Configuration.GetValue<string>("ClientSourcePath"));

		if (app.Environment.IsProduction())
		{
			await MigrateDatabaseAsync(app);
		}

		await app.RunAsync();
	}

	private static async Task MigrateDatabaseAsync(WebApplication app)
	{
		await using var scope = app.Services.CreateAsyncScope();
		var dbContext = scope.ServiceProvider.GetRequiredService<LabmateContext>();
		var pendingMigrations = (await dbContext.Database.GetPendingMigrationsAsync(app.Lifetime.ApplicationStopped))
			.ToList();

		if (pendingMigrations.Any())
		{
			app.Logger.LogInformation(
				"Pending migrations: {PendingMigrations}",
				pendingMigrations.Aggregate((a, b) => $"{a}, {b}"));

			app.Logger.LogInformation("Migrating database...");
			await dbContext.Database.MigrateAsync(app.Lifetime.ApplicationStopped);
			app.Logger.LogInformation("Migration complete.");
		}
	}
}