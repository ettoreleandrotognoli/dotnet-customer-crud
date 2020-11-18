import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
            <input id="{{prefix}}number" class="form-control" formControlName="number" type="text" >
        </div>
      </div>
      <div class="form-group" [ngClass]="options.name.formGroup">
        <label for="{{prefix}}name">Name/Description:</label>
        <input id="{{prefix}}name" class="form-control" formControlName="name" type="text" >
      </div>
  </div>
  `
})
export class CustomerPhoneFormComponent {

  @Input()
  public options: CustomerPhoneFormOptions = DEFAULT_OPTIONS;

  @Input()
  public prefix = '';

  @Input()
  public formGroup: FormGroup;

}
