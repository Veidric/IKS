import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';

import { PostsService } from '../../../services/posts.service';
import { AuthService } from '../../../services/auth.service';

import { PostFormComponent } from '../post-form/post-form.component';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, PostFormComponent, PostComponent],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostsListComponent implements OnInit {
  @Input() route!: string;
  @Input() userId!: number;

  posts: any[] = [];
  ratings: any[] = [];

  filter!: string;
  sortKey: string = 'Rating';

  loadingPosts = true;
  loadingRatings = true;

  currentUser: any;
  canAddPost = false;

  constructor(private postsService: PostsService, private auth: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.auth.user();
    this.filter = this.route;
    this.canAddPost = +this.currentUser.id === +this.userId;

    this.loadPosts();
    this.loadRatings();
  }

  loadPosts() {
    this.loadingPosts = true;

    this.postsService.fetchPosts(this.filter, this.userId!).subscribe({
      next: (res) => {
        this.posts = res || [];
        this.sortPosts();
        this.loadingPosts = false;
      },
      error: () => (this.loadingPosts = false),
    });
  }

  loadRatings() {
    this.loadingRatings = true;

    this.postsService.fetchPostRatings(this.currentUser.id).subscribe({
      next: (res) => {
        this.ratings = res || [];
        this.loadingRatings = false;
      },
      error: () => (this.loadingRatings = false),
    });
  }

  getRatingFor(postId: number) {
    return this.ratings?.find((r) => r.idPost === postId);
  }

  setFilter(filter: string) {
    this.filter = filter;
    this.loadPosts();
  }

  setSortKey(key: string) {
    this.sortKey = key;
    this.sortPosts();
  }

  sortPosts() {
    if (!this.posts?.length) return;

    this.posts = [...this.posts].sort((a, b) => {
      if (this.sortKey === 'Rating') return b.Rating - a.Rating;
      if (this.sortKey === 'DateOfPosting')
        return +new Date(b.DateOfPosting) - +new Date(a.DateOfPosting);
      return 0;
    });
  }
}
