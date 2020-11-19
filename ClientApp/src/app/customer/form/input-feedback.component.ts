import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-input-feedback',
  template: `
      <ng-content></ng-content>
      <div class="invalid-feedback" [ngClass]="{'d-block':isInvalid()}">
        <app-error-feedback [control]="control"></app-error-feedback>
      </div>
      <div *ngIf="valid" class="valid-feedback" [ngClass]="{'d-block':isValid()}">
        {{valid}}
      </div>
  `
})
export class InputFeedbackComponent {
  @Input()
  public valid: string = null;

  @Input()
  public control: AbstractControl;


  /**
   * @todo remove Workaround
   * @see https://github.com/twbs/bootstrap/issues/23454
   */
  public isInvalid(): boolean {
    return this.control.errors && (this.control.dirty || this.control.touched);
  }

  public isValid(): boolean {
    return (!this.control.errors) && (this.control.dirty || this.control.touched);
  }

}
