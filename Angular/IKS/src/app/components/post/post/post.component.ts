import { Component, Input, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

import { Post } from '../../../shared/classes/post';
import { FormatDatePostPipe } from '../../../pipes/format-date-post-pipe';
import { CommentsComponent } from '../comments/comments.component';
import { PostsService } from '../../../services/posts.service';

@Component({
  selector: 'app-post',
  standalone: true,
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RouterModule, FormatDatePostPipe, CommentsComponent],
})
export class PostComponent implements OnInit {
  @Input() post: Post = new Post();
  @Input() userRating: string = '';

  userPostRating = signal<number>(0);
  postRating = 0;
  currentUser: any;

  constructor(public auth: AuthService, private postsService: PostsService) {}

  ngOnInit(): void {
    this.postRating = +this.post.Rating;
    this.userPostRating.set(+this.userRating);
    this.currentUser = this.auth.getUser();
  }

  pressLike() {
    if (this.userPostRating() === 0) {
      this.postsService
        .ratePost(this.currentUser.id, { idPost: this.post.PostID, value: 1 })
        .subscribe(() => {
          this.postRating += +1;
          this.userPostRating.set(1);
        });
    } else if (this.userPostRating() === -1) {
      this.postsService
        .unratePost(this.currentUser.id, { idPost: this.post.PostID })
        .subscribe(() => {
          this.postsService
            .ratePost(this.currentUser.id, { idPost: this.post.PostID, value: 1 })
            .subscribe(() => {
              this.postRating += 2;
              this.userPostRating.set(1);
            });
        });
    } else {
      this.postsService
        .unratePost(this.currentUser.id, { idPost: this.post.PostID })
        .subscribe(() => {
          this.postRating -= 1;
          this.userPostRating.set(0);
        });
    }
  }

  pressDislike() {
    if (this.userPostRating() === 0) {
      this.postsService
        .ratePost(this.currentUser.id, { idPost: this.post.PostID, value: -1 })
        .subscribe(() => {
          this.postRating -= 1;
          this.userPostRating.set(-1);
        });
    } else if (this.userPostRating() === 1) {
      this.postsService
        .unratePost(this.currentUser.id, { idPost: this.post.PostID })
        .subscribe(() => {
          this.postsService
            .ratePost(this.currentUser.id, { idPost: this.post.PostID, value: -1 })
            .subscribe(() => {
              this.postRating -= 2;
              this.userPostRating.set(-1);
            });
        });
    } else {
      this.postsService
        .unratePost(this.currentUser.id, { idPost: this.post.PostID })
        .subscribe(() => {
          this.postRating += 1;
          this.userPostRating.set(0);
        });
    }
  }
}
