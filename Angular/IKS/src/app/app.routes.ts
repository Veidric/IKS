import { Routes } from '@angular/router';
import { ProfilePageComponent } from './profile/profile-page/profile-page.component';
import { Feed } from './feed/feed';
import { Auth } from './auth/auth/auth';
import { AuthGuard } from './guards/auth-guard';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { CmsPageComponent } from '../app/cms/cms-page/cms-page.component'; // Your CMS component
import { adminGuard } from './guards/admin.guard';
export const routes: Routes = [
  {
    path: 'auth',
    component: Auth,
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: '**', redirectTo: 'login' },
    ],
  },
  { path: 'feed', component: Feed, canActivate: [AuthGuard] },
  {
    path: 'profile/:id',
    component: ProfilePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cms',
    component: CmsPageComponent,
    canActivate: [adminGuard],
  },
  { path: '**', redirectTo: 'feed' },
];
