import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-address-form',
  template: `
  <div class='form-row' [formGroup]='formGroup'>
    <div class='form-group col-md-6'>
      <label for="{{prefix}}street"> Street: </label>
      <div class="input-group">
          <div class="input-group-prepend">
            <ng-content></ng-content>
          </div>
          <input id="{{prefix}}street" class='form-control' formControlName='street' type='text' >
      </div>
    </div>
    <div class='form-group col-md-2'>
      <label for="{{prefix}}number"> Number: </label>
      <input id="{{prefix}}number" class='form-control' formControlName='number' type='text' >
    </div>
    <div class='form-group col-md-4'>
      <label for="{{prefix}}zipCode">Zip Code: </label>
      <input id="{{prefix}}zipCode" class='form-control' formControlName='zipCode' type='text' >
    </div>
    <div class='form-group col-12'>
      <label for='{{prefix}}name'>Name/Description:</label>
      <input id='{{prefix}}name' class='form-control' formControlName='name' type='text' >
    </div>
</div>
  `
})
export class CustomerAddressFormComponent {

  @Input()
  public prefix = '';

  @Input()
  public formGroup: FormGroup;
}
