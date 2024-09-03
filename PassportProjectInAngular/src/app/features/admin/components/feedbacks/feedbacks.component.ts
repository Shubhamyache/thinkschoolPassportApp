import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Feedback } from '../../../../shared/models/feedback';
import { ApiService } from '../../../../services/api.service';
import { HeaderComponent } from '../../../../layout/components/header/header.component';
import { FooterComponent } from '../../../../layout/components/footer/footer.component';
import { AdminHeaderComponent } from '../Layout/admin-header/admin-header.component';

@Component({
  selector: 'app-feedbacks',
  standalone: true,
  imports: [CommonModule, AdminHeaderComponent],
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.css',
})
export class FeedbacksComponent implements OnInit {
  allFeedbacks: Feedback[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getAllFeedbacks();
  }

  getAllFeedbacks() {
    this.apiService.getAllFeedbacks().subscribe({
      next: (data) => {
        this.allFeedbacks = data;
      },
      error: () => {
        alert('Error while fetching feedback');
      },
    });
  }

  deleteFeedback(id: any) {
    console.log('feedback Id is ' + id);
    this.apiService.deleteFeedbackById(id).subscribe({
      next: () => {
        alert('Feedback Deleted Successfully');
        this.getAllFeedbacks();
      },
      error: () => {
        alert('Error while deleting the feedback');
      },
    });
  }
}
