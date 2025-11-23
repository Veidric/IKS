import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { forkJoin } from 'rxjs';

import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { PostsListComponent } from '../../components/post/post-list/post-list.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoadingSpinnerComponent,
    UserInfoComponent,
    PostsListComponent,
    NgIf
  ],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  loading = true;
  user: any;
  followers: any[] = [];
  following: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;

    forkJoin({
      profile: this.profileService.getProfile(id),
      followers: this.profileService.getFollowers(id),
      following: this.profileService.getFollowing(id),
    }).subscribe(results => {
      this.user = results.profile;
      this.followers = results.followers;
      this.following = results.following;
      this.loading = false;
    });
  }
}
