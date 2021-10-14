import { AbstractControl } from '@angular/forms';

export type AppValidatorFnFactory<TParams> = (
  params: TParams
) => AppValidatorFn;

export type AppValidatorFn = {
  (control: AbstractControl): AppValidationErrors | null;
};

export type AppValidationErrors = {
  [key: string]:
    | {
        message: string;
        suppressErrorMessages?: boolean;
        [key: string]: any;
      }
    | boolean;
};
