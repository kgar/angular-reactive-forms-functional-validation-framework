import { AbstractControl, Validators } from '@angular/forms';
import { AppValidatorFn } from '../types/form-types';
import { addErrors, removeErrors } from './tools';

const required: AppValidatorFn = (control: AbstractControl) => {
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

const fieldsMustMatch = (fieldNames: string[]) => (group: AbstractControl) => {
  const eligibleToEmitErrors = (control: AbstractControl | null) => {
    return control !== null && control.touched;
  };

  if (fieldNames.length < 2) {
    return null;
  }

  const firstControl = group.get(fieldNames[0]);

  if (!eligibleToEmitErrors(firstControl)) {
    return null;
  }

  const firstField = firstControl?.value;

  for (let i = 1; i < fieldNames.length; i++) {
    const fieldName = fieldNames[i];
    const nextControl = group.get(fieldName);

    if (!eligibleToEmitErrors(nextControl)) {
      return null;
    }

    const nextField = nextControl?.value;

    if (nextField === null) {
      continue;
    }

    // TODO: Make tools for streamlining this common manual error management for cross-field validation.
    if (firstField !== nextField) {
      fieldNames.forEach((name) => {
        const field = group.get(name);
        addErrors(field, {
          fieldsMustMatch: true,
        });
      });

      return {
        fieldsMustMatch: {
          message: `These fields must match: ${fieldNames.join(', ')}`,
        },
      };
    }
  }

  fieldNames.forEach((name) => {
    const field = group.get(name);
    removeErrors(field, 'fieldsMustMatch');
    field?.updateValueAndValidity({ onlySelf: true });
  });

  return null;
};

export const AppValidators = {
  required,
  fieldsMustMatch,
};
