import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-site-form',
  template: `
    <div class="form-row" [formGroup]='formGroup'>
      <div class="form-group col-md-6">
        <label for="{{prefix}}url">URL:</label>
        <input id="{{prefix}}url" class="form-control" formControlName='url' type='text' >
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
