import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../../../layout/components/footer/footer.component';
import { HeaderComponent } from '../../../../layout/components/header/header.component';
import { Inject, PLATFORM_ID } from '@angular/core';
import { AdminHeaderComponent } from '../Layout/admin-header/admin-header.component';
@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink, AdminHeaderComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',
})
export class AdminPageComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  username?: string = '';
  ngOnInit(): void {
    const localFirstName = sessionStorage.getItem('firstName') || '';
    const localLastName = sessionStorage.getItem('lastName') || '';
    this.username = `${localFirstName} ${localLastName}`;
  }
  adminName = JSON.stringify(sessionStorage.getItem('username'));
}
