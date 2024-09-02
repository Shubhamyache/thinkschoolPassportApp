import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../public/modals/login/login.component';
import { SignupComponent } from '../../public/modals/signup/signup.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private modalService: NgbModal, private router:Router) {}

  OpenLogin() {
    this.modalService.open(LoginComponent, { centered: true });
  }
  OpenSignup() {
    this.modalService.open(SignupComponent, { centered: true });
  }

  isloggedIn(){
    if(localStorage.getItem('token') as string != null){
      return true;
    }
    return false;
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
}
