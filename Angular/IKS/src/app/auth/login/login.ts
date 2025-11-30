import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { User } from '../../shared/classes/user';
import { AuthService } from '../../services/auth.service';
import { HorizontalDividerComponent } from '../../components/horizontal-divider/horizontal-divider.component';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule, HorizontalDividerComponent],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  users: User[] = [];
  tmpusr = '';
  tmppass = '';
  jao: any;
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  async login() {
    let f = true;

    let obj = { username: this.tmpusr, password: this.tmppass };
    this.authService.loginUser(obj).subscribe((jao) => {
      localStorage.setItem('user', JSON.stringify(jao['user']));
      localStorage.setItem('token', JSON.stringify(jao['token']));
      this.router.navigate(['/feed']);
    });

    if (f) {
      this.errorMessage = 'Incorrect username or password';
    }
  }
}
