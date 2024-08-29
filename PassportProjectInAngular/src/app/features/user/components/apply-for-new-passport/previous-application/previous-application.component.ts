import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PreviousApplication } from '../../../../../shared/Interfaces/Iforms/previous-application';
@Component({
  selector: 'app-previous-application',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './previous-application.component.html',
  styleUrls: ['./previous-application.component.css'],
})
export class PreviousApplicationComponent implements OnInit {
  @Output() nextTabEvent = new EventEmitter<void>();
  previousPassportForm!: FormGroup;

  // Define form controls
  previous_passport_number = new FormControl('', Validators.required);
  previous_issue_date = new FormControl('', Validators.required);
  previous_expiry_date = new FormControl('', Validators.required);
  applied_but_not_issued = new FormControl('', Validators.required);
  file_number = new FormControl('', Validators.required);
  application_month_year = new FormControl('', Validators.required);
  passport_office = new FormControl('', Validators.required);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.previousPassportForm = this.fb.group({
      previous_passport_number: this.previous_passport_number,
      previous_issue_date: this.previous_issue_date,
      previous_expiry_date: this.previous_expiry_date,
      applied_but_not_issued: this.applied_but_not_issued,
      file_number: this.file_number,
      application_month_year: this.application_month_year,
      passport_office: this.passport_office,
    });

    // Disable additional fields initially
    this.file_number.disable();
    this.application_month_year.disable();
    this.passport_office.disable();

    // Subscribe to changes in applied_but_not_issued to enable/disable additional fields
    this.previousPassportForm
      .get('applied_but_not_issued')
      ?.valueChanges.subscribe((value) => {
        if (value === 'yes') {
          this.file_number.enable();
          this.application_month_year.enable();
          this.passport_office.enable();
        } else {
          this.file_number.disable();
          this.application_month_year.disable();
          this.passport_office.disable();
        }
      });
  }

  onSubmit() {
    if (this.previousPassportForm.valid) {
      const formData = this.createFormObject();
      localStorage.setItem('previousApplication', JSON.stringify(formData));
      console.log('Form Submitted!', formData);
      // Emit the event to move to the next tab
      this.nextTabEvent.emit();
    } else {
      console.log('Form is invalid!');
    }
  }

  createFormObject(): PreviousApplication | null {
    if (this.previousPassportForm.valid) {
      return {
        previous_passport_number:
          this.previousPassportForm.value.previous_passport_number,
        previous_issue_date:
          this.previousPassportForm.value.previous_issue_date,
        previous_expiry_date:
          this.previousPassportForm.value.previous_expiry_date,
        applied_but_not_issued:
          this.previousPassportForm.value.applied_but_not_issued === 'yes',
        file_number: this.previousPassportForm.value.file_number,
        application_month_year:
          this.previousPassportForm.value.application_month_year,
        passport_office: this.previousPassportForm.value.passport_office,
        is_previous_application_valid: true,
      };
    } else {
      console.log('Form is invalid!');
      return null;
    }
  }
}
