import { Component } from '@angular/core';
import { PassportApplication } from '../../../models/passportApplication';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApplicationStatus } from '../../../models/enums/applicationStatus';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-renew-applications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './renew-applications.component.html',
  styleUrl: './renew-applications.component.css'
})
export class RenewApplicationsComponent {
  allRenewApplications: PassportApplication[] = [];
  applicationStatuses = Object.values(ApplicationStatus);
  rejectedMessage:string = "";

  constructor(private apiService: ApiService){

  }
  ngOnInit(): void {
    this.getAllRenewalPassportApplications();
  }

  getAllRenewalPassportApplications(){
    this.apiService.getAllRenewApplications().subscribe({
      next:(data)=>{
        // this.allNewApplications = data;
        console.log(data);
        this.allRenewApplications = data.map(application => ({
          ...application,
          applicationStatus: this.convertNumberToApplicationStatus(application.applicationStatus),
          isEditing: false
        }));
      }
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
      case 0: return ApplicationStatus.New;
      case 1: return ApplicationStatus.Applied;
      case 2: return ApplicationStatus.UnderProcess;
      case 3: return ApplicationStatus.Completed;
      case 4: return ApplicationStatus.Rejected;
      default: return ApplicationStatus.New; // Default value
    }
  }

  updateNewApplicationStatus(application: PassportApplication){
    this.apiService.updateNewApplication(application.applicationNumber,application.applicationStatus, application.rejectedMessage).subscribe({
      next:()=>{
        alert("Application Updated Successfully");
        this.getAllRenewalPassportApplications();
      },
      error:()=>{
        alert("Error whiile updating the application");
      }
    });
  }

  deleteNewApplication(applicationNumber: string){
    this.apiService.deleteNewApplication(applicationNumber).subscribe({
      next:()=>{
        alert("Data deleted successfully");
        this.getAllRenewalPassportApplications();
      },
      error:()=>{
        alert("Error while deleting data");
      }
    });
  }
}
