import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../layout/components/header/header.component';
import { FooterComponent } from '../../layout/components/footer/footer.component';
import { jwtDecode } from 'jwt-decode';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    HeaderComponent,
    FooterComponent,
  ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log('In onsubmit' + username + password);

      // Call the authentication service to login
      this.authService.login(username, password).subscribe(
        (response) => {
          console.log('in response', response);

          // Get the JWT token from the response
          const token = response.token; // Assuming the response contains the token
          localStorage.setItem('token', token); // Save the token in local storage

          // Decode JWT token to get user information
          const decodedToken: any = jwtDecode(token);
          const role = decodedToken.Role;
          console.log('Decoded Token:', decodedToken); // Log the decoded token

          // Navigate to appropriate dashboard based on role
          if (role === 'User') {
            Swal.fire('Login', 'Login successful as Student', 'success').then(
              () => {
                this.router.navigate(['user']);
              }
            );
          } else if (role === 'Admin') {
            Swal.fire('Login', 'Login successful as Admin', 'success').then(
              () => {
                this.router.navigate(['admin']);
              }
            );
          }
        },
        (error) => {
          if (error.status === 0) {
            Swal.fire('Network Error', 'Check the Connection', 'warning');
          } else {
            // Handle other errors such as invalid login credentials
            this.errorMessage = 'Invalid login credentials. Please try again.';
            Swal.fire('Error', this.errorMessage, 'error');
          }
        }
      );
    }
  }
}
