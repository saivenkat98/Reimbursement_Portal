using Microsoft.EntityFrameworkCore;
using ReimbursementAPI.Models;

namespace ReimbursementAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Reimbursement> Reimbursements { get; set; }
    }
}