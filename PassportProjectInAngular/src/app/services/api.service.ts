import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../shared/models/user.model';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { Complaint } from '../shared/models/complaint';
import { ApplicationStatus } from '../shared/models/enums/applicationStatus';
import { ComplaintStatus } from '../shared/models/enums/ComplaintStatus';
import { Feedback } from '../shared/models/feedback';
import { PassportApplication } from '../shared/models/passportApplication';
import { UsersDetails } from '../shared/models/usersDetails';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = `${environment.apiUrl}`;
  private apiUrl = `${environment.apiUrl}/Users`;
  private newFormUrl = `${environment.apiUrl}/NewApplication`;
  private renewFormUrl = `${environment.apiUrl}/NewApplication/ReNewPassportApplication`;
  private paymentUrl: string = 'https://localhost:7291/api/PaymentDetails';

  constructor(private router: Router, private http: HttpClient) {}

  paymentApplication(paymentData: any): Observable<any> {
    return this.http.post(this.paymentUrl, paymentData, {
      responseType: 'text',
    });
  }

  registerUser(member: User): Observable<User> {
    console.log('in service of the register User');
    return this.http.post<User>(this.apiUrl, member);
  }

  updateUser(member: User): Observable<User> {
    console.log('in service of the register User');
    return this.http.put<User>(this.apiUrl, member);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  submitFormData(formsArray: any): Observable<any> {
    return this.http.post(this.newFormUrl, formsArray);
  }

  submitRenewFormData(formsArray: any): Observable<any> {
    return this.http.post(this.renewFormUrl, formsArray);
  }

  checkStatus(applicationNumber: string): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/NewApplication/GetApplicationStatus`,
      {
        params: { applicationNumber: applicationNumber },
      }
    );
  }

  updateUserDetails(
    email: string,
    updatedUserDetails: UsersDetails
  ): Observable<UsersDetails> {
    return this.http.put<UsersDetails>(
      `${this.apiUrl}/users/${email}`,
      updatedUserDetails
    );
  }

  getUserByEmail(email: string): Observable<UsersDetails> {
    return this.http.get<UsersDetails>(`${this.baseUrl}/users/${email}`);
  }

  deleteUserByEmail(email: string): Observable<any> {
    return this.http.delete<string>(`${this.baseUrl}/users/${email}`);
  }

  registerComplaint(complaint: Complaint): Observable<Complaint> {
    return this.http.post<Complaint>(`${this.baseUrl}/complaints`, complaint);
  }

  giveFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.baseUrl}/feedback`, feedback);
  }

  getAllFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.baseUrl}/feedback`);
  }

  deleteFeedbackById(feedbackid: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/feedback/${feedbackid}`);
  }

  getAllComplaints(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.baseUrl}/complaints`);
  }

  deleteComplaintById(complaintId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/complaints/${complaintId}`);
  }

  updateStatusOfComplaint(
    complaintId: number,
    complaintStatus: ComplaintStatus
  ): Observable<Complaint> {
    return this.http.put<Complaint>(
      `${this.baseUrl}/complaints/${complaintId}?complaintStatus=${complaintStatus}`,
      {}
    );
  }

  getAllNewApplications(): Observable<PassportApplication[]> {
    return this.http.get<PassportApplication[]>(
      `${this.baseUrl}/NewApplication`
    );
  }

  updateNewApplication(
    applicationNumber: string,
    updatedApplicationStatus: ApplicationStatus,
    rejectedMessage: string
  ): Observable<any> {
    return this.http.put<string>(
      `${this.baseUrl}/NewApplication/${applicationNumber}?updatedApplicationStatus=${updatedApplicationStatus}`,
      rejectedMessage
    );
  }

  deleteNewApplication(applicationNumber: string): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/NewApplication/${applicationNumber}`
    );
  }
}
