// user.model.ts

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;
  isAdmin: 'Admin' | 'User';
  applicationStatus:
    | 'New'
    | 'Applied'
    | 'Under Verification'
    | 'Under Process'
    | 'Completed';
  passportStatus: 'Active' | 'Expired' | 'Blocked' | 'NA';
  applicationId?: string;
  passportNumber?: string;
}
