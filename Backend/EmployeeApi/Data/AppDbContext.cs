using EmployeeApi.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Company> Companies { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
{
            // Companies
            modelBuilder.Entity<Company>(entity =>
            {
                entity.ToTable("Companies");
                entity.HasKey(c => c.ID);
                entity.Property(c => c.ID).HasColumnName("ID");
                entity.Property(c => c.CompanyName).HasColumnName("CompanyName");
                entity.Property(c => c.Domain).HasColumnName("Domain");
                entity.Property(c => c.Industry).HasColumnName("Industry");
                entity.Property(c => c.Website).HasColumnName("Website");

            });

            // Employees
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.ToTable("Employees");
                entity.HasKey(e => e.ID);
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.Name).HasColumnName("Name");
                entity.Property(e => e.Email).HasColumnName("Email");
                entity.Property(e => e.Phone).HasColumnName("Phone");
                entity.Property(e => e.JobTitle).HasColumnName("JobTitle");
                entity.Property(e => e.CompanyID).HasColumnName("CompanyID");
                entity.Property(e => e.IsActive).HasColumnName("IsActive");
                entity.Property(e => e.CreatedAt).HasColumnName("CreatedAt");


                // foreign key
                entity.HasOne<Company>()
                    .WithMany()
                    .HasForeignKey(e => e.CompanyID)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }


    }
}
