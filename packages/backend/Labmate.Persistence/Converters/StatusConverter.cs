using Labmate.Persistence.Model;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Labmate.Persistence.Converters;

public class StatusEnumConverter : ValueConverter<Status, string>
{
	public StatusEnumConverter() : base(
		status => status.ToString(), 
		statusString => Enum.Parse<Status>(statusString))
	{
	}
}