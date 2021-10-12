import {
  AfterContentInit,
  Component,
  ContentChild,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  getErrorMessage,
  shouldEmitError,
} from '../../validators/validation-utils';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css'],
})
export class FormInputComponent implements OnInit, AfterContentInit, OnDestroy {
  errorMessage: string | null = null;
  @Input() labelText: string | null = null;
  @Input() labelFor: string | null = null;

  @ContentChild(NgControl) control: NgControl | undefined | null;
  subs: Subscription[] = [];

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  ngAfterContentInit(): void {
    if (!this.control?.control) {
      return;
    }

    this.processErrors();

    this.subs.push(
      this.control?.control.statusChanges.subscribe(() => {
        this.processErrors();
      })
    );
  }

  processErrors() {
    this.errorMessage = getErrorMessage(this.control);
  }

  emitError(control: NgControl | undefined | null): boolean {
    return shouldEmitError(control);
  }

  ngOnInit(): void {}
}
