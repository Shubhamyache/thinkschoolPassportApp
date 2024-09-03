import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { CommonModule } from '@angular/common';
import { Complaint } from '../../../../shared/models/complaint';
import { ComplaintStatus } from '../../../../shared/models/enums/ComplaintStatus';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from '../Layout/admin-header/admin-header.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-complaints',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminHeaderComponent],
  templateUrl: './complaints.component.html',
  styleUrl: './complaints.component.css',
})
export class ComplaintsComponent implements OnInit {
  allComplaints: Complaint[] = [];
  complaintStatuses = Object.values(ComplaintStatus);
  isEdit: boolean = false;
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.getAllComplaints();
  }

  getAllComplaints() {
    this.apiService.getAllComplaints().subscribe({
      next: (data) => {
        // this.allComplaints = data;
        // console.log(data);
        this.allComplaints = data.map((complaint) => ({
          ...complaint,
          complaintStatus: this.convertNumberToComplaintStatus(
            complaint.complaintStatus
          ),
          isEditing: false,
        }));
      },
      error: () => {},
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
      case 0:
        return ComplaintStatus.Pending;
      case 1:
        return ComplaintStatus.Resolved;
      default:
        return ComplaintStatus.Pending; // Default value
    }
  }

  updateComplaintStatus(complaint: Complaint) {
    // Call your API to update the complaint status
    this.apiService
      .updateStatusOfComplaint(
        complaint.id as number,
        complaint.complaintStatus as ComplaintStatus
      )
      .subscribe({
        next: () => {
          console.log('Complaint status updated successfully');
          Swal.fire(
            'Updated!',
            'Complaint status updated successfully',
            'success'
          );
        },
        error: () => {
          Swal.fire('Error!', 'Error while updating complaint status', 'error');
        },
      });
  }

  deleteComplaint(complaintId: any) {
    this.apiService.deleteComplaintById(complaintId).subscribe({
      next: () => {
        Swal.fire('Deleted!', 'Complaint has been deleted.', 'success');
        this.getAllComplaints();
      },
      error: () => {
        alert('error while deleting thee complaint');
        Swal.fire('Error!', 'Error while deleting complaint', 'error');
      },
    });
  }
}
