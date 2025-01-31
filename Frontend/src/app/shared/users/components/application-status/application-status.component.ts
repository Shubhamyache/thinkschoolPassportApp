import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NgClass],
  selector: 'app-status-check',
  templateUrl: './application-status.component.html',
  styleUrls: ['./application-status.component.css'],
})
export class ApplicationStatusComponent implements OnInit {
  statusLabel: string = '';
  statusPercentage: number = 0;
  statusClass: string = '';
  username: string = '';
  userFullName: string = '';
  loggedEmail: string = '';
  applicationNumber: string = '';
  rejectedMessage:string = '';

  constructor(private applicationService: ApiService, private router: Router) {}

  ngOnInit(): void {
    const localFirstName = sessionStorage.getItem('firstName') || '';
    const localLastName = sessionStorage.getItem('lastName') || '';
    const loggedEmail = sessionStorage.getItem('email') || '';
    const applicationNumber = sessionStorage.getItem('applicationNumber') || '';
    this.username = `${localFirstName} ${localLastName}`;
    this.userFullName = `${localFirstName} ${localLastName}`;
    this.loggedEmail = loggedEmail;
    this.applicationNumber = applicationNumber;
   

    //calling the getStatus method to get the status of the application
    this.getStatus();
  }

  isApplicationNumberAvailable():boolean{
    if(this.applicationNumber === "")
      return false
    return true;
  }

  getStatus() {
    this.applicationService.checkStatus(this.applicationNumber).subscribe(
      (data) => {
        console.log(data);
        const status = data.status;
        this.rejectedMessage = data.rejectedMessage;
        console.log('Application status:', status);
        console.log(this.applicationNumber);

        this.updateProgressBar(status);
      },
      (error) => {
        console.error('Error fetching application status :(', error);
      }
    );
  }

  updateProgressBar(status: number) {
    switch (status) {
      case 0: // New
        this.statusLabel = 'New';
        this.statusPercentage = 20;
        this.statusClass = 'new';
        break;
      case 1: // Applied
        this.statusLabel = 'Applied';
        this.statusPercentage = 40;
        this.statusClass = 'applied';
        break;
      case 2: // UnderProcess
        this.statusLabel = 'Under Process';
        this.statusPercentage = 60;
        this.statusClass = 'under-process';
        break;
      case 3: // Completed
        this.statusLabel = 'Completed';
        this.statusPercentage = 100;
        this.statusClass = 'completed';
        break;
      case 4: // Rejected
        this.statusLabel = 'Rejected';
        this.statusPercentage = 100;
        this.statusClass = 'rejected';
        break;
      default:
        this.statusLabel = 'Unknown';
        this.statusPercentage = 0;
        this.statusClass = 'unknown';
        break;
    }
  }
}
