import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './shared/components/about-us/about-us.component';
import { WhatsNewComponent } from './shared/components/whats-new/whats-new.component';
import { NewApplicationComponent } from './auth/test-app-form/test-app-form.component';
import { FeedbackComponent } from './shared/components/feedback-page/feedback-page.component';

export const routes: Routes = [
  //lazy-loading for auth component
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth-routing.module').then((m) => m.AuthRoutingModule),
  },

  //lazy-loading for user component
  {
    path: 'user',
    loadChildren: () =>
      import('./features/user/user-routing.module').then(
        (m) => m.UserRoutingModule
      ),
  },

  //lazy-loading for admin component
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin-routing.module').then(
        (m) => m.AdminRoutingModule
      ),
  },

  { path: '', redirectTo: 'auth/index', pathMatch: 'full' },
  { path: 'about_us', component: AboutUsComponent },
  { path: 'whats_new', component: WhatsNewComponent },
  { path: 'feedback_page', component: FeedbackComponent },
  { path: 'test-app-form', component: NewApplicationComponent },
  { path: '**', redirectTo: 'auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
