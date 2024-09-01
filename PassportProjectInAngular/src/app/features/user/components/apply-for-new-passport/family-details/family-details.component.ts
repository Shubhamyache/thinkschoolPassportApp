import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FamilyDetails } from '../../../../../shared/models/FormInterfaces/family-details';
@Component({
  selector: 'app-family-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './family-details.component.html',
  styleUrls: ['./family-details.component.css'],
})
export class FamilyDetailsComponent implements OnInit {
  @Output() nextTabEvent = new EventEmitter<void>();
  familyDetailsForm!: FormGroup;

  // Define form controls
  father_given_name = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(45),
  ]);
  father_surname = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(45),
  ]);
  mother_given_name = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(45),
  ]);
  mother_surname = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(45),
  ]);
  legal_guardian_given_name = new FormControl('', [
    Validators.minLength(1),
    Validators.maxLength(45),
  ]);
  legal_guardian_surname = new FormControl('', [
    Validators.minLength(1),
    Validators.maxLength(45),
  ]);
  spouse_given_name = new FormControl('', [
    Validators.minLength(1),
    Validators.maxLength(45),
  ]);
  spouse_surname = new FormControl('', [
    Validators.minLength(1),
    Validators.maxLength(45),
  ]);

  applicant_minor = new FormControl('', Validators.required);
  father_passport_number = new FormControl('', Validators.maxLength(15));
  father_nationality = new FormControl('', Validators.maxLength(15));
  mother_passport_number = new FormControl('', Validators.maxLength(15));
  mother_nationality = new FormControl('', Validators.maxLength(15));

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.familyDetailsForm = this.fb.group({
      father_given_name: this.father_given_name,
      father_surname: this.father_surname,
      mother_given_name: this.mother_given_name,
      mother_surname: this.mother_surname,
      legal_guardian_given_name: this.legal_guardian_given_name,
      legal_guardian_surname: this.legal_guardian_surname,
      spouse_given_name: this.spouse_given_name,
      spouse_surname: this.spouse_surname,
      father_passport_number: this.father_passport_number,
      father_nationality: this.father_nationality,
      mother_passport_number: this.mother_passport_number,
      applicant_minor: this.applicant_minor,
      mother_nationality: this.mother_nationality,
    });
  }

  onSubmit() {
    if (this.familyDetailsForm.valid) {
      const formData = this.createFormObject();
      localStorage.setItem('familyDetails', JSON.stringify(formData));
      console.log('Form Submitted!', formData);
      // Emit the event to move to the next tab
      this.nextTabEvent.emit();
    } else {
      console.log('Form is invalid!');
      this.familyDetailsForm.markAllAsTouched();
    }
  }

  createFormObject(): FamilyDetails | null {
    if (this.familyDetailsForm.valid) {
      return {
        fatherGivenName: this.familyDetailsForm.value.father_given_name,
        fatherSurname: this.familyDetailsForm.value.father_surname,
        motherGivenName: this.familyDetailsForm.value.mother_given_name,
        motherSurname: this.familyDetailsForm.value.mother_surname,
        legalGuardianGivenName:
          this.familyDetailsForm.value.legal_guardian_given_name || '',
        legalGuardianSurname:
          this.familyDetailsForm.value.legal_guardian_surname || '',
        spouseGivenName: this.familyDetailsForm.value.spouse_given_name || '',
        spouseSurname: this.familyDetailsForm.value.spouse_surname || '',
        applicantMinor: false, //this.familyDetailsForm.value.applicant_minor,
        fatherPassportNumber:
          this.familyDetailsForm.value.father_passport_number || '',
        fatherNationality:
          this.familyDetailsForm.value.father_nationality || '',
        motherPassportNumber:
          this.familyDetailsForm.value.mother_passport_number || '',
        motherNationality:
          this.familyDetailsForm.value.mother_nationality || '',
        // isFamilyDetailsValid: true,
      };
    } else {
      console.log('Form is invalid!');
      return null;
    }
  }
}
