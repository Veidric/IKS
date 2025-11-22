// src/app/profile/chat-page/chat-page.component.ts
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDateChat } from '../../shared/format-date-chat';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, OnDestroy {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef<HTMLDivElement>;

  idChat!: string;
  username!: string;
  userId!: number;
  messages: any[] = [];
  isLoading = true;
  form: FormGroup;
  private sub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService,
    private auth: AuthService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
    // read route param and state (React used location.state)
    this.idChat = this.route.snapshot.paramMap.get('id') || '';
    const nav = history.state || {};
    this.username = nav.username;
    this.userId = nav.userId;

    // fetch messages
    this.loadMessages();

    // If you want to refetch periodically, add polling logic here (not included).
  }

  loadMessages() {
    this.isLoading = true;
    const s = this.chatService.getChat(this.idChat).subscribe(
      (res: any) => {
        // ensure array and sort ascending by time like React
        const arr = Array.isArray(res) ? res : res || [];
        this.messages = arr.sort((a: any, b: any) => {
          const ta = new Date(a.TimeOfMessage).getTime();
          const tb = new Date(b.TimeOfMessage).getTime();
          return ta - tb;
        });
        this.isLoading = false;
        setTimeout(() => this.scrollToBottom(), 0);
      },
      () => {
        this.isLoading = false;
      }
    );
    this.sub.add(s);
  }

  sendMessage() {
    if (this.form.invalid) return;
    const content = this.form.controls['content'].value;
    const user = this.auth.user() || {};
    const payload = {
      idChat: this.idChat,
      idKorisnik: user.id,
      content
    };

    const s = this.chatService.addMessage(payload).pipe(
      switchMap(() => this.chatService.getChat(this.idChat))
    ).subscribe((res: any) => {
      this.form.reset();
      this.messages = (Array.isArray(res) ? res : res).sort((a: any, b: any) => {
        return new Date(a.TimeOfMessage).getTime() - new Date(b.TimeOfMessage).getTime();
      });
      setTimeout(() => this.scrollToBottom(), 0);
    });
    this.sub.add(s);
  }

  openProfile() {
    if (this.userId) {
      this.router.navigate(['/profile', this.userId]);
    }
  }

  formatDate(date: string | Date) {
    return formatDateChat(date);
  }

  private scrollToBottom() {
    try {
      const el = this.messagesContainer?.nativeElement;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    } catch (e) { /* ignore */ }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
