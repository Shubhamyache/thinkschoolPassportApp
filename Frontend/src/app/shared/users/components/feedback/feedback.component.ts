import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { Feedback } from '../../../models/feedback';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  feedbackForm!: FormGroup;
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.feedbackForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      rating: new FormControl('', [Validators.required]),
      feedbackDetails: new FormControl('', [Validators.required]),
    });
  }

  submitFeedback() {
    if (this.feedbackForm.valid) {
      const feedback:Feedback ={
        email: this.feedbackForm.value.email,
        rating: this.feedbackForm.value.rating,
        feedbackDetails: this.feedbackForm.value.feedbackDetails
      }
      this.apiService.giveFeedback(feedback).subscribe({
        next:(data)=>{
          if(data){
            alert("Feedback got successfully");
          }
          error:()=>{
            alert("Error got while giving feedback");
          }
        }
      });
      
    }
  }

  resetForm() {
    this.feedbackForm.reset();
  }
}
