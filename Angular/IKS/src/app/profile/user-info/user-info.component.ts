import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { ChatService } from '../../services/chat.service';
import { MatDialog } from '@angular/material/dialog';
import { UsersListModalComponent } from '../users-list-modal/users-list-modal.component';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() user!: any;
  @Input() followers!: any[];
  @Input() following!: any[];

  editing = false;
  usernameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(20),
  ]);

  followingStatus = false;
  isLoggedUser = false;
  loggedUserId = 0;

  constructor(
    private auth: AuthService,
    private profileService: ProfileService,
    private chatService: ChatService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.loggedUserId = await this.auth.getUser().id;
    console.log(this.user);
    this.isLoggedUser = this.loggedUserId === this.user.id;

    this.followingStatus = this.followers.some((f) => f.id === this.loggedUserId);
    this.usernameControl.setValue(this.user.Username);
  }

  toggleFollow() {
    if (!this.followingStatus) {
      this.profileService
        .follow(this.loggedUserId, this.user.id)
        .subscribe(() => (this.followingStatus = true));
    } else {
      this.profileService
        .unfollow(this.loggedUserId, this.user.id)
        .subscribe(() => (this.followingStatus = false));
    }
  }

  messageUser() {
    this.chatService.createChat(this.loggedUserId, this.user.id).subscribe((chat) => {
      const id = chat[0].chatId;
      this.router.navigate(['/inbox/chat', id], { state: { username: this.user.Username } });
    });
  }

  saveUsername() {
    this.profileService.editUsername(this.user.id, this.usernameControl.value!).subscribe(() => {
      this.auth.setUsername(this.usernameControl.value!);
      this.editing = false;
    });
  }

  openFollowers() {
    this.dialog.open(UsersListModalComponent, {
      data: { list: this.followers, title: `${this.followers.length} followers` },
    });
  }

  openFollowing() {
    this.dialog.open(UsersListModalComponent, {
      data: { list: this.following, title: `${this.following.length} following` },
    });
  }
}
