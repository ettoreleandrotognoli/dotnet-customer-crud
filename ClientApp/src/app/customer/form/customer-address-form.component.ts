import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseFormComponent } from './base-form-component';

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
          <input
            id="{{prefix}}street"
            type="text"
            class="form-control"
            formControlName="street"
            [ngClass]="inputFeedback('street')">
      </div>
    </div>
    <div class='form-group col-md-2'>
      <label for="{{prefix}}number"> Number: </label>
      <input
        id="{{prefix}}number"
        type="text"
        class="form-control"
        formControlName="number"
        [ngClass]="inputFeedback('number')">
    </div>
    <div class='form-group col-md-4'>
      <label for="{{prefix}}zipCode">Zip Code: </label>
      <input
        id="{{prefix}}zipCode"
        type="text"
        class="form-control"
        formControlName="zipCode"
        [ngClass]="inputFeedback('zipCode')" >
    </div>
    <div class='form-group col-12'>
      <label for='{{prefix}}name'>Name/Description:</label>
      <input
        id='{{prefix}}name'
        class='form-control'
        type='text'
        formControlName='name'
        [ngClass]="inputFeedback('name')" >
    </div>
</div>
  `
})
export class CustomerAddressFormComponent extends BaseFormComponent {


}
