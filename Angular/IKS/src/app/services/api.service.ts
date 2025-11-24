import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = 'http://localhost:8080/api'; // <- change to your backend URL

  constructor(public http: HttpClient) {}

  request(method: string, route: string, body?: any): Observable<any> {
    
    const url = `${this.BASE_URL}/${route}`;
    console.log(url)
    return this.http.request(method, url, { body });
    
  }
}
