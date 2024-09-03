import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/layouts/header/header.component';
import { FooterComponent } from './shared/layouts/footer/footer.component';
import { UserDashboardComponent } from './shared/users/components/user-dashboard/user-dashboard.component';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './shared/miscellaneous/page-not-found/page-not-found.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'passportApp';
  isUserDashboard = false;
  isPageNotFound = false;
  

  onActivate(componentRef: any) {

    this.isPageNotFound = componentRef instanceof PageNotFoundComponent;
  }
}
