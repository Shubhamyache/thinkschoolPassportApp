import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Feedback } from '../../../models/feedback';
import { ApiService } from '../../../services/api.service';


@Component({
  selector: 'app-feedbacks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.css'
})
export class FeedbacksComponent implements OnInit {
  allFeedbacks: Feedback[] = [];
  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.getAllFeedbacks();
  }

  getAllFeedbacks(){
   this.apiService.getAllFeedbacks().subscribe({
    next:(data)=>{
      this.allFeedbacks = data;
      
    },
    error:()=>{
      alert("Error while fetching feedback");
    }
   }); 
  }

  deleteFeedback(id: any){
    console.log("feedback Id is " +id);
    this.apiService.deleteFeedbackById(id).subscribe({
      next:()=>{
        alert("Feedback Deleted Successfully");
        this.getAllFeedbacks();
      },
      error:()=>{
        alert("Error while deleting the feedback");
      }
    });
  }
}
