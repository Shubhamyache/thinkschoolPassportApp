using PassportApplicationWebApi.Models;

namespace PassportApplicationWebApi.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByEmailAsync(string email);
    }
}
