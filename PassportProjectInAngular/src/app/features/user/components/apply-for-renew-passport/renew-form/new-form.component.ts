import { HttpClientModule } from '@angular/common/http';
import { ViewChild, ElementRef, Renderer2, Component } from '@angular/core';
import { HeaderComponent } from '../../../../../layout/components/header/header.component';
import { FooterComponent } from '../../../../../layout/components/footer/footer.component';
import { RenewApplicantDetailsComponent } from '../renew-applicant-details/applicant-details.component';
import { RenewFamilyDetailsComponent } from '../renew-family-details/family-details.component';
import { RenewAddressDetailsComponent } from '../renew-address-details/address-details.component';
import { RenewEmergencyDetailsComponent } from '../renew-emergency-details/emergency-details.component';
import { RenewPreviousApplicationComponent } from '../renew-previous-application/previous-application.component';
import { RenewOtherDetailsComponent } from '../renew-other-details/other-details.component';
import { RenewUploadDocumentsComponent } from '../renew-upload-documents/upload-documents.component';
import { Router } from '@angular/router';

@Component({
  selector: 'renew-app-new-form',
  standalone: true,
  imports: [
    RenewApplicantDetailsComponent,
    RenewFamilyDetailsComponent,
    HttpClientModule,
    RenewAddressDetailsComponent,
    RenewEmergencyDetailsComponent,
    RenewPreviousApplicationComponent,
    RenewOtherDetailsComponent,
    RenewUploadDocumentsComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './new-form.component.html',
  styleUrl: './new-form.component.css',
})
export class ReNewFormComponent {
  @ViewChild('myTab', { static: true }) myTab!: ElementRef;

  loggedEmail: string = '';
  userName: string = '';
  userFullName: string = '';

  constructor(private renderer: Renderer2, private router: Router) {}

  // onNextTab() {
  //   const activeTab =
  //     this.myTab.nativeElement.querySelector('.nav-link.active');
  //   const nextTab =
  //     activeTab.parentElement.nextElementSibling.querySelector('.nav-link');

  //   if (nextTab) {
  //     this.renderer.removeClass(activeTab, 'active');
  //     this.renderer.removeClass(
  //       this.myTab.nativeElement.querySelector(
  //         activeTab.getAttribute('data-bs-target')
  //       ),
  //       'show'
  //     );
  //     this.renderer.removeClass(
  //       this.myTab.nativeElement.querySelector(
  //         activeTab.getAttribute('data-bs-target')
  //       ),
  //       'active'
  //     );

  //     this.renderer.addClass(nextTab, 'active');
  //     this.renderer.addClass(
  //       this.myTab.nativeElement.querySelector(
  //         nextTab.getAttribute('data-bs-target')
  //       ),
  //       'show'
  //     );
  //     this.renderer.addClass(
  //       this.myTab.nativeElement.querySelector(
  //         nextTab.getAttribute('data-bs-target')
  //       ),
  //       'active'
  //     );
  //   }
  // }

  ngOnInit(): void {
    const localFirstName = sessionStorage.getItem('firstName') || '';
    const localLastName = sessionStorage.getItem('lastName') || '';
    const loggedEmail = sessionStorage.getItem('loggedEmail') || '';
    this.userName = `${localFirstName} ${localLastName}`;
    this.userFullName = `${localFirstName} ${localLastName}`;
    this.loggedEmail = loggedEmail;
  }

  goHome(): void {
    // Redirect to the user home page
    this.router.navigate(['/user']);
  }

  logout(): void {
    // Remove token from localStorage
    localStorage.removeItem('token');

    // Optionally, clear sessionStorage or other user-related data
    sessionStorage.clear();

    // Redirect to the login page or wherever appropriate after logout
    this.router.navigate(['/login']);
  }

  onNextTab() {
    const activeTab = document.querySelector('.nav-tabs .active');
    const nextTab =
      activeTab?.parentElement?.nextElementSibling?.querySelector('button');

    if (nextTab) {
      nextTab.click();
    }
  }
}
