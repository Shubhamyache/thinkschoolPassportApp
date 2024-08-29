import { Component } from '@angular/core';
import { HeaderComponent } from '../../../layout/components/header/header.component';
import { FooterComponent } from '../../../layout/components/footer/footer.component';

@Component({
  selector: 'app-feedback-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './feedback-page.component.html',
  styleUrl: './feedback-page.component.css',
})
export class FeedbackPageComponent {}
