import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SampleFormComponent } from './views/sample-form/sample-form.component';
import { FormInputComponent } from './shared/components/form-input/form-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorMessageComponent } from './shared/components/validation-error-message/validation-error-message.component';
import { ValidationErrorMessageEmitterComponent } from './shared/components/validation-error-message-emitter/validation-error-message-emitter.component';
import { ValidateOnBlurDirective } from './shared/directives/validate-on-blur.directive';

@NgModule({
  declarations: [AppComponent, SampleFormComponent, FormInputComponent, ValidationErrorMessageComponent, ValidationErrorMessageEmitterComponent, ValidateOnBlurDirective],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
