import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmergencyContact } from '../../../../../shared/models/FormInterfaces/emergency-contact';
@Component({
  selector: 'app-emergency-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './emergency-details.component.html',
  styleUrls: ['./emergency-details.component.css'],
})
export class EmergencyDetailsComponent implements OnInit {
  @Output() nextTabEvent = new EventEmitter<void>();
  emergencyContactForm!: FormGroup;

  // Define form controls
  emergency_contact_name = new FormControl('', Validators.required);
  emergency_contact_mobile = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]{10}$'),
  ]);
  emergency_contact_telephone = new FormControl(
    '',
    Validators.pattern('^[0-9]{10}$')
  );
  emergency_contact_email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.emergencyContactForm = this.fb.group({
      emergency_contact_name: this.emergency_contact_name,
      emergency_contact_mobile: this.emergency_contact_mobile,
      emergency_contact_telephone: this.emergency_contact_telephone,
      emergency_contact_email: this.emergency_contact_email,
    });
  }

  onSubmit() {
    if (this.emergencyContactForm.valid) {
      const formData = this.createFormObject();
      localStorage.setItem('emergencyContactDetails', JSON.stringify(formData));
      console.log('Form Submitted!', formData);
      // Emit the event to move to the next tab
      this.nextTabEvent.emit();
    } else {
      console.log('Form is invalid!');
      this.emergencyContactForm.markAllAsTouched();
    }
  }

  createFormObject(): EmergencyContact | null {
    if (this.emergencyContactForm.valid) {
      return {
        emergencyContactName:
          this.emergencyContactForm.value.emergency_contact_name,
        emergencyContactMobile:
          this.emergencyContactForm.value.emergency_contact_mobile,
        emergencyContactTelephone:
          this.emergencyContactForm.value.emergency_contact_telephone || '',
        emergencyContactEmail:
          this.emergencyContactForm.value.emergency_contact_email,
        // isEmergencyContactValid: true,
      };
    } else {
      console.log('Form is invalid!');
      return null;
    }
  }
}
