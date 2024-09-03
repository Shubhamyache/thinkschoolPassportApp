import { Component } from '@angular/core';
import { PaymentDetails } from '../../../models/PaymentDetails';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { PaymentStatus } from '../../../models/enums/PaymentStatus';
import { ApplicationType } from '../../../models/enums/ApplicationType';

@Component({
  selector: 'app-paymenthistory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paymenthistory.component.html',
  styleUrl: './paymenthistory.component.css'
})
export class PaymenthistoryComponent {
  allPayments: PaymentDetails[] = [];
  // paymentStatuses = Object.values(PaymentStatus);
  // applicationTypes = Object.values(ApplicationType);
  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.getAllPayments();
  }

  getAllPayments(){
   this.apiService.getAllpayments().subscribe({
    next:(data)=>{
      this.allPayments = data.map(payment => ({
        ...payment,
        applicationType: this.convertNumberToApplicationType(payment.applicationType),
        paymentStatus: this.convertNumberToPaymentStatus(payment.paymentStatus),
        
      }));
    },
    error:()=>{
      alert("Error while fetching feedback");
    }
   }); 
  }

  convertNumberToPaymentStatus(status: any): PaymentStatus {
    switch (status) {
      case 0: return PaymentStatus.Pending;
      case 1: return PaymentStatus.Completed;
      case 2: return PaymentStatus.Failed;
      default: return PaymentStatus.Pending; // Default value
    }
  }

  convertNumberToApplicationType(status: any): ApplicationType {
    switch (status) {
      case 0: return ApplicationType.NewApplication;
      case 1: return ApplicationType.RenewApplication;
      default: return ApplicationType.NewApplication; // Default value
    }
  }
}
