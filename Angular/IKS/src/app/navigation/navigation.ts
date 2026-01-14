import { Component, signal } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../shared/classes/user';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  pathname: string = '';
  currentUser = signal<User | null>(null);
  private userSub!: Subscription;

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.pathname = window.location.pathname;
    });
  }

  ngOnInit() {
    this.userSub = this.authService.user$.subscribe((user) => {
      this.currentUser.set(user);
    });
  }

  visitProfile() {
    this.router.navigate(['/profile', this.authService.getUser()?.id]);
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
