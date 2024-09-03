import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone:true,
  selector: 'app-profile',
  imports:[ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder) {
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
    // Assuming the backend data is fetched via a service (for demo purposes, it's hard-coded)
    const profileData = {
      firstName: 'Prashant',
      lastName: 'Patil',
      email: 'kotalwar@gmail.com',
      phoneNumber: '7969309597',
      applicationNumber: '12345678',
      passportNumber: 'X2699504'
    };

    this.profileForm.setValue(profileData);
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
