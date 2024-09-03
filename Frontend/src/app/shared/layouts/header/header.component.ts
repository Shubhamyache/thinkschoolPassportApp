import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../public/modals/login/login.component';
import { SignupComponent } from '../../public/modals/signup/signup.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private modalService: NgbModal, private router:Router, private commonService: CommonService) {}

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
  isloggedInWithRole(){
    const decodedToken:any = this.commonService.getloggedInUserInfo();
    if(decodedToken.Role === 'User'){
      this.router.navigate(['/userdashboard/dashboard']);
    }
    if(decodedToken.Role === 'Admin'){
      this.router.navigate(['/admindashboard/dashboard']);
    }
    return true;
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
}
