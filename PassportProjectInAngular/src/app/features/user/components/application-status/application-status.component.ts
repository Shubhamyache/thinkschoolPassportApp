import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../layout/components/header/header.component';
import { FooterComponent } from '../../../../layout/components/footer/footer.component';

@Component({
  selector: 'app-application-status',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './application-status.component.html',
  styleUrl: './application-status.component.css',
})
export class ApplicationStatusComponent {}
