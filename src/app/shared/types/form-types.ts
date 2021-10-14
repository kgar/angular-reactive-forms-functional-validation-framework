import { AbstractControl } from '@angular/forms';

export type AppValidatorFnFactory<TParams> = (
  params: TParams
) => AppValidatorFn;

export type AppValidatorFn = {
  (control: AbstractControl): AppValidationErrors | null;
};

type AppValidationError = {
  message: string;
  suppressErrorMessages?: boolean;
  [key: string]: any;
};

export type AppValidationErrors = {
  [key: string]: AppValidationError | boolean;
};
