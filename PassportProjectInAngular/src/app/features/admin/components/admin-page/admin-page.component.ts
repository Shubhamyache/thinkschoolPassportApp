import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../../../layout/components/footer/footer.component';
import { HeaderComponent } from '../../../../layout/components/header/header.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',
})
export class AdminPageComponent {
  adminName = JSON.stringify(sessionStorage.getItem('username'));
}
