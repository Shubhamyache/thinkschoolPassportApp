import { Component, Input } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersDetails } from '../../../../shared/models/usersDetails';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.css',
})
export class UserModalComponent {
  @Input() existingEmail: string = '';
  updatingData: UsersDetails = <UsersDetails>{};

  constructor(
    private apiService: ApiService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    // Fetch business data by ID and populate the form
    this.populateForm();
  }
  firstName = new FormControl('', [
    Validators.required,
    Validators.maxLength(50),
  ]);

  lastName = new FormControl('', []);

  email = new FormControl('', [Validators.required, Validators.email]);

  mobileNumber = new FormControl('', [
    Validators.required,
    Validators.pattern('^\\d{10}$'),
  ]);
  passportNumber = new FormControl('', []);

  applicationNumber = new FormControl('', []);

  editForm = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    phoneNumber: this.mobileNumber,
    passportNumber: this.passportNumber,
    applicationNumber: this.applicationNumber,
  });

  populateForm(): void {
    // Mock implementation to fetch business data by ID (replace with actual API call)
    this.apiService.getUserByEmail(this.existingEmail).subscribe({
      next: (data) => {
        this.updatingData = data;
        this.editForm.patchValue(this.updatingData);
      },
    });
  }
  saveChanges(): void {
    console.log('in save changes');
    if (this.editForm.valid) {
      console.log('in save changes if ');
      const updatedData: UsersDetails = {
        firstName: this.editForm.value.firstName as string,
        lastName: this.editForm.value.lastName as string,
        email: this.editForm.value.email as string,
        phoneNumber: this.editForm.value.phoneNumber as string,
        passportNumber: this.editForm.value.passportNumber as string,
        applicationNumber: this.editForm.value.applicationNumber as string,
      };
      // Update existing business data via HTTP PUT request
      this.apiService
        .updateUserDetails(this.existingEmail, updatedData)
        .subscribe({
          next: (data) => {
            console.log('Business data updated:', data);
            // Close the modal on success
            this.activeModal.close('saved');
          },
          error: (err) => {
            console.error('Error updating business data:', err);
            // Handle error as needed
          },
        });
    } else {
      alert('error while saving data');
    }
  }

  closeModal() {
    this.activeModal.dismiss('Close click'); // Dismiss the modal
  }
}
