using Microsoft.EntityFrameworkCore;

namespace CalculateApi.Models
{
    public class CalculateContext : DbContext
    {
        public CalculateContext(DbContextOptions<CalculateContext> options)
            : base(options)
        {
        }

        public DbSet<Calculate> calculates { get; set; }
    }
}