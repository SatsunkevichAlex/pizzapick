using Common.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace DatabaseInserter
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Composition> Compositions { get; set; }
        public DbSet<Pizza> Pizzas { get; set; }
        public DbSet<Params> Params { get; set; }
        public DbSet<Producer> Producers { get; set; }

        public ApplicationContext()
        {
            //Database.EnsureDeleted();
            //Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(Config.GetConnectinString());
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Composition>().Property(d => d.Content).HasConversion(
                v => JsonConvert.SerializeObject(v),
                v => JsonConvert.DeserializeObject<List<string>>(v));
        }
    }
}
