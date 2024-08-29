import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../layout/components/header/header.component';
import { FooterComponent } from '../../../../layout/components/footer/footer.component';

@Component({
  selector: 'app-renew-passport',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './renew-passport.component.html',
  styleUrl: './renew-passport.component.css',
})
export class RenewPassportComponent {}
