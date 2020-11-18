import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-site-form',
  template: `
    <div class="form-row" [formGroup]='formGroup'>
      <div class="form-group col-md-6">
        <label for="{{prefix}}url">URL:</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <ng-content></ng-content>
          </div>
          <input id="{{prefix}}url" class="form-control" formControlName='url' type='text' >
        </div>
      </div>
    </div>
  `
})
export class CustomerSiteFormComponent {

  @Input()
  public prefix = '';

  @Input()
  public formGroup: FormGroup;

}
