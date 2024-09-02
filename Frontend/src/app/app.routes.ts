import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './shared/admin/components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './shared/users/components/user-dashboard/user-dashboard.component';
import { authGuard } from './shared/guards/auth.guard';
import { HomeComponent } from './shared/public/components/home/home.component';
import { PassportFormComponent } from './shared/users/components/passport-form/passport-form.component';
import { NewFormComponent } from './shared/users/components/apply-for-new-passport/apply-for-new-passport/new-form/new-form.component';
import { PaymentComponent } from './shared/users/components/payment/payment.component';
import { ComplaintComponent } from './shared/users/components/complaint/complaint.component';
import { FeedbackComponent } from './shared/users/components/feedback/feedback.component';


export const routes: Routes = [
    {path:"home", component:HomeComponent},
    // {path:"admindashboard", component:AdminDashboardComponent, canActivate: [authGuard]},
    {path:"userdashboard", component: UserDashboardComponent, canActivate: [authGuard]},
    { path: 'admindashboard', component: AdminDashboardComponent, children: [
        { path: 'dashboard', loadComponent: () => import('./shared/admin/components/dashboard/dashboard.component').then(m => m.DashboardComponent) },
        { path: 'users', loadComponent: () => import('./shared/admin/components/users/users.component').then(m => m.UsersComponent) },
        { path: 'newapplications', loadComponent: () => import('./shared/admin/components/new-applications/new-applications.component').then(m => m.NewApplicationsComponent) },
        { path: 'renewapplications', loadComponent: () => import('./shared/admin/components/renew-applications/renew-applications.component').then(m => m.RenewApplicationsComponent) },
        { path: 'complaints', loadComponent: () => import('./shared/admin/components/complaints/complaints.component').then(m => m.ComplaintsComponent) },
        { path: 'paymenthistory', loadComponent: () => import('./shared/admin/components/paymenthistory/paymenthistory.component').then(m => m.PaymenthistoryComponent) },
        { path: 'feedbacks', loadComponent: () => import('./shared/admin/components/feedbacks/feedbacks.component').then(m => m.FeedbacksComponent) }
    
      ]
    },
    // {path:"applynewpassword", component:PassportFormComponent},
    {path:"applynewpassword", component:NewFormComponent, canActivate: [authGuard]},
    {path:"payment", component: PaymentComponent,canActivate: [authGuard]},
    {path: "complaint", component: ComplaintComponent},
    {path: "feedback", component: FeedbackComponent},
    {path:"", redirectTo:"/home", pathMatch:'full'}
];
