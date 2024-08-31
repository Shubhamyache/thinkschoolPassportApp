using PassportApplicationWebApi.Data;
using PassportApplicationWebApi.Interfaces;
using PassportApplicationWebApi.Models;

namespace PassportApplicationWebApi.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        public IRepository<ApplicantDetails> _repositoryApplicantDetails { get; }
        public IRepository<Documents> _repositoryDocuments { get; }
        public IRepository<AddressDetails> _repositoryAddressDetails { get; }
        public IRepository<FamilyDetails> _repositoryFamilyDetails { get; }
        public IRepository<EmergencyContactDetails> _repositoryEmergencyContactDetails { get; }
        public IRepository<Passport> _repositoryPassport { get; }
        public IRepository<PassportApplication> _repositoryPassportApplication { get; }
        public IRepository<User> _repositoryUser { get; }
        public PassportContext _context { get; }

        public UnitOfWork(IRepository<ApplicantDetails> repositoryApplicantDetails, IRepository<Documents> repositoryDocuments, IRepository<AddressDetails> repositoryAddressDetails, IRepository<FamilyDetails> repositoryFamilyDetails, IRepository<EmergencyContactDetails> repositoryEmergencyContactDetails, IRepository<Passport> repositoryPassport, IRepository<PassportApplication> repositoryPassportApplication, IRepository<User> repositoryUser, PassportContext context)
        {
            _repositoryApplicantDetails = repositoryApplicantDetails;
            _repositoryDocuments = repositoryDocuments;
            _repositoryAddressDetails = repositoryAddressDetails;
            _repositoryFamilyDetails = repositoryFamilyDetails;
            _repositoryEmergencyContactDetails = repositoryEmergencyContactDetails;
            _repositoryPassport = repositoryPassport;
            _repositoryPassportApplication = repositoryPassportApplication;
            _repositoryUser = repositoryUser;
            _context = context;
        }


        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
