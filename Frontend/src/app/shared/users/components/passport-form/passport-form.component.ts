import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-passport-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './passport-form.component.html',
  styleUrl: './passport-form.component.css',
})
export class PassportFormComponent implements OnInit {
  

  familyDetailsForm!: FormGroup;
  addressDetailsForm!: FormGroup;
  emergencyContactDetailsForm!: FormGroup;
  otherDetailsForm!: FormGroup;
  declarationForm!: FormGroup;

  constructor(){
   
  }
  ngOnInit(): void {
    
  }
  applicantGivenName =  new FormControl('', Validators.required);
  applicantForm = new FormGroup({
    applicantGivenName: this.applicantGivenName,
    applicantSurname: new FormControl('', Validators.required),
    alias: new FormControl('', Validators.required),
    changedName: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    placeOfBirth: new FormControl('', Validators.required),
    district: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    maritalStatus: new FormControl('', Validators.required),
    citizenship: new FormControl('', Validators.required),
    panCard: new FormControl(''),
    voterId: new FormControl(''),
    aadharNo: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{12}$')]),
    educationQualification: new FormControl('', Validators.required),
    employmentType: new FormControl('', Validators.required),
    organization: new FormControl('', Validators.required),
    govServant: new FormControl('', Validators.required),
    education: new FormControl('', Validators.required),
    nonECR: new FormControl('', Validators.required),
    distinguishingMark: new FormControl('', Validators.required),
    aadhaar: new FormControl('', Validators.required)
  });

  

    

  private navigateToNextTabIfValid(form: FormGroup, tabId: string): void {
    let activeTab = document.querySelector('.nav-tabs .nav-link.active');
    if (activeTab?.id.toString() === tabId && form.invalid) {
      form.markAllAsTouched();
      return;
    }
    if (activeTab) {
      let nextTab = activeTab.parentElement?.nextElementSibling;
      if (nextTab) {
        (nextTab.querySelector('.nav-link') as HTMLElement).click();
      }
    }
  }
  
  showNextTab(index: number): void {
    switch (index) {
      case 1:
        this.navigateToNextTabIfValid(
          this.applicantForm,
          "application-details-tab"
        );
        break;
      case 2:
        this.navigateToNextTabIfValid(
          this.familyDetailsForm,
          "family-details-tab"
        );
        break;
      case 3:
        this.navigateToNextTabIfValid(this.addressDetailsForm,
           "address-details-tab");
        break;
      case 4:
        this.navigateToNextTabIfValid(
          this.emergencyContactDetailsForm,
          "emergency-contact-details-tab"
        );
        break;
      case 5:
        this.navigateToNextTabIfValid(
          this.otherDetailsForm,
          "other-details-tab"
        );
        break;
      // case 6:
      //   this.navigateToNextTabIfValid(this.questionsForm, "payment-tab");
      //   break;
      case 7:
        this.navigateToNextTabIfValid(
          this.declarationForm,
          "declaration-tab"
        );
        break;
      default:
        break;
    }
  }
  showPreviousTab() {
    let activeTab = document.querySelector('.nav-tabs .nav-link.active');
    if (activeTab) {
      let previousTab = activeTab.parentElement?.previousElementSibling;
      if (previousTab) {
        (previousTab.querySelector('.nav-link') as HTMLElement).click();
      }
    }
  }
}
