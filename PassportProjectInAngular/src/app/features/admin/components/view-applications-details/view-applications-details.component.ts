import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../../services/admin.service';
import { Application } from '../../../../shared/models/application.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-view',
  templateUrl: './view-applications-details.component.html',
  styleUrls: ['./view-applications-details.component.css'],
})
export class ViewApplicationsDetailsComponent implements OnInit {
  application: Application = {} as Application;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    const formNo = this.route.snapshot.paramMap.get('formNo');
    if (formNo) {
      this.fetchApplication(formNo);
    }
  }

  fetchApplication(formNo: string): void {
    this.adminService
      .getApplicationByFormNo(formNo)
      .subscribe((data: Application) => {
        this.application = data;
      });
  }

  approveSection(section: keyof Application): void {
    if (
      this.application &&
      this.application[section] &&
      typeof this.application[section] === 'object'
    ) {
      (this.application[section] as any).isApprovedByAdmin = true;
      this.adminService.updateApplication(this.application).subscribe(() => {
        alert(`${section} approved successfully.`);
      });
    }
  }

  declineSection(section: keyof Application): void {
    if (
      this.application &&
      this.application[section] &&
      typeof this.application[section] === 'object'
    ) {
      (this.application[section] as any).isApprovedByAdmin = false;
      this.adminService.updateApplication(this.application).subscribe(() => {
        alert(`${section} declined.`);
      });
    }
  }
}
