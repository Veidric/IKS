import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';

import { PostsService } from '../../../services/posts.service';
import { AuthService } from '../../../services/auth.service';

import { TooltipComponent } from '../../tooltip/tooltip.component';

@Component({
  selector: 'app-post-form',
  standalone: true,
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule, TooltipComponent],
})
export class PostFormComponent {
  @Input() type: 'new' | 'edit' = 'new';
  @Input() post: any = { Content: null, Visibility: 'public' };

  open = false;
  isPending = false;
  form!: FormGroup;

  constructor(
    public fb: FormBuilder, // ← FIX: public
    private postData: PostsService,
    private auth: AuthService
  ) {
    this.form = this.fb.group({
      content: [
        this.post?.Content || '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(281)],
      ],
      visibility: [this.post?.Visibility || 'public'],
    });
  }

  toggleOpen() {
    this.open = !this.open;
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isPending = true;
    const vals = this.form.value;
    const currentUser = this.auth.getUser();

    if (this.type === 'new') {
      this.postData
        .addPost({
          idKorisnik: currentUser.id,
          content: vals.content,
          visibility: vals.visibility,
        })
        .subscribe({
          next: () => {
            this.form.reset();
            this.isPending = false;
            this.open = false;
          },
          error: () => (this.isPending = false),
        });
    } else {
      this.postData
        .editPost({
          idPost: this.post.PostID,
          content: vals.content,
          visibility: vals.visibility,
        })
        .subscribe({
          next: () => {
            this.form.reset();
            this.isPending = false;
            this.open = false;
          },
          error: () => (this.isPending = false),
        });
    }
  }
}
