import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../public/modals/login/login.component';
import { SignupComponent } from '../../public/modals/signup/signup.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private modalService: NgbModal) {}

  OpenLogin() {
    this.modalService.open(LoginComponent, { centered: true });
  }
  OpenSignup() {
    this.modalService.open(SignupComponent, { centered: true });
  }
}
