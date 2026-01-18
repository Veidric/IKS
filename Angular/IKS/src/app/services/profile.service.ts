import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private api: ApiService,
    private http: HttpClient,
  ) {}

  getProfile(id: number | null): Observable<any> {
    return this.api.request('GET', `profile/${id}`);
  }
  getProfileImage(id: number): Observable<Blob> {
    return this.http.request('GET', `http://localhost:8080/api/profile/${id}/image`, {
      responseType: 'blob',
    });
  }
  editProfile(id: number, data: any): Observable<any> {
    return this.api.request('PUT', `profile/${id}`, data);
  }
  editProfileImage(id: number, data: FormData) {
    return this.api.request('POST', `profile/${id}/image`, data);
  }
  deleteProfileImage(id: number) {
    return this.api.request('DELETE', `profile/${id}/image`);
  }

  getFollowers(id: number | null): Observable<any> {
    return this.api.request('GET', `profile/followers/${id}`);
  }

  getFollowing(id: number | null): Observable<any> {
    return this.api.request('GET', `profile/following/${id}`);
  }

  follow(userId: number, userToFollowId: number): Observable<any> {
    return this.api.request('POST', 'profile/follow', {
      userId: userId,
      userToFollowId: userToFollowId,
    });
  }
  unfollow(userId: number, userToUnfollowId: number): Observable<any> {
    return this.api.request('DELETE', 'profile/follow', {
      userId: userId,
      userToUnfollowId: userToUnfollowId,
    });
  }
}
