import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { User } from '../../shared/classes/user';
import { DateFormating } from '../../shared/date-formating';
import { ProfileService } from './../../services/profile.service';
import { CustomValidators } from './../../shared/custom-validators';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
  imports: [ReactiveFormsModule],
})
export class EditProfile {
  readonly dialogRef = inject(MatDialogRef<EditProfile>);
  readonly data = inject<User>(MAT_DIALOG_DATA);
  authService = inject(AuthService);
  profileService = inject(ProfileService);

  submitted: boolean = false;

  userFormGroup = new FormGroup({
    username: new FormControl(this.data.username, [
      Validators.required,
      CustomValidators.leadingWhitespaceValidation,
      CustomValidators.usernameValidation,
      Validators.minLength(3),
      Validators.maxLength(45),
    ]),
    name: new FormControl(this.data.name, [
      Validators.required,
      CustomValidators.leadingWhitespaceValidation,
      CustomValidators.specialCharsValidation,
      CustomValidators.numbersValidation,
      CustomValidators.multipleWhitespacesValidation,
      Validators.minLength(2),
      Validators.maxLength(45),
    ]),
    surname: new FormControl(this.data.surname, [
      Validators.required,
      CustomValidators.leadingWhitespaceValidation,
      CustomValidators.specialCharsValidation,
      CustomValidators.numbersValidation,
      CustomValidators.multipleWhitespacesValidation,
      Validators.minLength(2),
      Validators.maxLength(45),
    ]),
    dateOfBirth: new FormControl(DateFormating.formatDateForInput(this.data.dateOfBirth), [
      Validators.required,
    ]),
  });

  errorMessage(controlName: string): string {
    return CustomValidators.getErrorMessage(this.userFormGroup, controlName);
  }

  onSubmit() {
    this.submitted = true;
    if (this.userFormGroup.invalid) return;
    this.profileService
      .editProfile(this.data.id, { ...this.userFormGroup.value })
      .subscribe((res) => {
        if (res.message === 'Success!') {
          this.userFormGroup.reset();
          this.dialogRef.close();
        }
      });
  }
}
