import { HttpClientModule } from '@angular/common/http';
import { ViewChild, ElementRef, Renderer2, Component } from '@angular/core';

import { AddressDetailsComponent } from '../address-details/address-details.component';
import { ApplicantDetailsComponent } from '../applicant-details/applicant-details.component';
import { EmergencyDetailsComponent } from '../emergency-details/emergency-details.component';
import { FamilyDetailsComponent } from '../family-details/family-details.component';
import { OtherDetailsComponent } from '../other-details/other-details.component';
import { PreviousApplicationComponent } from '../previous-application/previous-application.component';
import { UploadDocumentsComponent } from '../upload-documents/upload-documents.component';
import { HeaderComponent } from '../../../../../layout/components/header/header.component';
import { FooterComponent } from '../../../../../layout/components/footer/footer.component';

@Component({
  selector: 'app-new-form',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ApplicantDetailsComponent,
    FamilyDetailsComponent,
    HttpClientModule,
    AddressDetailsComponent,
    EmergencyDetailsComponent,
    PreviousApplicationComponent,
    OtherDetailsComponent,
    UploadDocumentsComponent,
  ],
  templateUrl: './new-form.component.html',
  styleUrl: './new-form.component.css',
})
export class NewFormComponent {
  @ViewChild('myTab', { static: true }) myTab!: ElementRef;

  constructor(private renderer: Renderer2) {}

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

  onNextTab() {
    const activeTab = document.querySelector('.nav-tabs .active');
    const nextTab =
      activeTab?.parentElement?.nextElementSibling?.querySelector('button');

    if (nextTab) {
      nextTab.click();
    }
  }
}
