import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonService } from '../../../services/common.service';
import { Member } from '../../../models/member';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  updatedcaptcha: string | undefined;
  member: Member = <Member>{};
  passwordFieldType: string = 'password';
  private subscriptions$ = new Subscription();

  constructor(
    private apiService: ApiService,
    private commonService: CommonService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {}

  openSignupModal() {
    this.closeModal();
      this.modalService.open(SignupComponent, { centered: true });
  }

  closeModal() {
    this.activeModal.dismiss('Close click'); // Dismiss the modal
  }
  ngOnInit() {
    this.generateNewCaptcha();
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  captcha = new FormControl('', [Validators.required]);

  loginForm = new FormGroup({
    email: this.email,
    password: this.password,
    captcha: this.captcha,
  });

  generateNewCaptcha() {
    console.log('in get captcha');
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      captcha += chars[randomIndex];
    }
    this.updatedcaptcha = captcha;
  }

  login(): void {
    if (this.loginForm.value.captcha === this.updatedcaptcha) {
      const login$ = this.apiService
        .login(this.loginForm.value.email!, this.loginForm.value.password!)
        .subscribe({
          next: (member) => {
            if (member) {
              this.commonService.setLoggedUserInfoToLocalStorage(JSON.stringify(member));
              if (member.isAdmin) {
                this.commonService.setToken(member.email);
                this.closeModal();
                this.router.navigate(['/admindashboard']);
                alert('Login Successfully');
              } else {
                this.commonService.setToken(member.email);
                this.closeModal();
                this.router.navigate(['/userdashboard']);
              }
            } else {
              // Handle the case where admin is not found
              alert('Invalid credentials');
            }
          },
          error: (err) => {
            console.log('error while login: ' + err);
            alert('login failed');
          },
        });
      this.subscriptions$.add(login$);
    } else {
      alert('Incorrect captcha');
    }
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  reset() {
    this.loginForm.reset();
    this.generateNewCaptcha();
  }
}
