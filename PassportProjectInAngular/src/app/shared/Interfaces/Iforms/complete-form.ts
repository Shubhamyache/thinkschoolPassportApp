import { ApplicantDetails } from './applicant-details';
import { AddressDetails } from './address-details';
import { OtherDetails } from './other-details';
import { FamilyDetails } from './family-details';
import { Payment } from '../payment';
import { ServiceRequired } from './service-required';
import { EmergencyContact } from './emergency-contact';

export interface CompleteForm {
  FormId: number;
  formStatus: string;
  username: string;
  payment: Payment;
  createdDate: Date;

  applicantDetails: ApplicantDetails;
  addressDetails: AddressDetails;
  otherDetails: OtherDetails;
  familyDetails: FamilyDetails;
  serviceRequired: ServiceRequired;
  emergencyContact: EmergencyContact;
}
