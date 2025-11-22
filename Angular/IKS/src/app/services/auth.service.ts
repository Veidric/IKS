import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: any = null;

  constructor(private api: ApiService) {}

  registerUser(data: any): Observable<any> {
    return this.api.request('POST', 'auth/register', data);
  }

  loginUser(data: any): Observable<any> {
    return this.api.request('POST', 'auth/login', data);
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
      this.currentUser.Username = newName;
    }
  }
}
