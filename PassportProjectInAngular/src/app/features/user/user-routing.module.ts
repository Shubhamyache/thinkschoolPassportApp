import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from '../../shared/components/about-us/about-us.component';
import { ApplicationStatusComponent } from './components/application-status/application-status.component';
import { ContactComponent } from '../../shared/components/contact/contact.component';
import { FeedbackPageComponent } from '../../shared/components/feedback-page/feedback-page.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RenewPassportComponent } from './components/renew-passport/renew-passport.component';

import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { WhatsNewComponent } from '../../shared/components/whats-new/whats-new.component';
import { NewFormComponent } from './components/apply-for-new-passport/new-form/new-form.component';
import { AddressDetailsComponent } from './components/apply-for-new-passport/address-details/address-details.component';

export const routes: Routes = [
  { path: '', component: UserDashboardComponent },
  { path: 'apply_for_new_passport', component: NewFormComponent },
  { path: 'renew_passport', component: RenewPassportComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'about_us', component: AboutUsComponent },
  { path: 'whats_new', component: WhatsNewComponent },
  { path: 'application_status', component: ApplicationStatusComponent },
  { path: 'feedback_page', component: FeedbackPageComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'family-details', component: AddressDetailsComponent },
  { path: '**', redirectTo: '/user_dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
