import { ComplaintStatus } from "./enums/ComplaintStatus"; // Adjust the path as needed

export interface Complaint {
  id?: number;
  passportNumberOrApplicationNumber: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  complaintType: string;
  complaintDetails: string;
  complaintStatus?: ComplaintStatus;
  isEditing?: boolean
}
