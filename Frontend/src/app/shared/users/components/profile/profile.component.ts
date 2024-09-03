import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  standalone:true,
  selector: 'app-profile',
  imports:[ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  email: string = sessionStorage.getItem('email') || "";
  isEditMode = false;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      applicationNumber: ['', Validators.required],
      passportNumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.apiService.getUserByEmail(this.email).subscribe({
      next: (profileData) => {
        this.profileForm.setValue({
          firstName: profileData.firstName || '',
          lastName: profileData.lastName || '',
          email: profileData.email || '',
          phoneNumber: profileData.phoneNumber || '',
          applicationNumber: profileData.applicationNumber || '',
          passportNumber: profileData.passportNumber || ''
        });
      },
      error: (error) => {
        console.error('Error fetching profile data:', error);
        // Handle error appropriately, e.g., show an error message to the user
      }
    });
  }

  toggleEdit(): void {
    this.isEditMode = !this.isEditMode;
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const updatedProfile = this.profileForm.value;
      console.log('Updated Profile:', updatedProfile);
      // Here you would typically send the updated data to your backend via a service
      this.isEditMode = false;
    }
  }
}
