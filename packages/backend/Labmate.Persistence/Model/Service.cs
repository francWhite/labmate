using Labmate.Persistence.Converters;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Labmate.Persistence.Model;

public class Service
{
	public Guid Id { get; set; }
	public string Name { get; set; } = default!;
	public string Url { get; set; } = default!;
	public string? IconUrl { get; set; }
	public string? Version { get; set; }
	public Status Status { get; set; } = Status.Inactive;
	public StatusCheckConfiguration StatusCheckConfiguration { get; set; } = new();
}

public class ServiceEntityTypeConfiguration : IEntityTypeConfiguration<Service>
{
	public void Configure(EntityTypeBuilder<Service> builder)
	{
		builder.Property(p => p.Status).HasConversion<StatusEnumConverter>();
	}
}