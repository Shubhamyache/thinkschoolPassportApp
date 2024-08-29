export interface ApplicantDetails {
  given_name: string;
  surname: string;
  known_by_other_names?: string;
  alias?: string;
  changed_name?: string;
  previous_name?: string;
  dob: string;
  place_of_birth: string;
  district: string;
  state: string;
  region_country: string;
  gender: string;
  marital_status: string;
  citizenship: string;
  pan?: string;
  voter_id?: string;
  employment_type: string;
  organization_name?: string;
  parent_spouse_government_servant: string;
  education: string;
  non_ecr: string;
  distinguishing_mark?: string;
  aadhaar: string;
  is_applicant_details_valid: boolean;
}

