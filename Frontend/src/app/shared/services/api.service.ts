import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Member } from '../models/member';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = `${environment.apiUrl}/members`;
  private newFormUrl = `${environment.apiUrl}/newapplication`;

  constructor(private router: Router, private http: HttpClient) {}

  registerUser(member: Member): Observable<Member> {
    console.log('in service of the register User');
    return this.http.post<Member>(this.apiUrl, member);
  }

  updateUser(member: Member): Observable<Member> {
    console.log('in service of the register User');
    return this.http.put<Member>(this.apiUrl, member);
  }

  login(email: string, password: string): Observable<Member | undefined> {
    return this.http
      .get<Member[]>(`${this.apiUrl}`)
      .pipe(
        map((members) =>
          members.find(
            (member: Member) =>
              member.email === email && member.password === password
          )
        )
      );
  }

  getAllUsers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.apiUrl);
  }

  submitFormData(formsArray: any): Observable<any> {
    return this.http.post(this.newFormUrl, formsArray);
  }
}
