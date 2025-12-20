import { bootstrapApplication } from '@angular/platform-browser';
import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';

import { PostsService } from '../../../services/posts.service';
import { AuthService } from '../../../services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-post-form',
  standalone: true,
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class PostFormComponent {
  readonly dialogRef = inject(MatDialogRef<PostFormComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  submitted: boolean = false;
  updated: boolean = false;

  postFormGroup = new FormGroup({
    content: new FormControl(this.data.content, [Validators.required, Validators.maxLength(281)]),
    visibility: new FormControl(this.data.visibility, [Validators.required]),
  });

  get content() {
    return this.postFormGroup.get('content');
  }

  constructor(private postsService: PostsService, private auth: AuthService) {}

  onSubmit() {
    this.submitted = true;
    if (this.postFormGroup.invalid) return;
    else {
      if (this.data.type === 'create') {
        this.postsService
          .addPost(this.auth.getUser().id, this.postFormGroup.value)
          .subscribe((res) => {
            if (res.message === 'Success!') {
              this.postFormGroup.reset();
              this.dialogRef.close();
            }
          });
      } else {
        this.postsService
          .editPost({ ...this.postFormGroup.value, postId: this.data.postId })
          .subscribe((res) => {
            if (res.message === 'Success!') {
              this.updated = true;
              this.postFormGroup.reset();
              this.dialogRef.close();
            }
          });
      }
    }
  }
}
