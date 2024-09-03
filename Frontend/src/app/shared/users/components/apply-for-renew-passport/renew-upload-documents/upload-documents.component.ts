import { CommonModule } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApplicantDetails } from '../../../../models/Iforms/applicant-details';
import { ApiService } from '../../../../services/api.service';
@Component({
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  selector: 'renew-app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.css'],
})
export class RenewUploadDocumentsComponent {
  uploadForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.uploadForm = this.fb.group({
      identityProof: [null, Validators.required],
      addressProof: [null, Validators.required],
      dobProof: [null, Validators.required],
      photo: [null, Validators.required],
    });
  }

  onFileSelected(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;

    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      const control = this.uploadForm.get(controlName);

      if (control) {
        control.setValue(file.name);
        control.markAsTouched();
      }
    }
  }

  onSubmit() {
    if (this.uploadForm.valid) {
      Swal.fire({
        icon: 'success',
        title: 'Form Filled successfully!',
        text: 'All fileds are correct',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save & Pay',
        cancelButtonText: 'Back To Form',
      }).then((result) => {
        if (result.isConfirmed) {
          const parseApplicantDetails: ApplicantDetails = JSON.parse(
            localStorage.getItem('applicantDetails') as string
          );
          const parseAddressDetails: ApplicantDetails = JSON.parse(
            localStorage.getItem('addressDetails') as string
          );
          const parseFamilyDetails: ApplicantDetails = JSON.parse(
            localStorage.getItem('familyDetails') as string
          );
          const parseOtherDetails: ApplicantDetails = JSON.parse(
            localStorage.getItem('otherDetails') as string
          );
          const parseEmergencyContactDetails: ApplicantDetails = JSON.parse(
            localStorage.getItem('emergencyContactDetails') as string
          );
          const parsePreviousApplication: ApplicantDetails = JSON.parse(
            localStorage.getItem('previousApplication') as string
          );
          var emaiL = sessionStorage.getItem('loggedEmail');
          //write method to generate random application id
          const randomApplication = Math.floor(Math.random() * 1000000);
          var renewalReasonT = sessionStorage.getItem('reissueReason');

          const formsArray = {
            userDetails: {
              email: emaiL,
              applicationId: randomApplication,
              renewalReason: renewalReasonT,
            },
            applicantDetails: parseApplicantDetails,
            addressDetails: parseAddressDetails,
            familyDetails: parseFamilyDetails,
            emergencyContactDetails: parseEmergencyContactDetails,
            previousPassportDetails: parsePreviousApplication,
          };

          console.log('The form data to post on the server !');

          console.log('Form Data:', formsArray);

          this.apiService.submitRenewFormData(formsArray).subscribe(
            (response) => {
              // Log the response for debugging
              console.log('Server response:', response);

              // Check if the response is valid and has the expected success property
              if (response && response.success) {
                console.log('Form submitted successfully:', response);

                Swal.fire(
                  'Success',
                  'Your application has been submitted.',
                  'success'
                ).then(() => {
                  this.router.navigate(['/userdashboard/dashboard']);
                });
              } else {
                // Log unexpected response for debugging
                console.error('Unexpected response structure:', response);
                Swal.fire(
                  'Error',
                  'Unexpected response from server. Please try again.',
                  'error'
                );
              }
            },
            (error) => {
              // Log the error for debugging
              console.error('Error submitting form:', error);

              if (error.status === 0) {
                // Network or connection error
                Swal.fire(
                  'Network Error',
                  'Unable to connect to the server. Please check your network connection.',
                  'error'
                );
              } else if (error.status === 400) {
                // Validation error from the server
                if (error.error && error.error.message) {
                  Swal.fire('Validation Error', error.error.message, 'error');
                } else {
                  Swal.fire(
                    'Error',
                    'There were validation errors with your submission. Please review the form and try again.',
                    'error'
                  );
                }
              } else if (error.status === 500) {
                // Server error
                Swal.fire(
                  'Server Error',
                  'An error occurred on the server. Please try again later.',
                  'error'
                );
              } else {
                // Other unexpected errors
                Swal.fire(
                  'Error',
                  'An unexpected error occurred. Please try again.',
                  'error'
                );
              }
            }
          );
        } else {
          Swal.close();
        }
      });
    }
  }
}
