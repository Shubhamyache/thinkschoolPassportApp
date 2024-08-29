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
    {path:"admindashboard", component:AdminDashboardComponent, canActivate: [authGuard]},
    {path:"userdashboard", component: UserDashboardComponent, canActivate: [authGuard]},
    // {path:"applynewpassword", component:PassportFormComponent},
    {path:"applynewpassword", component:NewFormComponent},
    {path:"payment", component: PaymentComponent},
    {path: "complaint", component: ComplaintComponent},
    {path: "feedback", component: FeedbackComponent},
    {path:"", redirectTo:"/home", pathMatch:'full'}
];
