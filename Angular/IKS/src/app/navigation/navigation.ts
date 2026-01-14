import { AuthService } from './../services/auth.service';
import { Component, signal } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  pathname: string = '';

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.pathname = window.location.pathname;
    });
  }

  visitProfile() {
    this.router.navigate(['/profile', this.authService.getUser().id]);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload();
  }
}
