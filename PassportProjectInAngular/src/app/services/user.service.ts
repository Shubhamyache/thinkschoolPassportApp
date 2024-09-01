import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://localhost:7291/api/Authentication';
  private tokenKey = '';

  constructor(private http: HttpClient) {}
  //method to add user
  addUser(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, {
      Email: email,
      Password: password,
    });
  }

  getToken() {
    return (this.tokenKey = localStorage.getItem('token') || '');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  //method to check existing user
  checkUserNameExists(username: string): Observable<boolean> {
    return this.http
      .get<any>(`${this.apiUrl}/checkUserNameExists?email=${username}`)
      .pipe(
        map((response) => {
          if (response && response.message === 'User already exists') {
            return true;
          } else {
            return false;
          }
        })
      );
  }
}
