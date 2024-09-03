import { ApplicationType } from "./enums/ApplicationType";
import { PaymentStatus } from "./enums/PaymentStatus";

export interface PaymentDetails {
    id: number;
    email: string;
    transactionNumber: string;
    amount: number;
    applicationNumber: string;
    paymentDate: Date;
    paymentMethod: string;
    paymentDetail: string;
    applicationType: ApplicationType;
    paymentStatus: PaymentStatus;
  }