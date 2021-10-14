import { AbstractControl, ValidationErrors } from '@angular/forms';
import { AppValidationErrors, AppValidatorFn } from '../types/form-types';

export type AppValidatorFnDecorator = (fn: AppValidatorFn) => AppValidatorFn;

export const composeValidator = (
  validator: AppValidatorFn,
  ...options: AppValidatorFnDecorator[]
) => {
  return options.reduceRight((acc, next) => next(acc), validator);
};

export const addErrors = (
  control: AbstractControl | null,
  errors: AppValidationErrors
) => {
  if (!control) {
    return;
  }

  const existingErrors = control.errors ?? {};

  control.setErrors({
    ...existingErrors,
    ...errors,
  });
};

export const removeErrors = (
  control: AbstractControl | null,
  ...errorKeys: string[]
) => {
  if (!control?.errors) {
    return;
  }

  let errors: ValidationErrors | null = control.errors;

  for (let errorKey in errorKeys) {
    delete errors[errorKey];
  }

  if (Object.keys(errors).length === 0) {
    errors = null;
  }

  control.setErrors(errors);
};
