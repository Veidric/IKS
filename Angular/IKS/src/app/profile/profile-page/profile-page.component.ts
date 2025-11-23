import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { forkJoin } from 'rxjs';

import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { PostsListComponent } from '../../components/post/post-list/post-list.component';
import { User } from '../../shared/Klase/user';

@Component({
  selector: 'app-profile-page',
  imports: [
    CommonModule,
    RouterModule,
    LoadingSpinnerComponent,
    UserInfoComponent,
    PostsListComponent,
    NgIf
  ],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  curUser: User = new User();
  loading = true;
  user: User = new User();
  followers: any[] = [];
  following: any[] = [];

  loaded: Promise<boolean> = Promise.resolve(false);

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    // @ts-ignore
    const resolved = this.route.snapshot.data['data']

    this.user = resolved.profile
    this.following = resolved.following
    this.followers = resolved.followers
    console.log(this.route.snapshot.data['data'])
    /*
    forkJoin({
      profile: this.profileService.getProfile(this.curUser.id),
      followers: this.profileService.getFollowers(this.curUser.id),
      following: this.profileService.getFollowing(this.curUser.id),
    }).subscribe(results => {
      this.user = results.profile;
      this.followers = results.followers;
      this.following = results.following;
      this.loading = false;
      this.loaded = Promise.resolve(true);
    });*/
  }
}
