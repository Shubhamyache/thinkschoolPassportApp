import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../layout/components/header/header.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { NewApplicationService } from './new-application-service';
import { FooterComponent } from '../../layout/components/footer/footer.component';

@Component({
  selector: 'app-new-application',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, NgClass, FooterComponent],
  templateUrl: './test-app-form.component.html',
  styleUrl: './test-app-form.component.css',
})
export class NewApplicationComponent implements OnInit {
  router = inject(Router);
  newApplicationService = inject(NewApplicationService);
  userId: string = '';
  filterMap: { [key: number]: string } = {
    1: 'ServiceRequired',
    2: 'ApplicantDetails',
    3: 'family_details',
    4: 'address',
    5: 'emergency_contact',
    6: 'previousApplicationDetails',
    7: 'otherDetails',
    8: 'appointment',
    9: 'upload_documents',
    10: 'self_declaration',
  };

  ngOnInit(): void {
    let loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser) {
      let currentloggedInUser = JSON.parse(loggedInUser);
      this.userId = currentloggedInUser.id;
    }
    const sections = document.querySelectorAll(
      '.section'
    ) as NodeListOf<HTMLElement>;
    sections.forEach((section, i) => {
      section.style.display = i + 1 === 1 ? 'block' : 'none';
    });
  }

  changeSection(sectionId: number): void {
    if (this.newApplication.invalid) {
      alert('Please enter valid information ');
      return;
    } else {
      const sectionName = this.filterMap[sectionId - 1];
      const currentGroup = this.newApplication.get(
        `${sectionName}`
      ) as FormGroup;
      console.log(sectionName);
      if (currentGroup && currentGroup.valid) {
        console.log(currentGroup);
        this.showSection(sectionId);
        this.router.navigate(['/newApplication/section', sectionId]);
      } else {
        console.log('Invalid Section group');
        this.markAllControlsAsTouched(currentGroup);
      }
    }
    console.log(this.newApplication);
  }

  private showSection(index: number): void {
    const sections = document.querySelectorAll(
      '.section'
    ) as NodeListOf<HTMLElement>;
    sections.forEach((section, i) => {
      section.style.display = i + 1 === index ? 'block' : 'none';
    });
  }

  newApplication = new FormGroup({
    ServiceRequired: new FormGroup({
      application_type: new FormControl('', [Validators.required]),
      passport_booklet_type: new FormControl('', [Validators.required]),
      validity_required: new FormControl('', [Validators.required]),
    }),
    ApplicantDetails: new FormGroup({
      given_name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      known_by_other_names: new FormControl('', [Validators.required]),
      alias: new FormControl(''),
      changed_name: new FormControl('', [Validators.required]),
      previous_name: new FormControl(''),
      dob: new FormControl('', [Validators.required]),
      place_of_birth: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      region_country: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      marital_status: new FormControl('', [Validators.required]),
      citizenship: new FormControl('', [Validators.required]),
      pan: new FormControl('', [Validators.required]),
      voter_id: new FormControl('', [Validators.required]),
      employment_type: new FormControl('', [Validators.required]),
      organization_name: new FormControl(''),
      parent_spouse_government_servant: new FormControl('', [
        Validators.required,
      ]),
      education: new FormControl('', [Validators.required]),
      non_ecr: new FormControl('', [Validators.required]),
      distinguishing_mark: new FormControl('', [Validators.required]),
      aadhaar: new FormControl('', [Validators.required]),
    }),

    family_details: new FormGroup({
      father_given_name: new FormControl('', {
        validators: [
          Validators.minLength(1),
          Validators.maxLength(45),
          Validators.required,
        ],
      }),
      father_surname: new FormControl('', {
        validators: [
          Validators.minLength(1),
          Validators.maxLength(45),
          Validators.required,
        ],
      }),
      mother_given_name: new FormControl('', {
        validators: [
          Validators.minLength(1),
          Validators.maxLength(45),
          Validators.required,
        ],
      }),
      mother_surname: new FormControl('', {
        validators: [
          Validators.minLength(1),
          Validators.maxLength(45),
          Validators.required,
        ],
      }),
      legal_guardian_given_name: new FormControl('', {
        validators: [
          Validators.minLength(1),
          Validators.maxLength(45),
          Validators.required,
        ],
      }),
      legal_guardian_surname: new FormControl('', {
        validators: [
          Validators.minLength(1),
          Validators.maxLength(45),
          Validators.required,
        ],
      }),
      spouse_given_name: new FormControl('', {
        validators: [
          Validators.minLength(1),
          Validators.maxLength(45),
          Validators.required,
        ],
      }),
      spouse_surname: new FormControl('', {
        validators: [
          Validators.minLength(1),
          Validators.maxLength(45),
          Validators.required,
        ],
      }),
      check_minor: new FormControl('', { validators: [Validators.required] }),
      father_passport_number: new FormControl('', {
        validators: [Validators.maxLength(15)],
      }),
      father_nationality: new FormControl('', {
        validators: [Validators.maxLength(15)],
      }),
      mother_passport_number: new FormControl('', {
        validators: [Validators.maxLength(15)],
      }),
      mother_nationality: new FormControl('', {
        validators: [Validators.maxLength(15)],
      }),
    }),

    address: new FormGroup({
      present_house_street: new FormControl('', [Validators.required]),
      present_town: new FormControl('', [Validators.required]),
      present_district: new FormControl('', [Validators.required]),
      present_police_station: new FormControl('', [Validators.required]),
      present_state: new FormControl('', [Validators.required]),
      pin: new FormControl('', [Validators.required]),
      mobile_number: new FormControl('', [Validators.required]),
      telephone_number: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      same_address: new FormControl('', [Validators.required]),
    }),

    emergency_contact: new FormGroup({
      emergency_contact_name: new FormControl('', {
        validators: [Validators.required],
      }),
      emergency_contact_mobile: new FormControl('', {
        validators: [Validators.required, Validators.pattern('^[0-9]{10}$')],
      }),
      emergency_contact_telephone: new FormControl('', {
        validators: [Validators.pattern('^[0-9]{10}$')],
      }),
      emergency_contact_email: new FormControl('', {
        validators: [Validators.email, Validators.required],
      }),
    }),

    previousApplicationDetails: new FormGroup({
      applied_but_not_issued: new FormControl('', [Validators.required]),
      file_number: new FormControl(''),
      application_month_year: new FormControl(''),
      passport_office: new FormControl(''),
    }),

    otherDetails: new FormGroup({
      criminal_proceedings: new FormControl('', [Validators.required]),
      criminal_convictions: new FormControl('', [Validators.required]),
      refused_passport: new FormControl('', [Validators.required]),
      impounded_passport: new FormControl('', [Validators.required]),
      revoked_passport: new FormControl('', [Validators.required]),
      granted_citizenship: new FormControl('', [Validators.required]),
      held_foreign_passport: new FormControl('', [Validators.required]),
      surrendered_indian_passport: new FormControl('', [Validators.required]),
      applied_renunciation: new FormControl('', [Validators.required]),
      passport_surrendered: new FormControl('', [Validators.required]),
      renunciation: new FormControl('', [Validators.required]),
      emergency_certificate: new FormControl('', [Validators.required]),
      deported: new FormControl('', [Validators.required]),
      repatriated: new FormControl('', [Validators.required]),
      registered_mission: new FormControl('', [Validators.required]),
      registered_mission_name: new FormControl(''),
    }),
    appointment: new FormGroup({
      policeAppointmentDate: new FormControl('', [Validators.required]),
    }),

    upload_documents: new FormGroup({
      identityProof: new FormControl('', { validators: [Validators.required] }),
      addressProof: new FormControl('', { validators: [Validators.required] }),
      dobProof: new FormControl('', { validators: [Validators.required] }),
      photo: new FormControl('', { validators: [Validators.required] }),
    }),

    self_declaration: new FormGroup({
      place: new FormControl('', { validators: [Validators.required] }),
      applicant_date: new FormControl('', {
        validators: [Validators.required],
      }),
      applicant_signature: new FormControl('', {
        validators: [Validators.required],
      }),
    }),
  });

  private markAllControlsAsTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((controlName) => {
      const control = formGroup.get(controlName);
      if (control instanceof FormGroup) {
        this.markAllControlsAsTouched(control);
      } else {
        control?.markAsTouched();
      }
    });
  }

  onLogOut() {
    sessionStorage.removeItem('loggedInUser');
    // console.log('after');
    setTimeout(() => {
      Swal.fire({
        title: 'Logout Successful',
        text: `Logged out Successfully!!!`,
        icon: 'success',
        timer: 1000,
        showConfirmButton: false,
      });
    }, 100);
    this.router.navigate(['/login']);
  }

  onSubmit() {
    if (this.newApplication.invalid) {
      // this.markAllControlsAsTouched(this.newApplication);
      return;
    } else {
      let formValue = {
        id: new Date().getTime().toString(),
        userId: this.userId,
        status: 'Pending',
        passport_type: 'New',
        ServiceRequired: this.newApplication.controls.ServiceRequired.value,
        ApplicantDetails: this.newApplication.controls.ApplicantDetails.value,
        family_details: this.newApplication.controls.family_details.value,
        address: this.newApplication.controls.address.value,
        emergency_contact: this.newApplication.controls.emergency_contact.value,
        previousApplicationDetails:
          this.newApplication.controls.previousApplicationDetails.value,
        otherDetails: this.newApplication.controls.otherDetails.value,
        appointment: this.newApplication.controls.appointment.value,
        upload_documents: this.newApplication.controls.upload_documents.value,
        self_declaration: this.newApplication.controls.self_declaration.value,
      };
      let result = this.newApplicationService
        .addNewPassportApplication(formValue)
        .subscribe();
      this.newApplication.reset();
      if (result) {
        Swal.fire({
          title: 'Application Submitted Successfully',
          text: `Your Application has been submitted successfully!!!`,
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,
        });
        this.router.navigate(['/dashboard']);
      }
    }
  }
}
