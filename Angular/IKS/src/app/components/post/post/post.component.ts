import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

import { Post } from '../../../shared/classes/post';
import { FormatDatePostPipe } from '../../../pipes/format-date-post-pipe';
import { CommentsComponent } from '../comments/comments.component';

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
  @Input() rating: any;

  userPostRating = 0;
  postRating = 0;
  currentUser: any;

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.userPostRating = this.rating ? this.rating.Value : 0;
    this.postRating = +this.post.Rating;
  }

  // TODO: Implement like functionality
  pressLike() {
    console.log('Like pressed');
    // const id = this.currentUser.id;

    // if (this.userPostRating === 0) {
    //   this.postData
    //     .ratePost({ idKorisnik: id, idPost: this.post.PostID, value: 1 })
    //     .subscribe(() => {
    //       this.userPostRating = 1;
    //       this.postRating += 1;
    //     });
    // } else if (this.userPostRating === 1) {
    //   this.postData.unratePost({ idKorisnik: id, idPost: this.post.PostID }).subscribe(() => {
    //     this.userPostRating = 0;
    //     this.postRating -= 1;
    //   });
    // } else {
    //   this.postData.unratePost({ idKorisnik: id, idPost: this.post.PostID }).subscribe(() => {
    //     this.postData
    //       .ratePost({ idKorisnik: id, idPost: this.post.PostID, value: 1 })
    //       .subscribe(() => {
    //         this.userPostRating = 1;
    //         this.postRating += 2;
    //       });
    //   });
    // }
  }

  // TODO: Implement dislike functionality
  pressDislike() {
    console.log('Dislike pressed');
    //   const id = this.currentUser.id;

    //   if (this.userPostRating === 0) {
    //     this.postData
    //       .ratePost({ idKorisnik: id, idPost: this.post.PostID, value: -1 })
    //       .subscribe(() => {
    //         this.userPostRating = -1;
    //         this.postRating -= 1;
    //       });
    //   } else if (this.userPostRating === -1) {
    //     this.postData.unratePost({ idKorisnik: id, idPost: this.post.PostID }).subscribe(() => {
    //       this.userPostRating = 0;
    //       this.postRating += 1;
    //     });
    //   } else {
    //     this.postData.unratePost({ idKorisnik: id, idPost: this.post.PostID }).subscribe(() => {
    //       this.postData
    //         .ratePost({ idKorisnik: id, idPost: this.post.PostID, value: -1 })
    //         .subscribe(() => {
    //           this.userPostRating = -1;
    //           this.postRating -= 2;
    //         });
    //     });
    //   }
    // }
  }
}
