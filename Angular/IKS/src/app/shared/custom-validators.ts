import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  /** Validates that the input contains only letters */
  static usernameValidation(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    const lettersOnly = /^[A-Za-z_0-9]+$/;
    if (!lettersOnly.test(value)) {
      return { usernameValidation: true };
    }
    return null;
  }

  /** Validates that the input doesn't contain any special characters */
  static specialCharsValidation(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (specialChars.test(value)) {
      return { specialChars: true };
    }
    return null;
  }

  static numbersValidation(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    const hasNumber = /\d/.test(value);

    // If a number is found, return the error object
    if (hasNumber) {
      return { numbers: true };
    }
    return null;
  }

  /** Validates that the input doesn't contain multiple consecutive whitespaces */
  static multipleWhitespacesValidation(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    const multipleSpaces = /\s{2,}/;
    if (multipleSpaces.test(value)) {
      return { multipleSpaces: true };
    }
    return null;
  }

  /** Validates that the input doesn't have any whitespaces */
  static whitespaceValidation(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    const multipleSpaces = /\s{1,}/;
    if (multipleSpaces.test(value)) {
      return { multipleSpaces: true };
    }
    return null;
  }

  /** Validates that the input doesn't have leading whitespace */
  static leadingWhitespaceValidation(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    const leadingWhitespace = /^\S.*$/;
    if (!leadingWhitespace.test(value)) {
      return { leadingWhitespace: true };
    }
    return null;
  }

  static passwordMatchValidation: ValidatorFn = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null;
  };

  /** Retrieves the first error message for a given form control */
  static getErrorMessage(formGroup: FormGroup, controlName: string): string {
    const errorMessages: { [key: string]: string } = {
      required: 'This field is required',
      minlength: 'The value is too short',
      maxlength: 'The value is too long',
      specialChars: 'Special characters are not allowed',
      usernameValidation: 'Only letters, numbers and underscores are allowed',
      numbers: 'Numbers are not allowed',
      multipleSpaces: 'Multiple consecutive whitespaces are not allowed',
      leadingWhitespace: 'Leading whitespace is not allowed',
      whitespaceValidation: 'No whitespaces allowed',
    };
    const control = formGroup.get(controlName);
    if (control?.errors) {
      const firstErrorKey = Object.keys(control.errors)[0];
      const error = errorMessages[firstErrorKey];
      return error;
    }
    return '';
  }
}
