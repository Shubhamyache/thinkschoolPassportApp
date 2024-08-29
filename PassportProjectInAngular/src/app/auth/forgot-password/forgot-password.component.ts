import { Component } from '@angular/core';
import { FooterComponent } from '../../layout/components/footer/footer.component';
import { HeaderComponent } from '../../layout/components/header/header.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {}
