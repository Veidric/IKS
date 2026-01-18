import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomValidators } from '../../shared/custom-validators';

@Component({
  selector: 'app-register',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  submitted: boolean = false;
  errorResponseMessage: string = "There's been an issue";

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  registerFormGroup = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        CustomValidators.leadingWhitespaceValidation,
        CustomValidators.usernameValidation,
        Validators.minLength(3),
        Validators.maxLength(45),
      ]),
      password: new FormControl('', [
        Validators.required,
        CustomValidators.leadingWhitespaceValidation,
        CustomValidators.whitespaceValidation,
        Validators.min(5),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      name: new FormControl('', [
        Validators.required,
        CustomValidators.leadingWhitespaceValidation,
        CustomValidators.specialCharsValidation,
        CustomValidators.numbersValidation,
        CustomValidators.multipleWhitespacesValidation,
        Validators.minLength(2),
        Validators.maxLength(45),
      ]),
      surname: new FormControl('', [
        Validators.required,
        CustomValidators.leadingWhitespaceValidation,
        CustomValidators.specialCharsValidation,
        CustomValidators.numbersValidation,
        CustomValidators.multipleWhitespacesValidation,
        Validators.minLength(2),
        Validators.maxLength(45),
      ]),
      dateOfBirth: new FormControl([Validators.required]),
    },
    { validators: CustomValidators.passwordMatchValidation },
  );

  errorMessage(controlName: string) {
    return CustomValidators.getErrorMessage(this.registerFormGroup, controlName);
  }

  register() {
    this.submitted = true;
    if (this.registerFormGroup.invalid) return;
    const request = this.registerFormGroup.value;
    delete request.confirmPassword;
    this.authService.registerUser(request).subscribe({
      next: () => {
        alert('User created successfully!');
        this.router.navigate(['/login']);
      },
      error: (res) => {
        if (res.error.message.includes('Duplicate entry')) {
          this.errorResponseMessage = `User '${request.username}' already exsists`;
        }
        alert(this.errorResponseMessage);
      },
    });
  }
}
