import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../app/services/api.service'; // Adjust path to your ApiService
import { User } from '../../app/shared/classes/user';

@Injectable({
  providedIn: 'root',
})
export class CmsService {
  private api = inject(ApiService);

  // GET all users
  getAllUsers(): Observable<User[]> {
    return this.api.request('GET', 'admin/getUsers');
  }

  // DELETE a user
  deleteUser(id: number): Observable<any> {
    return this.api.request('DELETE', 'admin/deleteUser', { id });
  }

  // UPDATE a user
  updateUser(payload: any): Observable<any> {
    return this.api.request('PUT', 'admin/editUser', payload);
  }
}
