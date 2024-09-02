import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Member } from '../../../models/member';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnDestroy {
  
  private subscriptions$ = new Subscription();
  constructor(
    public activeModal: NgbActiveModal,
    private apiService: ApiService,
    private modalService: NgbModal
  ) {}

  firstName = new FormControl('', [Validators.required]);

  lastName = new FormControl('', [Validators.required]);

  email = new FormControl('', [Validators.required, Validators.email]);

  mobileNumber = new FormControl('', [
    Validators.required,
    Validators.pattern('^\\d{10}$'),
  ]);

  newPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  confirmPassword = new FormControl('', [Validators.required]);

  registerForm = new FormGroup(
    {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      mobileNumber: this.mobileNumber,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword,
    },
    { validators: this.passwordMatchValidator }
  );

  passwordMatchValidator(control: AbstractControl) {
    return control.get('newPassword')?.value ===
      control.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  // getAllUsers() {
  //   const getAllUsers$ = this.apiService.getAllUsers().subscribe({
  //     next: (allUsers: Member[]) => {
  //       this.allUsers = allUsers;
  //     },
  //   });
  //   this.subscriptions$.add(getAllUsers$);
  // }

  // generateNewId(): string {
  //   if (this.allUsers.length > 0) {
  //     // Find the maximum ID value, parse it as an integer, increment by 1, and convert it back to a string
  //     const maxId = Math.max(
  //       ...this.allUsers.map((user) => parseInt(user.id, 10))
  //     );
  //     return (maxId + 1).toString();
  //   } else {
  //     return '1';
  //   }
  // }


  // checkUserExistOrNot(email: string, mobileNumber: string): boolean {
  //   return !!this.allUsers.find(
  //     (member: Member) =>
  //       member.email === email || member.mobileNumber === mobileNumber
  //   );
  // }

  registerUser(): void {
    const member: Member = {
      firstName: this.registerForm.value.firstName as string,
      lastName: this.registerForm.value.lastName as string,
      email: this.registerForm.value.email as string,
      phoneNumber: this.registerForm.value.mobileNumber as string,
      password: this.registerForm.value.confirmPassword as string,
    };

    // if (this.checkUserExistOrNot(member.email, member.mobileNumber)) {
    //   Swal.fire('Success', 'Member already register', 'warning');
    //   this.closeModal();

    //   return;
    // }

    console.log('In register User');
    const registerUser$ = this.apiService.registerUser(member).subscribe({
      next: (data) => {
        Swal.fire('Success', 'member register successfully', 'success');
        console.log(data + 'Register successfully');
        this.closeModal();
      },
      error: (err) => {
        console.log('Error while registering the user ' + err);
        Swal.fire(
          'Error',
          'error while registering the user please try again!!',
          'error'
        );
      },
    });
   
    this.subscriptions$.add(registerUser$);
  }

  reset() {
    this.registerForm.reset();
  }

  openLoginModal() {
    this.closeModal();
    this.modalService.open(SignupComponent, { centered: true });
  }

  closeModal() {
    this.activeModal.dismiss('Close click');
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
