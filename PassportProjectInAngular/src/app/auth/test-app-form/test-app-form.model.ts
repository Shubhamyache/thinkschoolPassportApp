export interface NewApplication {
  id: string;
  status: string | null | undefined;
  passport_type: string | null | undefined;
  userId: string;
  ServiceRequired: {
    application_type?: string | null | undefined;
    passport_booklet_type?: string | null | undefined;
    validity_required?: string | null | undefined;
  };
  ApplicantDetails: {
    given_name?: string | null | undefined;
    surname?: string | null | undefined;
    known_by_other_names?: string | null | undefined;
    alias?: string | null | undefined;
    changed_name?: string | null | undefined;
    previous_name?: string | null | undefined;
    dob?: string | null | undefined;
    place_of_birth?: string | null | undefined;
    district?: string | null | undefined;
    state?: string | null | undefined;
    region_country?: string | null | undefined;
    gender?: string | null | undefined;
    marital_status?: string | null | undefined;
    citizenship?: string | null | undefined;
    pan?: string | null | undefined;
    voter_id?: string | null | undefined;
    employment_type?: string | null | undefined;
    organization_name?: string | null | undefined;
    parent_spouse_government_servant?: string | null | undefined;
    education?: string | null | undefined;
    non_ecr?: string | null | undefined;
    distinguishing_mark?: string | null | undefined;
    aadhaar?: string | null | undefined;
  };

  family_details: {
    father_given_name?: string | null | undefined;
    father_surname?: string | null | undefined;
    mother_given_name?: string | null | undefined;
    mother_surname?: string | null | undefined;
    legal_guardian_given_name?: string | null | undefined;
    legal_guardian_surname?: string | null | undefined;
    spouse_given_name?: string | null | undefined;
    spouse_surname?: string | null | undefined;
    check_minor?: string | null | undefined;
    father_passport_number?: string | null | undefined;
    father_nationality?: string | null | undefined;
    mother_passport_number?: string | null | undefined;
    mother_nationality?: string | null | undefined;
  };

  address: {
    present_house_street?: string | null | undefined;
    present_town?: string | null | undefined;
    present_district?: string | null | undefined;
    present_police_station?: string | null | undefined;
    present_state?: string | null | undefined;
    pin?: string | null | undefined;
    mobile_number?: string | null | undefined;
    telephone_number?: string | null | undefined;
    email?: string | null | undefined;
    same_address?: string | null | undefined;
  };

  emergency_contact: {
    emergency_contact_name?: string | null | undefined;
    emergency_contact_mobile?: string | null | undefined;
    emergency_contact_telephone?: string | null | undefined;
    emergency_contact_email?: string | null | undefined;
  };

  previousApplicationDetails: {
    applied_but_not_issued?: string | null | undefined;
    file_number?: string | null | undefined;
    application_month_year?: string | null | undefined;
    passport_office?: string | null | undefined;
  };

  otherDetails: {
    criminal_proceedings?: string | null | undefined;
    criminal_convictions?: string | null | undefined;
    refused_passport?: string | null | undefined;
    impounded_passport?: string | null | undefined;
    revoked_passport?: string | null | undefined;
    granted_citizenship?: string | null | undefined;
    held_foreign_passport?: string | null | undefined;
    surrendered_indian_passport?: string | null | undefined;
    applied_renunciation?: string | null | undefined;
    passport_surrendered?: string | null | undefined;
    renunciation?: string | null | undefined;
    emergency_certificate?: string | null | undefined;
    deported?: string | null | undefined;
    repatriated?: string | null | undefined;
    registered_mission?: string | null | undefined;
    registered_mission_name?: string | null | undefined;
  };
  appointment: {
    policeAppointmentDate?: string | null | undefined;
  };

  upload_documents: {
    identityProof?: string | null | undefined;
    addressProof?: string | null | undefined;
    dobProof?: string | null | undefined;
    photo?: string | null | undefined;
  };

  self_declaration: {
    place?: string | null | undefined;
    applicant_date?: string | null | undefined;
    applicant_signature?: string | null | undefined;
  };
}
