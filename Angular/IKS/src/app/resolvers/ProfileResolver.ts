import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../shared/classes/user';
import { ProfileService } from '../services/profile.service';
import { forkJoin } from 'rxjs';

import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<any> {
  curUser: User = new User();
  loading = true;
  user: User = new User();
  followers: any[] = [];
  following: any[] = [];

  constructor(private profileService: ProfileService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    //@ts-ignore
    this.curUser = JSON.parse(localStorage.getItem('user'));
    let id = this.curUser.id;
    return forkJoin({
      profile: this.profileService.getProfile(id),
      followers: this.profileService.getFollowers(id),
      following: this.profileService.getFollowing(id),
    });
  }
}
