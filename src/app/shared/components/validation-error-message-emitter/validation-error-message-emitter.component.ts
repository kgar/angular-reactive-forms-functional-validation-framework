import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  getErrorMessage,
  shouldEmitError,
} from '../../validators/validation-utils';

@Component({
  selector: 'app-validation-error-message-emitter',
  templateUrl: './validation-error-message-emitter.component.html',
  styleUrls: ['./validation-error-message-emitter.component.css'],
})
export class ValidationErrorMessageEmitterComponent
  implements OnInit, OnDestroy
{
  errorMessage?: string;
  subs: Subscription[] = [];
  @Input() control?: AbstractControl;

  ngOnInit(): void {
    if (!this.control) {
      throw Error(
        'A form group, control, or array is required in order to use this component.'
      );
    }

    this.subs.push(
      this.control.statusChanges.subscribe(() => {
        this.errorMessage = getErrorMessage(this.control);
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s?.unsubscribe());
  }

  emitError() {
    return shouldEmitError(this.control);
  }
}
