using Microsoft.AspNetCore.Identity;
using PassportApplicationWebApi.Models;

namespace PassportApplicationWebApi.Data
{
    public class SeedData
    {
        public static async Task Initialize(IServiceProvider serviceProvider, UserManager<ApplicationUser> userManager)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            // Seed roles
            string[] roleNames = { "Admin", "User" };
            foreach (var roleName in roleNames)
            {
                if (!await roleManager.RoleExistsAsync(roleName))
                {
                    await roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }

            // Seed an admin user
            var adminUser = new ApplicationUser
            {
                UserName = "Admin@gmail.com",
                Email = "Admin@gmail.com"
            };
            var user = await userManager.FindByEmailAsync(adminUser.Email);
            if (user == null)
            {
                var CreateAdmin = await userManager.CreateAsync(adminUser, "Admin@123");
                if (CreateAdmin.Succeeded)
                {
                    await userManager.AddToRoleAsync(adminUser, "Admin");
                }
            }
        }
    }
}
