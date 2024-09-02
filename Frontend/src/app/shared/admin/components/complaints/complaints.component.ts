import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { Complaint } from '../../../models/complaint';
import { ComplaintStatus } from '../../../models/enums/ComplaintStatus';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-complaints',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './complaints.component.html',
  styleUrl: './complaints.component.css'
})
export class ComplaintsComponent implements OnInit{
  allComplaints: Complaint[] =[];
  complaintStatuses = Object.values(ComplaintStatus);
  isEdit:boolean = false;
  constructor(private apiService: ApiService){}
  ngOnInit(): void {
    this.getAllComplaints();
  }

  getAllComplaints(){
    this.apiService.getAllComplaints().subscribe({
      next:(data)=>{
        // this.allComplaints = data;
        // console.log(data);
        this.allComplaints = data.map(complaint => ({
          ...complaint,
          complaintStatus: this.convertNumberToComplaintStatus(complaint.complaintStatus),
          isEditing: false
        }));
      },
      error:()=>{

      }
    });
  }

  toggleEdit(complaint: Complaint) {
    this.isEdit = true;
    if (complaint.isEditing) {
      
      // If in editing mode, save the changes
      this.updateComplaintStatus(complaint);
    }
    // Toggle the editing mode
    complaint.isEditing = !complaint.isEditing;
  }

  convertNumberToComplaintStatus(status: any): ComplaintStatus {
    switch (status) {
      case 0: return ComplaintStatus.Pending;
      case 1: return ComplaintStatus.Resolved;
      default: return ComplaintStatus.Pending; // Default value
    }
  }

  updateComplaintStatus(complaint: Complaint) {
    // Call your API to update the complaint status
    this.apiService.updateStatusOfComplaint(complaint.id as number, complaint.complaintStatus as ComplaintStatus).subscribe({
      next: () => {
        console.log('Complaint status updated successfully');
        alert('Complaint status updated successfully');
      },
      error: () => {
        console.error('Error updating complaint status');
      }
    });
  }

  deleteComplaint(complaintId: any){
    this.apiService.deleteComplaintById(complaintId).subscribe({
      next:() =>{
        alert("Complaint Deleted Successfully");
        this.getAllComplaints();
      },
      error:()=>{
        alert("error while deleting thee complaint");
      }
    })
  }




}
