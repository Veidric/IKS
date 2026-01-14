import { AuthService } from './../../services/auth.service';
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserInfoComponent } from '../user-info/user-info.component';
import { PostsListComponent } from '../../components/post/post-list/post-list.component';

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule, RouterModule, UserInfoComponent, PostsListComponent],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent {
  userId = signal<number>(0);

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId.set(Number(params.get('id')));
    });
  }

  get isCurrentUserProfile() {
    return this.userId() === this.authService.getUser()?.id;
  }
}
