import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsService } from '../../../services/posts.service';
import { PostComponent } from '../post/post.component';
import { Post } from '../../../shared/classes/post';
import { SortPostsPipe } from '../../../pipes/sort-posts-pipe';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, PostComponent, SortPostsPipe],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostsListComponent implements OnInit {
  @Input() route!: string;
  @Input() userId!: number;

  posts = signal<Post[]>([]);
  ratings: any[] = [];

  filter: string = '';

  sortKey: string = 'date';

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
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
      this.ratings = res;
    });
  }

  getPostRating(postId: number): string {
    const rating = this.ratings.find((r) => r.idPost === postId);
    return rating ? rating.Value : '0';
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
}
