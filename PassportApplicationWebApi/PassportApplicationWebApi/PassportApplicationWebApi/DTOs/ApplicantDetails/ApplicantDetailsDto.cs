using System.ComponentModel.DataAnnotations;

namespace PassportApplicationWebApi.DTOs.ApplicantDetails
{
    public class ApplicantDetailsDto
    {
  
        public int Id { get; set; }

        public string GivenName { get; set; } = String.Empty;

  
        public string Surname { get; set; } = String.Empty;

     
        public string KnownByOtherNames { get; set; } = String.Empty;

        public string Alias { get; set; } = String.Empty;

       
        public string ChangedName { get; set; } = String.Empty;

   
        public string PreviousName { get; set; } = String.Empty;
        
        public DateTime DOB { get; set; }

        
        public string PlaceOfBirth { get; set; } = String.Empty;

       
        public string District { get; set; } = String.Empty;

      
        public string State { get; set; } = String.Empty;

        public string RegionCountry { get; set; } = String.Empty;

        public string Gender { get; set; } = String.Empty;

       
        public string MaritalStatus { get; set; } = String.Empty;

       
        public string Citizenship { get; set; } = String.Empty;

      
        public string PanNumber { get; set; } = String.Empty;

        
        public string VoterId { get; set; } = String.Empty;

  
        public string EmploymentType { get; set; } = String.Empty;

    
        public string OrganizationName { get; set; } = String.Empty;

        public bool ParentSpouseGovernmentServant { get; set; }

        public string Education { get; set; } = String.Empty;

        public bool NonECR { get; set; }

        public string DistinguishingMark { get; set; } = String.Empty;

        public string Aadhaar { get; set; } = String.Empty;
    }
}

