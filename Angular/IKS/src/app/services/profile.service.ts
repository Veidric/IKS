import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private api: ApiService) {}

  getProfile(id: string | number): Observable<any> {
    return this.api.request('POST', 'profile', { idKorisnik: id });
  }

  getFollowers(id: string | number): Observable<any> {
    return this.api.request('POST', 'followers', { idKorisnik: id });
  }

  getFollowing(id: string | number): Observable<any> {
    return this.api.request('POST', 'followed', { idKorisnik: id });
  }

  follow(idUser: number, idFollow: number): Observable<any> {
    return this.api.request('POST', 'follow', {
      idKorisnik: idUser,
      idZapratiti: idFollow
    });
  }

  unfollow(idUser: number, idFollow: number): Observable<any> {
    return this.api.request('DELETE', 'follow', {
      idKorisnik: idUser,
      idZapratiti: idFollow
    });
  }

  editUsername(id: number, username: string): Observable<any> {
    return this.api.request('PUT', 'editProfile', {
      idKorisnik: id,
      username
    });
  }
}
