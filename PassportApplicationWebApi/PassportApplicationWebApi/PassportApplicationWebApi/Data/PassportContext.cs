using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PassportApplicationWebApi.Models;
using System.Reflection.Emit;

namespace PassportApplicationWebApi.Data
{
    public class PassportContext : IdentityDbContext<ApplicationUser>
    {
        public PassportContext(DbContextOptions<PassportContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Passport> Passports { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Complaint> Complaints { get; set; }
        public DbSet<NewPassportApplication> PassportApplications { get; set; }
        public DbSet<PaymentDetails> PaymentDetails { get; set; }
        public DbSet<ApplicantDetails> ApplicantsDetails { get; set; }
        public DbSet<AddressDetails> AddressDetails { get; set; }
        public DbSet<EmergencyContactDetails> EmergencyContactDetails { get; set; }
        public DbSet<Documents> Documents { get; set; }
        public DbSet<FamilyDetails> FamilyDetails { get; set; }
        public DbSet<RenewalPassportApplication> RenewalPassportApplications { get; set; }



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
                .HasMany(u => u.Feedbacks)
                .WithOne(f => f.User)
                .HasForeignKey(f => f.UserId);

            builder.Entity<User>()
                .HasMany(u => u.Complaints)
                .WithOne(c => c.User)
                .HasForeignKey(c => c.UserId);

            builder.Entity<User>()
            .HasOne(u => u.NewRenewalApplication)
            .WithOne(r => r.User)
            .HasForeignKey<User>(u => u.RenewalApplicationId)
            .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<User>()
           .HasOne(u => u.NewPassportApplication)
           .WithOne(r => r.User)
           .HasForeignKey<User>(u => u.NewPassportApplicationId)
           .OnDelete(DeleteBehavior.NoAction);
        }

    }


}
