export interface ApplicantDetails {
  givenName: string;
  surname: string;
  knownByOtherNames?: string;
  alias?: string;
  changedName?: string;
  previousName?: string;
  dob: string;
  placeOfBirth: string;
  district: string;
  state: string;
  regionCountry: string;
  gender: string;
  maritalStatus: string;
  citizenship: string;
  panNumber?: string;
  voterId?: string;
  employmentType: string;
  organizationName?: string;
  parentSpouseGovernmentServant: boolean;
  education: string;
  nonEcr: boolean;
  distinguishingMark?: string;
  aadhaar: string;
  // isApplicantDetailsValid: boolean;
}
