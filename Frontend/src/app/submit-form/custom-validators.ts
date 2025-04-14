// src/app/submit-form/custom-validators.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static pastDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const today = new Date();
      const inputDate = new Date(control.value);
      return inputDate >= today ? { futureDate: true } : null;
    };
  }
}