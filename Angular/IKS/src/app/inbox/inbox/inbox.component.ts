// src/app/profile/inbox/inbox.component.ts
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { formatDateChat } from '../../shared/format-date-chat';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  chats: any[] = [];
  isLoading = true;
  userId!: number;
  username!: string;

  constructor(
    private chatService: ChatService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.auth.user() || {};
    this.userId = user.id;
    this.username = user.Username;

    this.chatService.getChats(this.userId).subscribe((res: any) => {
      const arr = Array.isArray(res) ? res : [];
      this.chats = arr.filter((c: any) => c.Content);
      this.isLoading = false;
    }, () => this.isLoading = false);
  }

  openChat(chat: any) {
    const username = chat.username1 === this.username ? chat.username2 : chat.username1;
    const userId = chat.idUser1 === this.userId ? chat.idUser2 : chat.idUser1;
    this.router.navigate(['/inbox/chat', chat.idChat], { state: { username, userId } });
  }

  formatDate(ts: string | Date) {
    return formatDateChat(ts);
  }
}
