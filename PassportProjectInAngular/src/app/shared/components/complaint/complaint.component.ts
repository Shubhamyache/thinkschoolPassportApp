import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Complaint } from '../../models/complaint';
import { UserHeaderComponent } from '../../../features/user/components/Layout/user-header/user-header.component';
import { FooterComponent } from '../../../layout/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { app } from '../../../../../server';

@Component({
  selector: 'app-complaint',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UserHeaderComponent,
    FooterComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './complaint.component.html',
  styleUrl: './complaint.component.css',
})
export class ComplaintComponent {
  complaintForm!: FormGroup;
  applicationNumber: string = 'Apply First';
  emailAddress: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.complaintForm = new FormGroup({
      passportNumberOrApplicationNumber: new FormControl('', [
        Validators.required,
      ]),
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      complaintType: new FormControl('', [Validators.required]),
      complaintDetails: new FormControl('', [Validators.required]),
    });

    this.applicationNumber = sessionStorage.getItem('applicationNumber') || '';
    this.emailAddress = sessionStorage.getItem('loggedEmail') || '';
  }

  submitComplaint() {
    if (this.complaintForm.valid) {
      const complaint: Complaint = {
        passportNumberOrApplicationNumber:
          this.complaintForm.value.passportNumberOrApplicationNumber,
        fullName: this.complaintForm.value.fullName,
        email: this.complaintForm.value.email,
        mobileNumber: this.complaintForm.value.phone,
        complaintType: this.complaintForm.value.complaintType,
        complaintDetails: this.complaintForm.value.complaintDetails,
      };
      this.apiService.registerComplaint(complaint).subscribe({
        next: (data) => {
          if (data) {
            Swal.fire({
              title: 'Success!',
              text: 'Complaint Raised Successfully',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.isConfirmed) {
                this.resetForm();
              }
            });
          }
          error: () => {
            console.log('Error While raising complaint ');
            Swal.fire({
              title: 'Error!',
              text: 'Error While raising complaint ',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          };
        },
      });

      console.log(complaint);
    }
  }

  resetForm() {
    this.complaintForm.reset();
  }

  ngOnDestroy() {
    // this.subscriptions$.unsubscribe();
  }
}
