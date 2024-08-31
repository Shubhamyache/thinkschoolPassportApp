using PassportApplicationWebApi.Data;
using PassportApplicationWebApi.Models;

namespace PassportApplicationWebApi.Interfaces
{
    public interface IUnitOfWork
    {
        IRepository<ApplicantDetails> _repositoryApplicantDetails { get; }
        IRepository<Documents> _repositoryDocuments { get; }
        IRepository<AddressDetails> _repositoryAddressDetails { get; }
        IRepository<FamilyDetails> _repositoryFamilyDetails { get; }
        IRepository<EmergencyContactDetails> _repositoryEmergencyContactDetails { get; }
        IRepository<Passport> _repositoryPassport { get; }
        IRepository<PassportApplication> _repositoryPassportApplication { get; }
        IRepository<User> _repositoryUser { get; }
        
        Task<int> SaveChangesAsync();
       
    }
}
