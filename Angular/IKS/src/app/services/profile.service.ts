import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private api: ApiService) {}

  getProfile(id: number | null): Observable<any> {
    return this.api.request('GET', `profile/${id}`);
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

  editUsername(id: number, username: string): Observable<any> {
    return this.api.request('PUT', 'editProfile', {
      idKorisnik: id,
      username,
    });
  }
}
