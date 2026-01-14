import { AuthService } from './../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, signal, SimpleChanges } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../shared/classes/user';
import { FormatDateProfilePipe } from '../../pipes/format-date-profile-pipe';
import { MatDialog } from '@angular/material/dialog';
import { FollowersList } from '../followers-list/followers-list';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, RouterModule, FormatDateProfilePipe],
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent {
  private _userId!: number | null;
  @Input()
  set userId(value: number | null) {
    this._userId = value;
    this.fetchAll();
  }
  get userId(): number | null {
    return this._userId;
  }
  @Input() isCurrentUserProfile!: boolean;

  user = signal<User>(new User());

  followersNumber = signal<number>(0);
  followingNumber = signal<number>(0);
  followers = signal<any[]>([]);
  following = signal<any[]>([]);

  isFollowing = signal<boolean>(false);

  readonly dialog = inject(MatDialog);

  constructor(private profileService: ProfileService, private authService: AuthService) {}

  fetchAll(): void {
    this.getProfileInfo();
    this.getFollowers();
    this.getFollowing();
  }

  getProfileInfo(): void {
    this.profileService.getProfile(this.userId).subscribe((res) => {
      this.user.update((user) => ({
        ...user,
        id: res.id,
        username: res.Username,
        password: undefined,
        name: res.Name,
        surname: res.Surname,
        dateOfBirth: res.DateOfBirth,
      }));
      this.followersNumber.set(res.Followers);
      this.followingNumber.set(res.Following);
    });
  }

  getFollowers(): void {
    this.profileService.getFollowers(this.userId).subscribe((res) => {
      this.followers.set(res);

      if (
        this.followers().find((follower) => {
          return follower.id === this.authService.getUser().id;
        })
      ) {
        this.isFollowing.set(true);
      } else {
        this.isFollowing.set(false);
      }
    });
  }

  getFollowing(): void {
    this.profileService.getFollowing(this.userId).subscribe((res) => {
      this.following.set(res);
    });
  }

  follow(): void {
    if (this.userId === null) return;
    this.profileService.follow(this.authService.getUser().id, this.userId).subscribe(() => {
      this.isFollowing.set(true);
      this.followersNumber.update((n) => n + 1);
      this.getFollowers();
    });
  }

  unfollow(): void {
    if (this.userId === null) return;
    this.profileService.unfollow(this.authService.getUser().id, this.userId).subscribe(() => {
      this.isFollowing.set(false);
      this.followersNumber.update((n) => n - 1);
      this.getFollowers();
    });
  }

  openDialog(type: string): void {
    const dialogRef = this.dialog.open(FollowersList, {
      data: type === 'followers' ? this.followers() : this.following(),
      autoFocus: false,
    });
  }
}
