import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private api: ApiService) {}

  addChat(id1: number | string, id2: number | string): Observable<any> {
    return this.api.request('POST', 'newchat', {
      idKorisnik1: id1,
      idKorisnik2: id2
    });
  }

  createChat(id1: number | string, id2: number | string): Observable<any> {
    return this.addChat(id1, id2);
  }

  getChats(id: number | string): Observable<any> {
    return this.api.request('POST', 'chats', {
      idKorisnik: id
    });
  }

  getChat(id: number | string): Observable<any> {
    return this.api.request('POST', 'chat', {
      idChat: id
    });
  }

  addMessage(data: any): Observable<any> {
    return this.api.request('POST', 'sendmessage', data);
  }
}
