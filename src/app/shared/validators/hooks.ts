import { AbstractControl } from '@angular/forms';
import { AppValidatorFn } from '../types/form-types';

export const withCustomMessage = (message: string) => (fn: AppValidatorFn) => {
  return (control: AbstractControl) => {
    var result = fn(control);

    if (result) {
      for (let key in result) {
        const validation = result[key];
        validation.message = message;
      }
    }

    return result;
  };
};

export const useParentControl = (fn: AppValidatorFn) => {
  return (control: AbstractControl) => {
    const parent = control.parent;

    if (parent === null) {
      return null;
    }

    return fn(parent);
  };
};

export const suppressErrorMessage = (fn: AppValidatorFn) => {
  return (control: AbstractControl) => {
    const result = fn(control);

    if (!result) {
      return result;
    }

    for (let errorKey in result) {
      const error = result[errorKey];
      error.suppressErrorMessages = true;
    }

    return result;
  };
};

export const notifyChildren =
  (childNames: string[]) =>
  (fn: AppValidatorFn) =>
  (control: AbstractControl) => {
    const result = fn(control);

    setTimeout(() => {
      childNames?.forEach((name) => {
        control.get(name)?.updateValueAndValidity({ onlySelf: true });
      });
    }, 0);

    return result;
  };
