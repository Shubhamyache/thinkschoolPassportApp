import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './components/admin-page/admin-page.component';

import { RenewPassportApplicationsForAdminComponent } from './components/renew-passport-applications-for-admin/renew-passport-applications-for-admin.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';
import { FeedbacksComponent } from './components/feedbacks/feedbacks.component';
import { UsersComponent } from './components/users/users.component';
import { NewPassportApplicationsForAdmin } from './components/new-passport-applications-for-admin/new-passport-applications-for-admin.component';

const routes: Routes = [
  { path: '', component: AdminPageComponent },
  {
    path: 'new-passport-applications-for-admin',
    component: NewPassportApplicationsForAdmin,
  },
  {
    path: 'payment-detail-mgmt-system-for-admin',
    component: PaymentMethodChangeEvent,
  },
  {
    path: 'renew-passport-application-for-admin',
    component: RenewPassportApplicationsForAdminComponent,
  },
  {
    path: 'feedbacks-list-for-admin',
    component: FeedbacksComponent,
  },
  {
    path: 'complaints-list-for-admin',
    component: ComplaintsComponent,
  },
  {
    path: 'users-component',
    component: UsersComponent,
  },
  // { path: 'view/:formNo', component: ViewApplicationsDetailsComponent },
  // { path: '**', redirectTo: '/admin-page', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
