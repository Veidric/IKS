import { Routes } from '@angular/router';

import { ProfilePageComponent } from './profile/profile-page/profile-page.component';
import { ChatPageComponent } from './inbox/chat/chat-page.component';
import { Login } from './login/login';
import { Register } from './register/register';
import { PostsResolver } from './resolvers/PostsResolver';


export const routes: Routes = [
  {path: '', component: Login},
  {path: 'reg', component: Register},
  { path: 'profile', component: ProfilePageComponent, resolve: {data: PostsResolver} },
  { path: 'inbox/chat/:id', component: ChatPageComponent }
];
