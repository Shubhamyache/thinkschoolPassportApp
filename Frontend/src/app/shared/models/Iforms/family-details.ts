export interface FamilyDetails {
  fatherGivenName: string;
  fatherSurname: string;
  motherGivenName: string;
  motherSurname: string;
  legalGuardianGivenName?: string;
  legalGuardianSurname?: string;
  spouseGivenName?: string;
  spouseSurname?: string;
  applicantMinor: boolean;
  fatherPassportNumber?: string;
  fatherNationality?: string;
  motherPassportNumber?: string;
  motherNationality?: string;
  // isFamilyDetailsValid: boolean;
}
