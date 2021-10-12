import { AbstractControl, NgControl, ValidationErrors } from '@angular/forms';
import { AppValidationErrors } from '../types/form-types';

export const getErrorMessage = (
  control: NgControl | AbstractControl | null | undefined
) => {
  const errors = control?.errors;

  if (!errors) {
    return null;
  }

  const errorKeys: AppValidationErrors | ValidationErrors = Object.keys(errors);

  for (let i = 0; i < errorKeys.length; i++) {
    const key = errorKeys[i];

    if (
      'suppressErrorMessages' in errors[key] &&
      errors[key].suppressErrorMessages === true
    ) {
      continue;
    }

    if ('message' in errors[key]) {
      return errors[key].message;
    }
  }

  return null;
};

export const shouldEmitError = (
  control: NgControl | AbstractControl | undefined | null
): boolean => {
  if (!control?.errors) {
    return false;
  }

  return control.touched === true && control.invalid === true;
};
