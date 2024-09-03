import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from '../../shared/components/about-us/about-us.component';
import { ApplicationStatusComponent } from './components/application-status/application-status.component';
import { ContactComponent } from '../../shared/components/contact/contact.component';
import { PaymentComponent } from './components/form-payment/form-payment.component';

import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { WhatsNewComponent } from '../../shared/components/whats-new/whats-new.component';
import { NewFormComponent } from './components/apply-for-new-passport/new-form/new-form.component';
import { AddressDetailsComponent } from './components/apply-for-new-passport/address-details/address-details.component';
import { ReNewFormComponent } from './components/apply-for-renew-passport/renew-form/new-form.component';
import { FeedbackComponent } from '../../shared/components/feedback-page/feedback-page.component';
import { ComplaintComponent } from '../../shared/components/complaint/complaint.component';

export const routes: Routes = [
  { path: '', component: UserDashboardComponent },
  { path: 'apply_for_new_passport', component: NewFormComponent },
  { path: 'renew_passport', component: ReNewFormComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'about_us', component: AboutUsComponent },
  { path: 'whats_new', component: WhatsNewComponent },
  { path: 'application_status', component: ApplicationStatusComponent },
  { path: 'feedback_page', component: FeedbackComponent },
  { path: 'complaint_page', component: ComplaintComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'family-details', component: AddressDetailsComponent },
  { path: '**', redirectTo: '/user_dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
