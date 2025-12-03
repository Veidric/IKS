import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private api: ApiService) {}

  fetchPosts(route: string, id: number | string): Observable<any> {
    return this.api.request('GET', `posts/${id}/${route}`);
  }

  addPost(data: any): Observable<any> {
    return this.api.request('POST', 'posts', data);
  }

  editPost(data: any): Observable<any> {
    return this.api.request('PUT', 'posts', data);
  }

  fetchComments(id: any): Observable<any> {
    return this.api.request('GET', 'posts/comments/' + id);
  }

  addComment(data: any): Observable<any> {
    return this.api.request('POST', 'posts/comments/', data);
  }

  fetchPostRatings(id: number | string): Observable<any> {
    return this.api.request('GET', 'posts/ratings/' + id);
  }

  ratePost(data: any): Observable<any> {
    return this.api.request('POST', 'postrate', data);
  }

  unratePost(data: any): Observable<any> {
    return this.api.request('DELETE', 'rate', data);
  }
}
