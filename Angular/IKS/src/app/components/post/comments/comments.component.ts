import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent {
  @Input() postId: number = 0;
  @Input() initialNumberOfComments: number = 0;

  numberOfComments: number = this.initialNumberOfComments;

  // openComments() {
  //   this.isPending = true;

  //   this.postData.fetchComments({ idObjava: this.postId }).subscribe({
  //     next: (res: any[]) => {
  //       this.comments = res || [];
  //       this.open = true;
  //       this.isPending = false;
  //     },
  //     error: () => (this.isPending = false),
  //   });
  // }

  // submitComment() {
  //   if (this.commentForm.invalid) return;

  //   const user = this.auth.user();
  //   const content = this.commentForm.value.content!;
  //   this.isPending = true;

  //   this.postData
  //     .addComment({
  //       idKorisnik: user.id,
  //       idPost: this.postId,
  //       content,
  //     })
  //     .subscribe({
  //       next: () => {
  //         this.comments.push({
  //           id: user.id,
  //           Username: user.username,
  //           Content: content,
  //         });

  //         this.numberOfComments++;
  //         this.commentForm.reset();
  //         this.isPending = false;
  //       },
  //       error: () => (this.isPending = false),
  //     });
  // }

  // visitProfile(id: number) {
  //   this.open = false;
  //   this.router.navigate(['/profile', id]);
  // }
}
