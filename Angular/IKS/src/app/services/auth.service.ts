import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { User } from '../shared/classes/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // @ts-ignore
  private currentUser: User = JSON.parse(localStorage.getItem('user'));

  constructor(private api: ApiService) {}

  loginUser(data: any): Observable<any> {
    return this.api.request('POST', 'auth/login', data);
  }

  registerUser(data: any): Observable<any> {
    return this.api.request('POST', 'auth/register', data);
  }

  editProfile(data: any): Observable<any> {
    return this.api.request('PUT', 'editProfile', data);
  }

  user() {
    return this.currentUser;
  }

  setUser(user: any) {
    this.currentUser = user;
  }

  setUsername(newName: string) {
    if (this.currentUser) {
      this.currentUser.username = newName;
    }
  }
}
