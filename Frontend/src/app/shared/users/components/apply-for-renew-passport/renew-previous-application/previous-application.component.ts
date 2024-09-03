import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PreviousApplication } from '../../../../models/Iforms/previous-application';

@Component({
  selector: 'renew-app-previous-application',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './previous-application.component.html',
  styleUrls: ['./previous-application.component.css'],
})
export class RenewPreviousApplicationComponent implements OnInit {
  @Output() nextTabEvent = new EventEmitter<void>();
  previousPassportForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.previousPassportForm = this.fb.group({
      previous_passport_number: ['', Validators.required],
      previous_issue_date: ['', Validators.required],
      previous_expiry_date: ['', Validators.required],
      applied_but_not_issued: ['', Validators.required],
      file_number: [{ value: '', disabled: true }, Validators.required],
      application_month_year: [
        { value: '', disabled: true },
        Validators.required,
      ],
      passport_office: [{ value: '', disabled: true }, Validators.required],
    });

    // Subscribe to changes in applied_but_not_issued to enable/disable additional fields
    this.previousPassportForm
      .get('applied_but_not_issued')
      ?.valueChanges.subscribe((value) => {
        if (value === 'yes') {
          this.previousPassportForm.get('file_number')?.enable();
          this.previousPassportForm.get('application_month_year')?.enable();
          this.previousPassportForm.get('passport_office')?.enable();
        } else {
          this.previousPassportForm.get('file_number')?.disable();
          this.previousPassportForm.get('application_month_year')?.disable();
          this.previousPassportForm.get('passport_office')?.disable();
        }
      });
  }

  onSubmit() {
    const formData = this.createFormObject();
    localStorage.setItem('previousApplication', JSON.stringify(formData));
    console.log('Form Submitted!', formData);
    this.nextTabEvent.emit();
  }

  createFormObject(): PreviousApplication | null {
    if (this.previousPassportForm.valid) {
      return {
        previousPassportNumber:
          this.previousPassportForm.value.previous_passport_number,
        previousIssueDate: this.previousPassportForm.value.previous_issue_date,
        previousExpiryDate:
          this.previousPassportForm.value.previous_expiry_date,
        appliedButNotIssued:
          this.previousPassportForm.value.applied_but_not_issued === 'yes',
        fileNumber: this.previousPassportForm.value.file_number,
        applicationMonthYear:
          this.previousPassportForm.value.application_month_year,
        passportOffice: this.previousPassportForm.value.passport_office,
      };
    } else {
      console.log('Form is invalid!');
      return null;
    }
  }
}
