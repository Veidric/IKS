import { AuthService } from './../../../services/auth.service';
import { Component, inject, Input, OnInit, signal, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsService } from '../../../services/posts.service';
import { PostComponent } from '../post/post.component';
import { Post } from '../../../shared/classes/post';
import { SortPostsPipe } from '../../../pipes/sort-posts-pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { PostFormComponent } from '../post-form/post-form.component';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, PostComponent, SortPostsPipe, MatTooltipModule],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostsListComponent {
  private _userId!: number | null;
  @Input()
  set userId(value: number | null) {
    this._userId = value;
    this.refetchPosts();
  }
  get userId(): number | null {
    return this._userId;
  }
  @Input() route!: string;
  @Input() canAddPost!: boolean;

  posts = signal<Post[]>([]);
  ratingsMap = signal<Map<number, number>>(new Map());

  filter: string = '';
  sortKey: string = 'date';

  readonly dialog = inject(MatDialog);

  constructor(private postsService: PostsService) {}

  refetchPosts() {
    this.loadPosts();
    this.loadPostRatings();
  }

  loadPosts() {
    this.postsService.fetchPosts(this.route, this.userId).subscribe((res) => {
      this.posts.set(res);
    });
  }
  loadPostRatings() {
    this.postsService.fetchPostRatings(this.userId).subscribe((res) => {
      const map = new Map(res.map((r) => [r.idPost, r.Value]));
      this.ratingsMap.set(map);
    });
  }

  setFilter(filter: string = '') {
    this.filter = filter;
    this.postsService.fetchPosts(this.filter, this.userId).subscribe((res) => {
      this.posts.set(res);
    });
  }

  setSortKey(key: string) {
    this.sortKey = key;
  }

  openDialog() {
    const dialogRef = this.dialog.open(PostFormComponent, {
      data: { type: 'create', content: '', visibility: 'public' },
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refetchPosts();
    });
  }
}
