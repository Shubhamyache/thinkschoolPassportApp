using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PassportApplicationWebApi.Models;

namespace PassportApplicationWebApi.Data
{
    public class PassportContext: IdentityDbContext<ApplicationUser>
    {
       public PassportContext(DbContextOptions<PassportContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Passport> Passports { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Complaint> Complaints { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Configure the relationship between ApplicationUser and User(one to one)
            builder.Entity<ApplicationUser>()
                .HasOne(a => a.User)
                .WithOne(u => u.AppUser)
                .HasForeignKey<User>(u => u.UserId);

            // Configure the relationship between User and Passport
            builder.Entity<User>()
                .HasOne(u => u.Passport)  // Each User has one Passport
                .WithMany()               // Passport does not have a collection of Users
                .HasForeignKey(u => u.PassportId)  // The foreign key in the User table
                .OnDelete(DeleteBehavior.Cascade); // Set delete behavior if desired


            builder.Entity<User>()
                .HasMany(u=>u.Feedbacks)
                .WithOne(f=>f.User)
                .HasForeignKey(f=>f.UserId);

            builder.Entity<User>()
                .HasMany(u=>u.Complaints)
                .WithOne(c=>c.User)
                .HasForeignKey(c=>c.UserId);
        }

    }

    
}
