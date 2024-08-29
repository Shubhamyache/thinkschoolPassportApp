import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { NewPassportApplicationsForAdminComponent } from './components/new-passport-applications-for-admin/new-passport-applications-for-admin.component';
import { PaymentDetailMgmtSystemForAdminComponent } from './components/payment-detail-mgmt-system-for-admin/payment-detail-mgmt-system-for-admin.component';
import { RenewPassportApplicationsForAdminComponent } from './components/renew-passport-applications-for-admin/renew-passport-applications-for-admin.component';
import { FeedbackListForAdminComponent } from './components/feedback-list-for-admin/feedback-list-for-admin.component';
import { ViewApplicationsDetailsComponent } from './components/view-applications-details/view-applications-details.component';

const routes: Routes = [
  { path: '', component: AdminPageComponent },
  {
    path: 'new-passport-applications-for-admin',
    component: NewPassportApplicationsForAdminComponent,
  },
  {
    path: 'payment-detail-mgmt-system-for-admin',
    component: PaymentDetailMgmtSystemForAdminComponent,
  },
  {
    path: 'renew-passport-application-for-admin',
    component: RenewPassportApplicationsForAdminComponent,
  },
  {
    path: 'feedback-list-for-admin',
    component: FeedbackListForAdminComponent,
  },
  { path: 'view/:formNo', component: ViewApplicationsDetailsComponent },
  // { path: '**', redirectTo: '/admin-page', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
