import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AsyncPipe } from '@angular/common'; 

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  pathname: string = '';
  
  // Inject auth service
  public authService = inject(AuthService); 

  constructor(private router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.pathname = window.location.pathname;
    });
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}