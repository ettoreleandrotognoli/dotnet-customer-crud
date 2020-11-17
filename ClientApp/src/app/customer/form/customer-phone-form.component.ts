import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-customer-phone-form',
  template: `
  <div class="form-row" [formGroup]="formGroup">
      <div class="form-group col-md-4">
        <label for="{{prefix}}number">Number: </label>
        <input id="{{prefix}}number" class="form-control" formControlName="number" type="text" >
      </div>
      <div class="form-group col-md-8">
        <label for="{{prefix}}name">Name/Description:</label>
        <input id="{{prefix}}name" class="form-control" formControlName="name" type="text" >
      </div>
  </div>
  `
})
export class CustomerPhoneFormComponent {

  @Input()
  public prefix = '';

  @Input()
  public formGroup: FormGroup;

}
