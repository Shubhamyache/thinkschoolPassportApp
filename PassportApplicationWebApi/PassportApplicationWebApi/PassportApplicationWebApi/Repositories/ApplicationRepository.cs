using Microsoft.EntityFrameworkCore;
using PassportApplicationWebApi.Data;
using PassportApplicationWebApi.Interfaces;
using PassportApplicationWebApi.Models;

namespace PassportApplicationWebApi.Repositories
{
    public class ApplicationsRepository : IApplicationsRepository
    {
        private readonly PassportContext _context;
        public ApplicationsRepository( PassportContext context) 
        {
            _context = context;
        }
        public async Task<IEnumerable<PassportApplication>?> GetAllApplicationsAsync()
        {
            var applications = await _context.PassportApplications
                .Include(p => p.User)
                .Include(p => p.ApplicantDetails)
                .Include(p => p.AddressDetails)
                .Include(p => p.EmergencyContactDetails)
                .Include(p=> p.FamilyDetails)
                .Include(p => p.Documents)
                .Include(p => p.PaymentDetails)
                .ToListAsync();

            if(applications == null)
            {
                return null;
            }
            return applications;
            
        }

        public async Task<PassportApplication?> GetApplicationByApplicationNumberAsync(string applicationNumber)
        {
            var application = await _context.PassportApplications
                .Include(p => p.User)
                .Include(p => p.ApplicantDetails)
                .Include(p => p.AddressDetails)
                .Include(p => p.EmergencyContactDetails)
                .Include(p => p.FamilyDetails)
                .Include(p => p.Documents)
                .Include(p => p.PaymentDetails)
                .FirstOrDefaultAsync(p => p.ApplicationNumber == applicationNumber);
               

            if(application == null)
            {
                return null;
            }
            return application;
        }

        public async Task<PassportApplication?> UpdateApplicationAsync(PassportApplication application)
        {
            _context.PassportApplications.Update(application);
            await _context.SaveChangesAsync();
            return application;
        }
    }
}
