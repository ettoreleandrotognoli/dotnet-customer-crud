import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseFormComponent } from './base-form-component';

export interface CustomerPhoneFormOptions {
  number: { formGroup: any };
  name: { formGroup: any };
}

export const DEFAULT_OPTIONS: CustomerPhoneFormOptions = {
  number: { formGroup: 'col-md-4' },
  name: { formGroup: 'col-md-8' },
};

@Component({
  selector: 'app-customer-phone-form',
  template: `
  <div class="form-row" [formGroup]="formGroup">
      <div class="form-group" [ngClass]="options.number.formGroup">
        <label for="{{prefix}}number">Number: </label>
        <div class="input-group">
            <div class="input-group-prepend">
              <ng-content></ng-content>
            </div>
            <input
              id="{{prefix}}number"
              type="text"
              class="form-control"
              formControlName="number"
              [ngClass]="inputFeedback('number')" >
        </div>
      </div>
      <div class="form-group" [ngClass]="options.name.formGroup">
        <label for="{{prefix}}name">Name/Description:</label>
        <input
          id="{{prefix}}name"
          type="text"
          class="form-control"
          formControlName="name"
          [ngClass]="inputFeedback('name')" >
      </div>
  </div>
  `
})
export class CustomerPhoneFormComponent extends BaseFormComponent {

  @Input()
  public options: CustomerPhoneFormOptions = DEFAULT_OPTIONS;

}
