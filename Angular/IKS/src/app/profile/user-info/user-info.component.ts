import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { AuthService } from './../../services/auth.service';

import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormatDateProfilePipe } from '../../pipes/format-date-profile-pipe';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../shared/classes/user';
import { EditProfile } from '../edit-profile/edit-profile';
import { FollowersList } from '../followers-list/followers-list';
import { UploadImageForm } from '../upload-image-form/upload-image-form';

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

  profileImagePath = signal<SafeUrl | null>(null);

  readonly dialog = inject(MatDialog);

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
  ) {}

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

      this.profileService.getProfileImage(res.id).subscribe((res) => {
        const imageURL = URL.createObjectURL(res);
        this.profileImagePath.set(this.sanitizer.bypassSecurityTrustUrl(imageURL));
      });
    });
  }

  getFollowers(): void {
    this.profileService.getFollowers(this.userId).subscribe((res) => {
      this.followers.set(res);

      if (
        this.followers().find((follower) => {
          return follower.id === this.authService.getUser()?.id;
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
    const loggedUserId = this.authService.getUser()?.id || null;
    if (this.userId === null || loggedUserId === null) return;
    this.profileService.follow(loggedUserId, this.userId).subscribe(() => {
      this.isFollowing.set(true);
      this.followersNumber.update((n) => n + 1);
      this.getFollowers();
    });
  }

  unfollow(): void {
    const loggedUserId = this.authService.getUser()?.id || null;
    if (this.userId === null || loggedUserId === null) return;
    this.profileService.unfollow(loggedUserId, this.userId).subscribe(() => {
      this.isFollowing.set(false);
      this.followersNumber.update((n) => n - 1);
      this.getFollowers();
    });
  }

  openUsersList(type: string): void {
    if (type === 'followers' && this.followersNumber() === 0) return;
    if (type === 'following' && this.followingNumber() === 0) return;
    this.dialog.open(FollowersList, {
      data: type === 'followers' ? this.followers() : this.following(),
      autoFocus: false,
    });
  }

  editProfile(): void {
    this.dialog
      .open(EditProfile, {
        data: this.user(),
        autoFocus: false,
      })
      .afterClosed()
      .subscribe(() => {
        this.getProfileInfo();
      });
  }

  changeProfileImage(): void {
    this.dialog
      .open(UploadImageForm, {
        data: this.user(),
        autoFocus: false,
      })
      .afterClosed()
      .subscribe(() => {
        this.getProfileInfo();
      });
  }
}
