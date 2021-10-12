import { AppValidatorFn } from '../types/form-types';
import { notifyChildren, useParentControl } from './hooks';

export const createGroupValidator = (
  parentValidator: AppValidatorFn,
  childrenControlNames: string[]
) => {
  return {
    parentValidator: composeValidator(
      parentValidator,
      notifyChildren(childrenControlNames)
    ),
    childValidator: composeValidator(parentValidator, useParentControl),
  };
};

export type AppValidatorFnDecorator = (fn: AppValidatorFn) => AppValidatorFn;

export const composeValidator = (
  validator: AppValidatorFn,
  ...options: AppValidatorFnDecorator[]
) => {
  return options.reduceRight((acc, next) => next(acc), validator);
};
