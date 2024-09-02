import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Complaint } from '../../../models/complaint';

@Component({
  selector: 'app-complaint',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './complaint.component.html',
  styleUrl: './complaint.component.css'
})
export class ComplaintComponent {
  complaintForm!: FormGroup;
  constructor(private apiService: ApiService){

  }

  ngOnInit() {
    this.complaintForm = new FormGroup({
      passportNumberOrApplicationNumber: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      complaintType: new FormControl('', [Validators.required]),
      complaintDetails: new FormControl('', [Validators.required]),
    });
  }

  submitComplaint() {
    if (this.complaintForm.valid) {
      const complaint: Complaint = {
        passportNumberOrApplicationNumber : this.complaintForm.value.passportNumberOrApplicationNumber,
        fullName: this.complaintForm.value.fullName,
         email: this.complaintForm.value.email,
         mobileNumber: this.complaintForm.value.phone,
         complaintType: this.complaintForm.value.complaintType,
         complaintDetails: this.complaintForm.value.complaintDetails
      }
      this.apiService.registerComplaint(complaint).subscribe({
        next:(data)=>{
          if(data){
            alert("Data Added Successful");
          }
          error:()=>{
            console.log("Error While raising complaint ");
          }
          
        }
      });

      console.log(complaint);
    }
  }

  resetForm() {
    this.complaintForm.reset();
  }

  ngOnDestroy() {
    // this.subscriptions$.unsubscribe();
  }
}
