import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../shared/classes/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );

  public user$ = this.currentUserSubject.asObservable();

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

  getUser(): User | null {
    return this.currentUserSubject.value;
  }

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  setUsername(newName: string) {
    const current = this.currentUserSubject.value;
    if (current) {
      current.Username = newName;
      this.setUser(current);
    }
  }
}