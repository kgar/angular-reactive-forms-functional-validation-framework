import {
  ContentChild,
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControlName, NgControl } from '@angular/forms';

@Directive({
  selector: '[validateOnBlur]',
})
export class ValidateOnBlurDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('blur', [])
  validateOnBlur() {
    this.ngControl?.control?.updateValueAndValidity();
  }
}
