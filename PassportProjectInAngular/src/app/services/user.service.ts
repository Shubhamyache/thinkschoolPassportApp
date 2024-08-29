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

  constructor(private http: HttpClient) {}
  //method to add user
  addUser(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(email: string, password: string) {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // const body = JSON.stringify({ email, password });

    return this.http.post<any>(`${this.apiUrl}/login`, {
      Email: email,
      Password: password,
    });
    // .pipe(
    //   tap((response) => console.log('Login successful', response)),
    //   catchError(this.handleError<any>('login'))
    // );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  //method to check existing user
  checkUsernameExists(username: string): Observable<boolean> {
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

  //method to check if usr exists
  checkUserExists(username: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}?username=${username}`).pipe(
      map((users) => {
        if (users.length > 0) {
          const user = users[0];
          return user.password === password;
        } else {
          return false;
        }
      })
    );
  }

  //method to check role of user
  checkUserRole(
    username: string
  ): Observable<{ username: string; role: string }> {
    return this.http.get<any[]>(`${this.apiUrl}?username=${username}`).pipe(
      map((users) => {
        if (users.length > 0) {
          const user = users[0];
          return { username: user.username, role: user.role };
        } else {
          throw new Error('User not found');
        }
      })
    );
  }
}
