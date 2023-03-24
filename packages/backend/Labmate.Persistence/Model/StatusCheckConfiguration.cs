using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Labmate.Persistence.Model;

public class StatusCheckConfiguration
{
	public Guid Id { get; set; }
	public bool Enabled { get; set; }
	public int? Interval { get; set; }
	public string? CheckUrl { get; set; }
}

public class StatusCheckConfigurationEntityTypeConfiguration : IEntityTypeConfiguration<StatusCheckConfiguration>
{
	public void Configure(EntityTypeBuilder<StatusCheckConfiguration> builder)
	{
		builder.ToTable("StatusCheckConfigurations");
	}
}