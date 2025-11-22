import { Routes } from '@angular/router';

import { ProfilePageComponent } from './profile/profile-page/profile-page';
import { ChatPageComponent } from './inbox/chat/chat-page.component';


export const routes: Routes = [
  { path: 'profile/:id', component: ProfilePageComponent },
  { path: 'inbox/chat/:id', component: ChatPageComponent }
];
