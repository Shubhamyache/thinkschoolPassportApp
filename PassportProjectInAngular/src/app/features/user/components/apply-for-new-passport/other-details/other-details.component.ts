import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OtherDetails } from '../../../../../shared/models/FormInterfaces/other-details';
@Component({
  selector: 'app-other-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './other-details.component.html',
  styleUrls: ['./other-details.component.css'],
})
export class OtherDetailsComponent implements OnInit {
  @Output() nextTabEvent = new EventEmitter<void>();
  otherDetailsForm!: FormGroup;

  // Define form controls
  criminal_proceedings = new FormControl('', Validators.required);
  criminal_convictions = new FormControl('', Validators.required);
  refused_passport = new FormControl('', Validators.required);
  impounded_passport = new FormControl('', Validators.required);
  revoked_passport = new FormControl('', Validators.required);
  granted_citizenship = new FormControl('', Validators.required);
  held_foreign_passport = new FormControl('', Validators.required);
  surrendered_indian_passport = new FormControl('', Validators.required);
  applied_renunciation = new FormControl('', Validators.required);
  returned_on_ec = new FormControl('', Validators.required);
  deported_from_country = new FormControl('', Validators.required);
  repatriated_to_india = new FormControl('', Validators.required);
  registered_mission_name = new FormControl('', Validators.required);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.otherDetailsForm = this.fb.group({
      criminal_proceedings: this.criminal_proceedings,
      criminal_convictions: this.criminal_convictions,
      refused_passport: this.refused_passport,
      impounded_passport: this.impounded_passport,
      revoked_passport: this.revoked_passport,
      granted_citizenship: this.granted_citizenship,
      held_foreign_passport: this.held_foreign_passport,
      surrendered_indian_passport: this.surrendered_indian_passport,
      applied_renunciation: this.applied_renunciation,
      returned_on_ec: this.returned_on_ec,
      deported_from_country: this.deported_from_country,
      repatriated_to_india: this.repatriated_to_india,
      registered_mission_name: this.registered_mission_name,
    });
  }

  onSubmit() {
    if (this.otherDetailsForm.valid) {
      const formData = this.createFormObject();
      localStorage.setItem('otherDetails', JSON.stringify(formData));
      // Emit the event to move to the next tab
      this.nextTabEvent.emit();
      console.log('Form Submitted!', formData);
    } else {
      console.log('Form is invalid!');
      this.otherDetailsForm.markAllAsTouched();
    }
  }

  createFormObject(): OtherDetails | null {
    if (this.otherDetailsForm.valid) {
      return {
        criminalProceedings:
          this.otherDetailsForm.value.criminal_proceedings === 'yes',
        criminalConvictions:
          this.otherDetailsForm.value.criminal_convictions === 'yes',
        refusedPassport: this.otherDetailsForm.value.refused_passport === 'yes',
        impoundedPassport:
          this.otherDetailsForm.value.impounded_passport === 'yes',
        revokedPassport: this.otherDetailsForm.value.revoked_passport === 'yes',
        grantedCitizenship:
          this.otherDetailsForm.value.granted_citizenship === 'yes',
        heldForeignPassport:
          this.otherDetailsForm.value.held_foreign_passport === 'yes',
        surrenderedIndianPassport:
          this.otherDetailsForm.value.surrendered_indian_passport === 'yes',
        appliedRenunciation:
          this.otherDetailsForm.value.applied_renunciation === 'yes',
        returnedOnEc: this.otherDetailsForm.value.returned_on_ec === 'yes',
        deportedFromCountry:
          this.otherDetailsForm.value.deported_from_country === 'yes',
        repatriatedToIndia:
          this.otherDetailsForm.value.repatriated_to_india === 'yes',
        registeredMissionName:
          this.otherDetailsForm.value.registered_mission_name,
        // isOtherDetailsValid: true,
      };
    } else {
      console.log('Form is invalid!');
      return null;
    }
  }
}
