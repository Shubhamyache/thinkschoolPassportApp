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
@Component({
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.css'],
})
export class UploadDocumentsComponent {
  uploadForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
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
          this.router.navigate(['/user/payment']);
        } else {
          Swal.close();
        }
      });
    }
  }
}
