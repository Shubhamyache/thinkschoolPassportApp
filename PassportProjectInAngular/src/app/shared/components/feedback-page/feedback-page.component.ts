import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { Feedback } from '../../models/feedback';
import { HeaderComponent } from '../../../layout/components/header/header.component';
import { FooterComponent } from '../../../layout/components/footer/footer.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './feedback-page.component.html',
  styleUrl: './feedback-page.component.css',
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
      const feedback: Feedback = {
        email: this.feedbackForm.value.email,
        rating: this.feedbackForm.value.rating,
        feedbackDetails: this.feedbackForm.value.feedbackDetails,
      };
      this.apiService.giveFeedback(feedback).subscribe({
        next: (data) => {
          if (data) {
            //write logic to show success message using sweet alert2
            Swal.fire({
              title: 'Success!',
              text: 'Feedback submitted successfully',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then(() => {
              this.resetForm();
            });
          }
          error: () => {
            alert('Error got while giving feedback');
          };
        },
      });
    }
  }

  resetForm() {
    this.feedbackForm.reset();
  }
}
