﻿using PassportApplicationWebApi.Models;

namespace PassportApplicationWebApi.DTOs.PassportApplication
{
    public class GetRenewPassportApplicationDto
    {
        public string ApplicationNumber { get; set; }
        public string GivenName { get; set; }
        public string Surname { get; set; }
        public DateTime DOB { get; set; }

        public string? PassportNumber { get; set; }

        public string? ReIssueReason { get; set; }


        public string District { get; set; }

        public string RegionCountry { get; set; }
        public string Aadhar { get; set; }
        public ApplicationStatus ApplicationStatus { get; set; }
    }
}
