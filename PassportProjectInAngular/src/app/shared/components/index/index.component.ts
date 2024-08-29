import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../layout/components/header/header.component';
import { FooterComponent } from '../../../layout/components/footer/footer.component';
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {}
