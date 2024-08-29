export interface Application {
  formNo: string;
  username: string;
  paymentStatus: string;
  formStatus: string;
  passportNumber: string;

  serviceRequired: {
    applicationType: string;
    passportBookletType: string;
    validityRequired: string;
    isApprovedByAdmin: boolean;
  };

  applicationDetails: {
    given_name: string;
    surname: string;
    known_by_other_names: string;
    alias: string;
    changed_name: string;
    previous_name: string;
    dob: string;
    place_of_birth: string;
    district: string;
    state: string;
    region_country: string;
    gender: string;
    marital_status: string;
    citizenship: string;
    pan: string;
    voter_id: string;
    employment_type: string;
    organization_name: string;
    parent_spouse_government_servant: string;
    education: string;
    non_ecr: string;
    distinguishing_mark: string;
    aadhaar: string;
    isApprovedByAdmin: boolean;
  };

  familyDetails: {
    father_given_name: string;
    father_surname: string;
    mother_given_name: string;
    mother_surname: string;
    legal_guardian_given_name: string;
    legal_guardian_surname: string;
    spouse_given_name: string;
    spouse_surname: string;
    applicant_minor: string;
    father_passport_number: string;
    father_nationality: string;
    mother_passport_number: string;
    mother_nationality: string;
    isApprovedByAdmin: boolean;
  };

  addressDetails: {
    present_house_street: string;
    present_town: string;
    present_district: string;
    present_police_station: string;
    present_state: string;
    pin: string;
    mobile_number: string;
    telephone_number: string;
    email: string;
    same_address: boolean;
    permanent_house_street: string;
    permanent_town: string;
    permanent_district: string;
    permanent_police_station: string;
    permanent_state: string;
    permanent_pin: string;
    permanent_mobile_number: string;
    permanent_telephone_number: string;
    isApprovedByAdmin: boolean;
  };

  EmergencyContactDetails: {
    emergency_contact_name: string;
    emergency_contact_mobile: string;
    emergency_contact_telephone: string;
    emergency_contact_email: string;
    isApprovedByAdmin: boolean;
  };

  previousApplication: {
    previous_passport_number: string;
    previous_issue_date: string;
    previous_expiry_date: string;
    applied_but_not_issued: boolean;
    file_number: string;
    application_month_year: string;
    passport_office: string;
    isApprovedByAdmin: boolean;
  };

  otherDetails: {
    criminal_proceedings: boolean;
    criminal_convictions: boolean;
    refused_passport: boolean;
    impounded_passport: boolean;
    revoked_passport: boolean;
    granted_citizenship: boolean;
    held_foreign_passport: boolean;
    surrendered_indian_passport: boolean;
    applied_renunciation: boolean;
    returned_on_ec: boolean;
    deported_from_country: boolean;
    repatriated_to_india: boolean;
    registered_mission_name: string;
    isApprovedByAdmin: boolean;
  };

  uploadDocuments: any; // Assuming this is an object or array that can vary
}
