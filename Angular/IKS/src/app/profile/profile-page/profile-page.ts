import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { PostsService } from '../../services/posts.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-profile-page',
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
  ) {}

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
