import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { PostsService } from '../../../services/posts.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() postId!: number;
  @Input() initialNumberOfComments = 0;

  open = false;
  comments: any[] = [];
  numberOfComments = 0;
  isPending = false;
  commentForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private postData: PostsService,
    private auth: AuthService,
    private router: Router      // <-- added
  ) {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]]
    });
  }

  ngOnInit(): void {
    this.numberOfComments = this.initialNumberOfComments;
  }

  openComments() {
    this.isPending = true;

    this.postData.getComments({ idObjava: this.postId }).subscribe({
      next: (res: any[]) => {
        this.comments = res || [];
        this.open = true;
        this.isPending = false;
      },
      error: () => this.isPending = false
    });
  }

  submitComment() {
    if (this.commentForm.invalid) return;

    const user = this.auth.user();
    const content = this.commentForm.value.content!;
    this.isPending = true;

    this.postData.addComment({
      idKorisnik: user.id,
      idPost: this.postId,
      content
    }).subscribe({
      next: () => {
        this.comments.push({
          id: user.id,
          Username: user.Username,
          Content: content
        });

        this.numberOfComments++;
        this.commentForm.reset();
        this.isPending = false;
      },
      error: () => this.isPending = false
    });
  }

  visitProfile(id: number) {
    this.open = false;
    this.router.navigate(['/profile', id]);
  }
}
