import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs';
import { ApiService } from '../../app/services/api.service';
import { User } from '../../app/shared/classes/user';

@Injectable({
  providedIn: 'root',
})
export class CmsService {
  private api = inject(ApiService);
  private http = inject(HttpClient); // Inject HttpClient

  private readonly baseUrl = 'http://localhost:8080/api'; 

  getAllUsers(): Observable<User[]> {
    return this.api.request('GET', 'admin/getUsers');
  }

  deleteUser(id: number): Observable<any> {
    return this.api.request('DELETE', 'admin/deleteUser', { id });
  }

  updateUser(payload: any): Observable<any> {
    return this.api.request('PUT', 'admin/editUser', payload);
  }

  getUserImage(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/profile/${id}/image`, {
      responseType: 'blob',
    });
  }

  deleteUserImage(id: number): Observable<any> {
    return this.api.request('DELETE', `profile/${id}/image`);
  }
}