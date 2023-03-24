using Labmate.Persistence;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Services.AddDbContext<LabmateContext>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();
app.UseCors(o => o.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader());

if (app.Environment.IsProduction())
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

app.Run();