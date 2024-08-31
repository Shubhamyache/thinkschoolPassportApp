using Microsoft.EntityFrameworkCore;
using PassportApplicationWebApi.Models;

namespace PassportApplicationWebApi.Interfaces
{
    public interface IApplicationsRepository
    {
        Task<IEnumerable<PassportApplication>?> GetAllApplicationsAsync();
        Task<PassportApplication?> GetApplicationByApplicationNumberAsync(string applicationNumber);


        Task<PassportApplication?> UpdateApplicationAsync(PassportApplication application);
        
    }
}
