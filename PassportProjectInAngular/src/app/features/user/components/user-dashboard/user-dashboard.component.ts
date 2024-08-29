import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../layout/components/header/header.component';
import { FooterComponent } from '../../../../layout/components/footer/footer.component';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterLink,
    HttpClientModule,
    CommonModule,
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent implements OnInit {
  username?: string = '';
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    //checks if this platform is browser of not then only gives call to session storage.
    if (isPlatformBrowser(this.platformId)) {
      this.username = JSON.stringify(sessionStorage.getItem('username'));
    } else {
      console.log('Not running in the browser');
    }
  }

  //Method returns whether form correction
  checkCorrectionForm(): any {
    console.log('Method not implemented.');
    return false;
  }
}
