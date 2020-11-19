import { Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
