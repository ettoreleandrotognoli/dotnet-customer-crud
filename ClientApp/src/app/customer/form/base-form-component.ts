import { HttpErrorResponse } from '@angular/common/http';
import { Input } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export interface FormErrors {
  [propertyName: string]: FormErrors | FormErrors[] | ValidationErrors;
}

export class ValidationError {
  constructor(
    public errors: FormErrors,
    public httpError: HttpErrorResponse
  ) {

  }
}

export function applyErrors(control: AbstractControl, errors: FormErrors) {
  if (!errors) {
    return;
  }
  if (control instanceof FormGroup || control instanceof FormArray) {
    for (const propertyName of Object.keys(control.controls)) {
      const subControl: AbstractControl = control.get(propertyName);
      const subControlErrors = errors[propertyName] as ValidationErrors;
      applyErrors(subControl, subControlErrors);
    }
    return;
  }
  const oldError: ValidationErrors = control.errors || {};
  const newErrors: ValidationErrors = errors;
  control.setErrors({ ...oldError, ...newErrors });
  control.markAsDirty();
}


export class BaseFormComponent {

  @Input()
  public prefix = '';

  @Input()
  public formGroup: FormGroup;


  public hasSuccess(fieldName): boolean {
    const control = this.formGroup.get(fieldName);
    return (!control.errors) && (control.dirty || control.touched);
  }

  public hasError(fieldName): boolean {
    const control = this.formGroup.get(fieldName);
    return control.errors && (control.dirty || control.touched);
  }

  public inputFeedback(fieldName) {
    return {
      'is-invalid': this.hasError(fieldName),
      'is-valid': this.hasSuccess(fieldName),
    };
  }


}
