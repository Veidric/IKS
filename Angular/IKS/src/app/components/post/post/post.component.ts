import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PostsService } from '../../../services/posts.service';
import { AuthService } from '../../../services/auth.service';

import { CommentsComponent } from '../comments/comments.component';

import { formatDatePost } from '../../../shared/format-date-post';

@Component({
  selector: 'app-post',
  standalone: true,
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  imports: [
    CommonModule,
    NgIf,
    RouterModule,
    CommentsComponent
  ]
})
export class PostComponent implements OnInit {
  @Input() post: any;
  @Input() rating: any;

  userPostRating = 0;
  postRating = 0;
  currentUser: any;

  // expose function to template
  formatDatePost = formatDatePost;

  constructor(
    private postData: PostsService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.auth.user();
    this.userPostRating = this.rating ? this.rating.Value : 0;
    this.postRating = +this.post.Rating;
  }

  pressLike() {
    const id = this.currentUser.id;

    if (this.userPostRating === 0) {
      this.postData.ratePost({ idKorisnik: id, idPost: this.post.PostID, value: 1 })
        .subscribe(() => {
          this.userPostRating = 1;
          this.postRating += 1;
        });
    } else if (this.userPostRating === 1) {
      this.postData.unratePost({ idKorisnik: id, idPost: this.post.PostID })
        .subscribe(() => {
          this.userPostRating = 0;
          this.postRating -= 1;
        });
    } else {
      this.postData.unratePost({ idKorisnik: id, idPost: this.post.PostID })
        .subscribe(() => {
          this.postData.ratePost({ idKorisnik: id, idPost: this.post.PostID, value: 1 })
            .subscribe(() => {
              this.userPostRating = 1;
              this.postRating += 2;
            });
        });
    }
  }

  pressDislike() {
    const id = this.currentUser.id;

    if (this.userPostRating === 0) {
      this.postData.ratePost({ idKorisnik: id, idPost: this.post.PostID, value: -1 })
        .subscribe(() => {
          this.userPostRating = -1;
          this.postRating -= 1;
        });
    } else if (this.userPostRating === -1) {
      this.postData.unratePost({ idKorisnik: id, idPost: this.post.PostID })
        .subscribe(() => {
          this.userPostRating = 0;
          this.postRating += 1;
        });
    } else {
      this.postData.unratePost({ idKorisnik: id, idPost: this.post.PostID })
        .subscribe(() => {
          this.postData.ratePost({ idKorisnik: id, idPost: this.post.PostID, value: -1 })
            .subscribe(() => {
              this.userPostRating = -1;
              this.postRating -= 2;
            });
        });
    }
  }
}
