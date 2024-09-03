export interface PreviousApplication {
  previousPassportNumber: string;
  previousIssueDate: string;
  previousExpiryDate: string;
  appliedButNotIssued: boolean;
  fileNumber?: string;
  applicationMonthYear?: string;
  passportOffice?: string;
  // isPreviousApplicationValid: boolean;
}
