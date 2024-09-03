import { ApplicationStatus } from "./enums/applicationStatus";

export interface PassportApplication {
    applicationNumber: string;
    givenName: string;
    surname: string;
    dob: Date;
    district: string;
    regionCountry: string;
    aadhar: string;
    applicationStatus: ApplicationStatus;
    isEditing: boolean // Assuming ApplicationStatus is an enum defined elsewhere
    rejectedMessage:string
  }
  