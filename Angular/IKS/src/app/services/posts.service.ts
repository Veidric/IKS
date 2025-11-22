import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private api: ApiService) {}

  fetchPosts(route: string, id: number | string): Observable<any> {
    return this.api.request('POST', route, { idKorisnik: id });
  }

  fetchPostRatings(id: number | string): Observable<any> {
    return this.api.request('POST', 'ratings', { idKorisnik: id });
  }

  addPost(data: any): Observable<any> {
    return this.api.request('POST', 'makepost', data);
  }

  editPost(data: any): Observable<any> {
    return this.api.request('PUT', 'editPost', data);
  }

  getComments(data: any): Observable<any> {
    return this.api.request('POST', 'comments', data);
  }

  addComment(data: any): Observable<any> {
    return this.api.request('POST', 'makecomment', data);
  }

  ratePost(data: any): Observable<any> {
    return this.api.request('POST', 'rate', data);
  }

  unratePost(data: any): Observable<any> {
    return this.api.request('DELETE', 'rate', data);
  }
}
