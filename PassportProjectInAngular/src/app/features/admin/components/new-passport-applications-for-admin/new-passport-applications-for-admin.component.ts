import { CommonModule } from '@angular/common';
import { ApplicationInitStatus, Component, OnInit } from '@angular/core';
import { PassportApplication } from '../../../../shared/models/passportApplication';
import { ApiService } from '../../../../services/api.service';
import { FormsModule } from '@angular/forms';
import { ApplicationStatus } from '../../../../shared/models/enums/applicationStatus';
import { AdminHeaderComponent } from '../Layout/admin-header/admin-header.component';

@Component({
  selector: 'app-new-applications',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminHeaderComponent],
  templateUrl: './new-passport-applications-for-admin.component.html',
  styleUrl: './new-passport-applications-for-admin.component.css',
})
export class NewPassportApplicationsForAdmin implements OnInit {
  allNewApplications: PassportApplication[] = [];
  applicationStatuses = Object.values(ApplicationStatus);
  rejectedMessage: string = '';

  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.getAllPassportApplications();
  }

  getAllPassportApplications() {
    this.apiService.getAllNewApplications().subscribe({
      next: (data) => {
        // this.allNewApplications = data;
        // console.log(data);
        this.allNewApplications = data.map((application) => ({
          ...application,
          applicationStatus: this.convertNumberToApplicationStatus(
            application.applicationStatus
          ),
          isEditing: false,
        }));
      },
    });
  }

  toggleEdit(application: PassportApplication) {
    if (application.isEditing) {
      // If in editing mode, save the changes
      this.updateNewApplicationStatus(application);
    }
    // Toggle the editing mode
    application.isEditing = !application.isEditing;
  }

  convertNumberToApplicationStatus(status: any): ApplicationStatus {
    switch (status) {
      case 0:
        return ApplicationStatus.New;
      case 1:
        return ApplicationStatus.Applied;
      case 2:
        return ApplicationStatus.UnderProcess;
      case 3:
        return ApplicationStatus.Completed;
      case 4:
        return ApplicationStatus.Rejected;
      default:
        return ApplicationStatus.New; // Default value
    }
  }

  updateNewApplicationStatus(application: PassportApplication) {
    this.apiService
      .updateNewApplication(
        application.applicationNumber,
        application.applicationStatus,
        application.rejectedMessage
      )
      .subscribe({
        next: () => {
          alert('Application Updated Successfully');
          this.getAllPassportApplications();
        },
        error: () => {
          alert('Error whiile updating the application');
        },
      });
  }

  deleteNewApplication(applicationNumber: string) {
    this.apiService.deleteNewApplication(applicationNumber).subscribe({
      next: () => {
        alert('Data deleted successfully');
        this.getAllPassportApplications();
      },
      error: () => {
        alert('Error while deleting data');
      },
    });
  }
}
