import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseFormComponent } from './base-form-component';

@Component({
  selector: 'app-customer-address-form',
  template: `
  <div class='form-row' [formGroup]='formGroup'>
    <div class='form-group col-md-6'>
      <label for="{{prefix}}street"> Street: </label>
      <app-input-feedback [control]="formGroup.get('street')">
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
      </app-input-feedback>
    </div>
    <div class='form-group col-md-2'>
      <label for="{{prefix}}number"> Number: </label>
      <app-input-feedback [control]="formGroup.get('number')">
      <input
        id="{{prefix}}number"
        type="text"
        class="form-control"
        formControlName="number"
        [ngClass]="inputFeedback('number')">
      </app-input-feedback>
    </div>
    <div class='form-group col-md-4'>
      <label for="{{prefix}}zipCode">Zip Code: </label>
      <app-input-feedback [control]="formGroup.get('zipCode')">
      <input
        id="{{prefix}}zipCode"
        type="text"
        class="form-control"
        formControlName="zipCode"
        [ngClass]="inputFeedback('zipCode')" >
      </app-input-feedback>
    </div>
    <div class='form-group col-12'>
      <label for='{{prefix}}name'>Name/Description:</label>
      <app-input-feedback [control]="formGroup.get('name')">
      <input
        id='{{prefix}}name'
        class='form-control'
        type='text'
        formControlName='name'
        [ngClass]="inputFeedback('name')" >
      </app-input-feedback>
    </div>
</div>
  `
})
export class CustomerAddressFormComponent extends BaseFormComponent {


}
