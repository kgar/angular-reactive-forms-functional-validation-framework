import { AbstractControl, Validators } from '@angular/forms';
import { AppValidatorFn } from '../types/form-types';

const requiredValidator: AppValidatorFn = (control: AbstractControl) => {
  const result = Validators.required(control);

  if (!result) {
    return null;
  }

  return {
    required: {
      message: 'This field is required',
    },
  };
};

const fieldsMustMatchGroupValidator =
  (fieldNames: string[]) => (parentControl: AbstractControl) => {
    const eligibleToEmitErrors = (control: AbstractControl | null) => {
      return control !== null && control.touched;
    };

    if (fieldNames.length < 2) {
      return null;
    }

    const firstControl = parentControl.get(fieldNames[0]);

    if (!eligibleToEmitErrors(firstControl)) {
      return null;
    }

    const firstField = firstControl?.value;

    for (let i = 1; i < fieldNames.length; i++) {
      const fieldName = fieldNames[i];
      const nextControl = parentControl.get(fieldName);

      if (!eligibleToEmitErrors(nextControl)) {
        return null;
      }

      const nextField = nextControl?.value;

      if (nextField === null) {
        continue;
      }

      if (firstField !== nextField) {
        return {
          fieldsMustMatch: {
            message: `These fields must match: ${fieldNames.join(', ')}`,
          },
        };
      }
    }

    return null;
  };

export const AppValidators = {
  required: requiredValidator,
  fieldsMustMatch: fieldsMustMatchGroupValidator,
};
