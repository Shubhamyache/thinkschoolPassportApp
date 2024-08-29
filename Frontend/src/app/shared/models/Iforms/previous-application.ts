export interface PreviousApplication {
  previous_passport_number: string;
  previous_issue_date: string;
  previous_expiry_date: string;
  applied_but_not_issued: boolean;
  file_number?: string;
  application_month_year?: string;
  passport_office?: string;
  is_previous_application_valid: boolean;
}
