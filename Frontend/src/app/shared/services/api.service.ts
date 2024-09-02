import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Member } from '../models/member';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';
import { UsersDetails } from '../models/usersDetails';
import { Complaint } from '../models/complaint';
import { Feedback } from '../models/feedback';
import { ComplaintStatus } from '../models/enums/ComplaintStatus';
import { PassportApplication } from '../models/passportApplication';
import { ApplicationStatus } from '../models/enums/applicationStatus';
import { Application } from 'express';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private newFormUrl = `${environment.apiUrl}/newapplication`;

  constructor(private router: Router, private http: HttpClient) {}

  registerUser(member: Member) {
    console.log('in service of the register User');
    return this.http.post<Member>(`${this.apiUrl}/Authentication/register`, member);
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/Authentication/login`, {
      Email: email,
      Password: password,
    });
  }

  getAllUsers(): Observable<UsersDetails[]> {
    return this.http.get<UsersDetails[]>(`${this.apiUrl}/Users`);
  }

  updateUserDetails(email:string, updatedUserDetails: UsersDetails): Observable<UsersDetails> {
    return this.http.put<UsersDetails>(`${this.apiUrl}/users/${email}`, updatedUserDetails);
  }

  getUserByEmail(email:string): Observable<UsersDetails> {
    return this.http.get<UsersDetails>(`${this.apiUrl}/users/${email}`);
  }

  deleteUserByEmail(email:string): Observable<any>{
    return this.http.delete<string>(`${this.apiUrl}/users/${email}`);
  }

  registerComplaint(complaint: Complaint):Observable<Complaint>{
    return this.http.post<Complaint>(`${this.apiUrl}/complaints`, complaint);
  }

  giveFeedback(feedback: Feedback): Observable<Feedback>{
    return this.http.post<Feedback>(`${this.apiUrl}/feedback`, feedback);
  }

  getAllFeedbacks(): Observable<Feedback[]>{
    return this.http.get<Feedback[]>(`${this.apiUrl}/feedback`);
  }

  deleteFeedbackById(feedbackid: number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/feedback/${feedbackid}`);
  }

  getAllComplaints(): Observable<Complaint[]>{
    return this.http.get<Complaint[]>(`${this.apiUrl}/complaints`);
  }

  deleteComplaintById(complaintId: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/complaints/${complaintId}`);
  }

  updateStatusOfComplaint(complaintId: number, complaintStatus: ComplaintStatus): Observable<Complaint>{
    return this.http.put<Complaint>(`${this.apiUrl}/complaints/${complaintId}?complaintStatus=${complaintStatus}`, {});
  }

  getAllNewApplications(): Observable<PassportApplication[]>{
    return this.http.get<PassportApplication[]>(`${this.apiUrl}/NewApplication`);
  }

  updateNewApplication(applicationNumber: string, updatedApplicationStatus: ApplicationStatus, rejectedMessage: string): Observable<any>{
    return this.http.put<string>(`${this.apiUrl}/NewApplication/${applicationNumber}?updatedApplicationStatus=${updatedApplicationStatus}`, rejectedMessage);
  }

  deleteNewApplication(applicationNumber: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/NewApplication/${applicationNumber}`);
  }
  // Above till all work completed

  submitFormData(formsArray: any): Observable<any> {
    return this.http.post(this.newFormUrl, formsArray);
  }
  
}
