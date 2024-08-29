import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApplicantDetails } from '../../../../../models/Iforms/applicant-details';
import { ApiService } from '../../../../../services/api.service';
@Component({
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.css'],
})
export class UploadDocumentsComponent {
  uploadForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
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

          const formsArray = {
            applicantDetails: parseApplicantDetails,
            addressDetails: parseAddressDetails,
            familyDetails: parseFamilyDetails,
            otherDetails: parseOtherDetails,
            emergencyContactDetails: parseEmergencyContactDetails,
            previousApplication: parsePreviousApplication,
          };

          this.apiService.submitFormData(formsArray).subscribe(
            (response) => {
              console.log('Form submitted successfully', response);
            },
            (error) => {
              console.error('Error submitting form', error);
            }
          );
          this.router.navigate(['/user/payment']);
        } else {
          Swal.close();
        }
      });
    }
  }
}
