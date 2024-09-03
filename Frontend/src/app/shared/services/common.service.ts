import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private router: Router) { }

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('token');
    } else {
      return false;
    }
  }

  getToken() {
    return (localStorage.getItem('token') || '');
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined'){
      localStorage.setItem('token', token);
    }
  }

  setLoggedUserInfoToLocalStorage(loggedUser : string): void{
    localStorage.setItem('user', loggedUser);
  }

  logOut(): void {
    localStorage.removeItem('token');
    // localStorage.removeItem('user');
    this.router.navigate(['/login'])
  }

  getloggedInUserInfo(){
    return jwtDecode(this.getToken());;
  }
}
