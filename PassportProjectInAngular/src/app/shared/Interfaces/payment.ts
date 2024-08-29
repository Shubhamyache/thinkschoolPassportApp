export interface Payment {
  transactionId: string;
  amount: number;
  paymentDate:Date;
  paymentMode:string;
  paymentStatus:string;
}
