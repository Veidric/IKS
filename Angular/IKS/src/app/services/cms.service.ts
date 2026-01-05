import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../app/services/api.service'; // Adjust path to your ApiService
import { Observable } from 'rxjs';
import { User } from '../../app/shared/classes/user';

@Injectable({
  providedIn: 'root'
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
  // We reconstruct the payload here so the component doesn't worry about backend field names
  updateUser(user: User): Observable<any> {
    const payload = {
      id: user.id,
      Username: user.Username,
      Name: user.Name,
      Surname: user.Surname,
      DateOfBirth: user.DateOfBirth,
      IsAdmin: user.IsAdmin
    };
    
    return this.api.request('PUT', 'admin/editUser', payload);
  }
}