import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KursPageComponent } from './kurs-page/kurs-page.component';
import { RegisterComponent } from './register/register.component';
import { UserPageComponent } from './user-page/user-page.component';
import { IdentityGuard } from './shared/modules/identity/identity.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'public'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'public',
    component: KursPageComponent
   // loadChildren: () => import('./portal/portal.module').then(m => m.PortalModule),
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'user-page',
    component: UserPageComponent,
    loadChildren: () => import('./user-page/user-page.module').then(m => m.UserPageModule),
    canActivate: [IdentityGuard]
  },
  // {
  //   path: 'error/:code',
  //   component: ErrorComponent
  // },
  {
    path: '**',
    redirectTo: 'error/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
