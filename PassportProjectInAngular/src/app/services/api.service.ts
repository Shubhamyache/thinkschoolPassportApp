import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../shared/models/user.model';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = `${environment.apiUrl}/members`;
  private newFormUrl = `${environment.apiUrl}/NewApplication`;
  private renewFormUrl = `${environment.apiUrl}/NewApplication/ReNewPassportApplication`;

  constructor(private router: Router, private http: HttpClient) {}

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
}
