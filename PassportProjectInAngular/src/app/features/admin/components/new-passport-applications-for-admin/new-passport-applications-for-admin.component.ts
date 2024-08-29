import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';
import { Application } from '../../../../shared/models/application.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { text } from 'stream/consumers';
import { HeaderComponent } from '../../../../layout/components/header/header.component';
import { FooterComponent } from '../../../../layout/components/footer/footer.component';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  selector: 'app-admin',
  templateUrl: './new-passport-applications-for-admin.component.html',
  styleUrls: ['./new-passport-applications-for-admin.component.css'],
})
export class NewPassportApplicationsForAdminComponent implements OnInit {
  applications: Application[] = [];

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.fetchApplications();
  }

  fetchApplications(): void {
    this.adminService.getApplications().subscribe((data: Application[]) => {
      this.applications = data;
    });
  }

  viewApplication(application: Application): void {
    this.router.navigate(['view', application.formNo]);
  }

  approveApplication(application: Application): void {
    application.formStatus = 'Approved';
    this.adminService.updateApplication(application).subscribe(
      () => {
        // alert('Application approved successfully.');

        Swal.fire({
          title: 'Approved',
          text: 'Application Approved Sucessfully!',
        });
      },
      (error) => {
        console.error('Error updating application:', error);
      }
    );
  }

  rejectApplication(application: Application): void {
    application.formStatus = 'Rejected';
    this.adminService.updateApplication(application).subscribe(() => {
      alert('Application rejected.');

      Swal.fire({
        title: 'Rejected',
        text: 'Application Rejected Sucessfully!',
      });
    });
  }

  deleteApplication(formNo: string): void {
    this.adminService.deleteApplication(formNo).subscribe(() => {
      this.applications = this.applications.filter(
        (app) => app.formNo !== formNo
      );
      alert('Application deleted.');
    });
  }
}
