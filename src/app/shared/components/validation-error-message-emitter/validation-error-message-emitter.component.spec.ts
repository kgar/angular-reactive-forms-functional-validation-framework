import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationErrorMessageEmitterComponent } from './validation-error-message-emitter.component';

describe('ValidationErrorMessageEmitterComponent', () => {
  let component: ValidationErrorMessageEmitterComponent;
  let fixture: ComponentFixture<ValidationErrorMessageEmitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationErrorMessageEmitterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationErrorMessageEmitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
