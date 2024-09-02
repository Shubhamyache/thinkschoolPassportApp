import { Component } from '@angular/core';

@Component({
  selector: 'app-renew-applications',
  standalone: true,
  imports: [],
  templateUrl: './renew-applications.component.html',
  styleUrl: './renew-applications.component.css'
})
export class RenewApplicationsComponent {
  allNewApplications: PassportApplication[] = [];
  applicationStatuses = Object.values(ApplicationStatus);
  rejectedMessage:string = "";

  constructor(private apiService: ApiService){

  }
  ngOnInit(): void {
    this.getAllPassportApplications();
  }

  getAllPassportApplications(){
    this.apiService.getAllNewApplications().subscribe({
      next:(data)=>{
        // this.allNewApplications = data;
        // console.log(data);
        this.allNewApplications = data.map(application => ({
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
        this.getAllPassportApplications();
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
        this.getAllPassportApplications();
      },
      error:()=>{
        alert("Error while deleting data");
      }
    });
  }
}
