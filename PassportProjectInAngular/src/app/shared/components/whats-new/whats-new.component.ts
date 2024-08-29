import { Component } from '@angular/core';
import { HeaderComponent } from '../../../layout/components/header/header.component';
import { FooterComponent } from '../../../layout/components/footer/footer.component';

@Component({
  selector: 'app-whats-new',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './whats-new.component.html',
  styleUrl: './whats-new.component.css',
})
export class WhatsNewComponent {}
