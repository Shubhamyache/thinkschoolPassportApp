import { Component, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormsModule,
  NgModel,
  NgModelGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgClass, FormsModule],
  selector: 'app-payment',
  templateUrl: './payment.component.html',
})
export class PaymentComponent {
  passportNumber: string = '';
  selectedPaymentMethod: string = 'credit-card';
  creditCardNumber: string = '';
  creditCardExpiry: string = '';
  creditCardCVV: string = '';
  debitCardNumber: string = '';
  debitCardExpiry: string = '';
  debitCardCVV: string = '';
  upiId: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onPaymentMethodChange() {
    // Reset form fields based on payment method change
    this.creditCardNumber = '';
    this.creditCardExpiry = '';
    this.creditCardCVV = '';
    this.debitCardNumber = '';
    this.debitCardExpiry = '';
    this.debitCardCVV = '';
    this.upiId = '';
  }

  makePayment() {
    if (this.passportNumber === '') {
      Swal.fire('Please enter your passport number.');
      // alert('Please enter your passport number.');
      return;
    }

    let paymentDetails: any = {
      passportNumber: this.passportNumber,
      paymentMethod: this.selectedPaymentMethod,
    };

    if (this.selectedPaymentMethod === 'credit-card') {
      paymentDetails.cardNumber = this.creditCardNumber;
      paymentDetails.expiry = this.creditCardExpiry;
      paymentDetails.cvv = this.creditCardCVV;
    } else if (this.selectedPaymentMethod === 'debit-card') {
      paymentDetails.cardNumber = this.debitCardNumber;
      paymentDetails.expiry = this.debitCardExpiry;
      paymentDetails.cvv = this.debitCardCVV;
    } else if (this.selectedPaymentMethod === 'upi') {
      paymentDetails.upiId = this.upiId;
    }

    this.http
      .put(`http://localhost:3000/newApplications/${this.passportNumber}`, {
        paymentStatus: 'Paid',
        paymentDetails: paymentDetails,
      })
      .subscribe(
        (response) => {
          Swal.fire('Payment successful!').then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['user/application_status']);
            }
          });
          //alert('Payment successful!');
        },
        (error) => {
          //alert('Payment failed. Please try again.');
          Swal.fire({
            icon: error,
            title: 'Payment Failed',
            text: 'check the payment details once again!!',
            showCancelButton: true,
            confirmButtonText: 'Try Again',
            cancelButtonAriaLabel: 'Leave',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/user/payment']);
            } else {
              this.router.navigate(['/user/user_dashboard']);
            }
          });
        }
      );
  }
}
