import { Component } from '@angular/core';
import { FooterComponent } from '../../layout/components/footer/footer.component';
import { HeaderComponent } from '../../layout/components/header/header.component';

@Component({
  selector: 'app-forgot-username',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './forgot-username.component.html',
  styleUrl: './forgot-username.component.css',
})
export class ForgotUsernameComponent {}
