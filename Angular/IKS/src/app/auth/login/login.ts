import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HorizontalDividerComponent } from '../../components/horizontal-divider/horizontal-divider.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../shared/classes/user';
import { CustomValidators } from '../../shared/custom-validators';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule, HorizontalDividerComponent],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  users: User[] = [];
  submitted: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  loginFormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      CustomValidators.leadingWhitespaceValidation,
      CustomValidators.usernameValidation,
      Validators.minLength(3),
      Validators.maxLength(45),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  errorMessage(controlName: string) {
    return CustomValidators.getErrorMessage(this.loginFormGroup, controlName);
  }

  login() {
    this.submitted = true;
    if (this.loginFormGroup.invalid) return;
    this.authService.loginUser(this.loginFormGroup.value).subscribe({
      next: (res) => {
        localStorage.setItem('user', JSON.stringify(res['user']));
        localStorage.setItem('token', JSON.stringify(res['token']));
        this.router.navigate(['/feed']);
        this.authService.setUser(res['user']);
      },
      error: (res) => {
        const errorMessage = res.status === 401 ? 'Wrong password' : "User doesn't exist";
        alert(errorMessage);
      },
    });
  }
}
