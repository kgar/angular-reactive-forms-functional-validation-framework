import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppValidators } from 'src/app/shared/validators';
import { withCustomMessage } from 'src/app/shared/validators/hooks';
import { composeValidator } from 'src/app/shared/validators/tools';

@Component({
  selector: 'app-sample-form',
  templateUrl: './sample-form.component.html',
  styleUrls: ['./sample-form.component.css'],
})
export class SampleFormComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        firstName: [null, [AppValidators.required]],
        lastName: [
          null,
          [
            composeValidator(
              AppValidators.required,
              withCustomMessage('Last Name is required')
            ),
          ],
        ],
        password: [null, [AppValidators.required]],
        confirmPassword: [
          null,
          [
            composeValidator(
              AppValidators.required,
              withCustomMessage('Please confirm your password')
            ),
          ],
        ],
      },
      {
        validators: [
          AppValidators.fieldsMustMatch(['password', 'confirmPassword']),
        ],
      }
    );
  }

  ngOnInit(): void {}

  trySubmit() {
    if (!this.validate()) {
      return;
    }

    alert('success!');
  }

  validate() {
    this.form.markAllAsTouched();

    for (let key in this.form.controls) {
      this.form.controls[key].updateValueAndValidity({ onlySelf: true });
    }

    this.form.updateValueAndValidity();

    return this.form.valid;
  }
}
