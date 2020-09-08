using Microsoft.Extensions.Configuration;
using System.IO;

namespace DatabaseInserter
{
    internal static class Config
    {
        internal static string GetConnectinString()
        {
            var builder = new ConfigurationBuilder();
            builder.SetBasePath(Directory.GetCurrentDirectory());
            builder.AddJsonFile("appsettings.json");
            var config = builder.Build();
            return config.GetConnectionString("DefaultConnection");
        }
    }
}
