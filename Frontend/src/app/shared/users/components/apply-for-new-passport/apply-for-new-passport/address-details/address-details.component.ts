import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddressDetails } from '../../../../../models/Iforms/address-details';

@Component({
  selector: 'app-address-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.css'],
})
export class AddressDetailsComponent implements OnInit {
  @Output() nextTabEvent = new EventEmitter<void>();
  presentAddressForm!: FormGroup;

  // Define form controls for present address
  present_house_street = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(40),
  ]);
  present_town = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(30),
  ]);
  present_district = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(30),
  ]);
  present_police_station = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(30),
  ]);
  present_state = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(30),
  ]);
  present_pin = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]{6}$'),
  ]);
  present_mobile_number = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]{10}$'),
  ]);
  present_telephone_number = new FormControl(
    '',
    Validators.pattern('^[0-9]{10}$')
  );

  same_address = new FormControl('', Validators.required);

  // Define form controls for permanent address
  permanent_house_street = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(40),
  ]);
  permanent_town = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(30),
  ]);
  permanent_district = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(30),
  ]);
  permanent_police_station = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(30),
  ]);
  permanent_state = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(30),
  ]);
  permanent_pin = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]{6}$'),
  ]);
  permanent_mobile_number = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]{10}$'),
  ]);
  permanent_telephone_number = new FormControl(
    '',
    Validators.pattern('^[0-9]{10}$')
  );

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.presentAddressForm = this.fb.group({
      present_house_street: this.present_house_street,
      present_town: this.present_town,
      present_district: this.present_district,
      present_police_station: this.present_police_station,
      present_state: this.present_state,
      present_pin: this.present_pin,
      present_mobile_number: this.present_mobile_number,
      present_telephone_number: this.present_telephone_number,
      same_address: this.same_address,
      permanent_house_street: this.permanent_house_street,
      permanent_town: this.permanent_town,
      permanent_district: this.permanent_district,
      permanent_police_station: this.permanent_police_station,
      permanent_state: this.permanent_state,
      permanent_pin: this.permanent_pin,
      permanent_mobile_number: this.permanent_mobile_number,
      permanent_telephone_number: this.permanent_telephone_number,
    });

    this.same_address.valueChanges.subscribe((value) => {
      if (
        value === 'yes' &&
        this.present_house_street.valid &&
        this.present_town.valid &&
        this.present_district.valid &&
        this.present_police_station.valid &&
        this.present_state.valid &&
        this.present_pin.valid &&
        this.present_mobile_number.valid
      ) {
        this.copyPresentAddressToPermanent();
      }
    });
  }

  copyPresentAddressToPermanent() {
    this.permanent_house_street.setValue(this.present_house_street.value);
    this.permanent_town.setValue(this.present_town.value);
    this.permanent_district.setValue(this.present_district.value);
    this.permanent_police_station.setValue(this.present_police_station.value);
    this.permanent_state.setValue(this.present_state.value);
    this.permanent_pin.setValue(this.present_pin.value);
    this.permanent_mobile_number.setValue(this.present_mobile_number.value);
    this.permanent_telephone_number.setValue(
      this.present_telephone_number.value
    );
  }

  onSubmit() {
    if (this.presentAddressForm.valid) {
      const formData = this.createFormObject();
      localStorage.setItem('addressDetails', JSON.stringify(formData));

      console.log('Form Submitted!', formData);
      // Emit the event to move to the next tab
      this.nextTabEvent.emit();
    } else {
      console.log('Form is invalid!');
      this.presentAddressForm.markAllAsTouched();
    }
  }

  createFormObject(): AddressDetails | null {
    if (this.presentAddressForm.valid) {
      return {
        presentHouseStreet: this.presentAddressForm.value.present_house_street,
        presentTown: this.presentAddressForm.value.present_town,
        presentDistrict: this.presentAddressForm.value.present_district,
        presentPoliceStation:
          this.presentAddressForm.value.present_police_station,
        presentState: this.presentAddressForm.value.present_state,
        pincode: this.presentAddressForm.value.pin,
        mobileNumber: this.presentAddressForm.value.mobile_number,
        telephoneNumber: this.presentAddressForm.value.telephone_number || '',
        sameAddress: this.presentAddressForm.value.same_address === 'yes',
        permanentHouseStreet:
          this.presentAddressForm.value.permanent_house_street,
        permanentTown: this.presentAddressForm.value.permanent_town,
        permanentDistrict: this.presentAddressForm.value.permanent_district,
        permanentPoliceStation:
          this.presentAddressForm.value.permanent_police_station,
        permanentState: this.presentAddressForm.value.permanent_state,
        permanentPin: this.presentAddressForm.value.permanent_pin,
        permanentMobileNumber:
          this.presentAddressForm.value.permanent_mobile_number,
        permanentTelephoneNumber:
          this.presentAddressForm.value.permanent_telephone_number || '',
        // isAddressDetailsValid: false,
        };
    } else {
      console.log('Form is invalid!');
      return null;
    }
  }
}
