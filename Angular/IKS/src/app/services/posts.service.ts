import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Rating } from '../shared/classes/rating';
import { Comment } from '../shared/classes/comment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private api: ApiService) {}

  fetchPosts(route: string, id: number | string): Observable<any> {
    return this.api.request('GET', `posts/${id}/${route}`);
  }

  addPost(id: number, data: any): Observable<any> {
    return this.api.request('POST', `posts/${id}`, data);
  }

  editPost(data: any): Observable<any> {
    return this.api.request('PUT', 'posts', data);
  }

  fetchComments(postId: number): Observable<Comment[]> {
    return this.api.request('GET', 'posts/comments/' + postId);
  }

  addComment(postId: number, data: any): Observable<any> {
    return this.api.request('POST', `posts/comments/${postId}`, data);
  }

  fetchPostRatings(id: number | string): Observable<Rating[]> {
    return this.api.request('GET', `posts/${id}/ratings`);
  }

  ratePost(id: number, data: any): Observable<any> {
    return this.api.request('POST', `posts/${id}/ratings`, data);
  }

  unratePost(id: number, data: any): Observable<any> {
    return this.api.request('DELETE', `posts/${id}/ratings`, data);
  }
}
