import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css',
})
export class UserHeaderComponent {
  username?: string = '';
  userFullName: string = '';
  loggedEmail: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  ngOnInit(): void {
    const localFirstName = sessionStorage.getItem('firstName') || '';
    const localLastName = sessionStorage.getItem('lastName') || '';
    const loggedEmail = sessionStorage.getItem('loggedEmail') || '';
    this.username = `${localFirstName} ${localLastName}`;
    this.userFullName = `${localFirstName} ${localLastName}`;
    this.loggedEmail = loggedEmail;
  }

  goHome(): void {
    // Redirect to the user home page
    this.router.navigate(['/user']);
  }

  logout(): void {
    // Remove token from localStorage
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }

    // Optionally, clear sessionStorage or other user-related data
    sessionStorage.clear();

    // Redirect to the login page or wherever appropriate after logout
    this.router.navigate(['/login']);
  }
}
