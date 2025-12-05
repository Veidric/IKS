import { Component } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { PostsListComponent } from '../components/post/post-list/post-list.component';
import { User } from '../shared/classes/user';

@Component({
  selector: 'app-feed',
  imports: [PostsListComponent],
  templateUrl: './feed.html',
  styleUrl: './feed.css',
})
export class Feed {
  user: User;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }
}
