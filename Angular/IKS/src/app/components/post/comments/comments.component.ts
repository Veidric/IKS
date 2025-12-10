import { Component, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostsService } from '../../../services/posts.service';
import { Comment } from '../../../shared/classes/comment';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent {
  readonly dialogRef = inject(MatDialogRef<CommentsComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  commentGroup = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.maxLength(256)]),
  });
  get content() {
    return this.commentGroup.get('content');
  }
  submitted: boolean = false;

  comments = signal<Comment[]>([]);

  constructor(
    private postsService: PostsService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postsService.fetchComments(this.data.postId).subscribe((res) => {
      this.comments.set(res);
    });
  }

  submitComment() {
    this.submitted = true;
    if (this.commentGroup.invalid) {
      return;
    } else {
      this.postsService
        .addComment(this.data.postId, {
          userId: this.auth.getUser().id,
          content: this.commentGroup.value.content,
        })
        .subscribe((res) => {
          if (res.message === 'Success!') {
            this.comments.update((comments) => [
              ...comments,
              new Comment(
                this.auth.getUser().id,
                this.auth.getUser().username,
                this.commentGroup.value.content!
              ),
            ]);
            this.commentGroup.reset();
            this.submitted = false;
          }
        });
    }
  }

  visitProfile(id: number) {
    this.dialogRef.close();
    this.router.navigate(['/profile', id]);
  }
}
