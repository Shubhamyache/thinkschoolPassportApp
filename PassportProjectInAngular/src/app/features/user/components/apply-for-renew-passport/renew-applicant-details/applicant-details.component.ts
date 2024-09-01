import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApplicantDetails } from '../../../../../shared/models/FormInterfaces/applicant-details';
import { HttpClientJsonpModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { RenewFamilyDetailsComponent } from '../renew-family-details/family-details.component';
@Component({
  selector: 'renew-app-applicant-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RenewFamilyDetailsComponent,
    HttpClientJsonpModule,
    RouterLink,
  ],
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.css'],
})
export class RenewApplicantDetailsComponent implements OnInit {
  @Output() nextTabEvent = new EventEmitter<void>();
  applicantForm!: FormGroup;

  // Define form controls
  given_name = new FormControl('', [
    Validators.required,
    Validators.pattern('[A-Za-z\\s]+'),
    Validators.minLength(1),
    Validators.maxLength(45),
  ]);

  surname = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(45),
  ]);

  known_by_other_names = new FormControl('', Validators.required);

  alias = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(45),
  ]);

  changed_name = new FormControl('', [
    Validators.minLength(1),
    Validators.maxLength(25),
  ]);

  previous_name = new FormControl('', [
    Validators.minLength(1),
    Validators.maxLength(45),
  ]);

  dob = new FormControl('', Validators.required);

  place_of_birth = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(25),
  ]);

  district = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(25),
  ]);

  state = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(25),
  ]);

  region_country = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(25),
  ]);

  gender = new FormControl('', Validators.required);

  marital_status = new FormControl('', Validators.required);

  citizenship = new FormControl('', Validators.required);

  pan = new FormControl('', [
    Validators.minLength(10),
    Validators.maxLength(10),
  ]);

  voter_id = new FormControl('', Validators.minLength(10));

  employment_type = new FormControl('', Validators.required);

  organization_name = new FormControl('', [
    Validators.minLength(1),
    Validators.maxLength(30),
  ]);

  parent_spouse_government_servant = new FormControl('', Validators.required);

  education = new FormControl('', Validators.required);

  non_ecr = new FormControl('', Validators.required);

  distinguishing_mark = new FormControl('', [
    Validators.minLength(1),
    Validators.maxLength(30),
  ]);

  aadhaar = new FormControl('', [
    Validators.required,
    Validators.minLength(12),
    Validators.maxLength(12),
  ]);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.applicantForm = this.fb.group({
      given_name: this.given_name,
      surname: this.surname,
      known_by_other_names: this.known_by_other_names,
      alias: this.alias,
      changed_name: this.changed_name,
      previous_name: this.previous_name,
      dob: this.dob,
      place_of_birth: this.place_of_birth,
      district: this.district,
      state: this.state,
      region_country: this.region_country,
      gender: this.gender,
      marital_status: this.marital_status,
      citizenship: this.citizenship,
      pan: this.pan,
      voter_id: this.voter_id,
      employment_type: this.employment_type,
      organization_name: this.organization_name,
      parent_spouse_government_servant: this.parent_spouse_government_servant,
      education: this.education,
      non_ecr: this.non_ecr,
      distinguishing_mark: this.distinguishing_mark,
      aadhaar: this.aadhaar,
      is_applicant_detail_valid: false,
    });

    // Handle conditional field visibility
    this.known_by_other_names.valueChanges.subscribe((value) => {
      if (value === 'yes') {
        this.alias.setValidators([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(45),
        ]);
      } else {
        this.alias.clearValidators();
      }
      this.alias.updateValueAndValidity();
    });

    this.changed_name.valueChanges.subscribe((value) => {
      if (value === 'yes') {
        this.previous_name.setValidators([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(45),
        ]);
      } else {
        this.previous_name.clearValidators();
      }
      this.previous_name.updateValueAndValidity();
    });

    this.employment_type.valueChanges.subscribe((value) => {
      if (
        this.employment_type.value === 'government' ||
        this.employment_type.value === 'statutory_body' ||
        this.employment_type.value === 'psu'
      ) {
        this.organization_name.setValidators([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(30),
        ]);
      } else {
        this.organization_name.clearValidators();
      }
      this.organization_name.updateValueAndValidity();
    });
  }

  onSubmit() {
    if (this.applicantForm.valid) {
      const formData = this.createFormObject();
      localStorage.setItem('applicantDetails', JSON.stringify(formData));
      console.log('Form Submitted!', formData);
      //this.nextTab();
      // Emit the event to move to the next tab
      this.nextTabEvent.emit();
    } else {
      console.log('Form is invalid!');
      this.applicantForm.markAllAsTouched();
    }
  }
  saveReasonToSessionStorage(event: any) {
    const selectedReason = event.target.value;
    if (selectedReason) {
      sessionStorage.setItem('reissueReason', selectedReason);
      console.log('Selected reason saved to sessionStorage:', selectedReason);
    }
  }

  nextTab() {
    this.nextTabEvent.emit();
  }

  createFormObject(): ApplicantDetails | null {
    if (this.applicantForm.valid) {
      return {
        givenName: this.applicantForm.value.given_name,
        surname: this.applicantForm.value.surname,
        knownByOtherNames: this.applicantForm.value.known_by_other_names,
        alias: this.applicantForm.value.alias || '',
        changedName: this.applicantForm.value.changed_name,
        previousName: this.applicantForm.value.previous_name || '',
        dob: new Date(this.applicantForm.value.dob).toISOString().split('T')[0], // 'YYYY-MM-DD'
        //,
        placeOfBirth: this.applicantForm.value.place_of_birth,
        district: this.applicantForm.value.district,
        state: this.applicantForm.value.state,
        regionCountry: this.applicantForm.value.region_country,
        gender: this.applicantForm.value.gender,
        maritalStatus: this.applicantForm.value.marital_status,
        citizenship: this.applicantForm.value.citizenship,
        panNumber: this.applicantForm.value.pan || '',
        voterId: this.applicantForm.value.voter_id || '',
        employmentType: this.applicantForm.value.employment_type,
        organizationName: this.applicantForm.value.organization_name || '',
        parentSpouseGovernmentServant: false,
        // this.applicantForm.value.parent_spouse_government_servant,
        education: this.applicantForm.value.education,
        nonEcr: false, //this.applicantForm.value.non_ecr,
        distinguishingMark: this.applicantForm.value.distinguishing_mark || '',
        aadhaar: this.applicantForm.value.aadhaar,
        // isApplicantDetailsValid: true,
      };
    } else {
      console.log('Form is invalid!');
      return null;
    }
  }
}
