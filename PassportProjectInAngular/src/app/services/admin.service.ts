import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../shared/models/application.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'https://localhost:7291/api/newApplications';

  constructor(private http: HttpClient) {}

  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiUrl);
  }

  updateApplication(application: Application): Observable<Application> {
    return this.http.put<Application>(
      `${this.apiUrl}/${application.formNo}`,
      application,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  deleteApplication(formNo: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${formNo}`);
  }

  getApplicationByFormNo(formNo: string): Observable<Application> {
    return this.http.get<Application>(`${this.apiUrl}/${formNo}`);
  }
}
