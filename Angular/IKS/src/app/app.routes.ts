import { Routes } from '@angular/router';
import { ProfilePageComponent } from './profile/profile-page/profile-page.component';
import { ChatPageComponent } from './inbox/chat/chat-page.component';
import { Feed } from './feed/feed';
import { Auth } from './auth/auth/auth';
import { AuthGuard } from './auth/auth/auth-guard';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';

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
  { path: 'inbox/chat/:id', component: ChatPageComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'feed' },
];
