import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private tokenKey = 'auth-token';

  constructor(private router: Router) { }

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem(this.tokenKey);
    } else {
      return false;
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined'){
      return localStorage.getItem(this.tokenKey);
    }else{
      return null;
    }
    
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined'){
      localStorage.setItem(this.tokenKey, token);
    }
  }

  setLoggedUserInfoToLocalStorage(loggedUser : string): void{
    localStorage.setItem('user', loggedUser);
  }

  logOut(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('user');
    this.router.navigate(['/login'])

  }
}
