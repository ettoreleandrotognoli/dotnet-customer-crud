import { Component } from '@angular/core';
import { BaseFormComponent } from './base-form-component';

@Component({
  selector: 'app-customer-site-form',
  template: `
    <div class="form-row" [formGroup]='formGroup'>
      <div class="form-group col-md-6">
        <label for="{{prefix}}url">URL:</label>
        <app-input-feedback [control]="formGroup.get('url')">
        <div class="input-group">
          <div class="input-group-prepend">
            <ng-content></ng-content>
          </div>
          <input
            id="{{prefix}}url"
            type="text"
            class="form-control"
            formControlName="url"
            [ngClass]="inputFeedback('url')">
        </div>
        </app-input-feedback>
      </div>
    </div>
  `
})
export class CustomerSiteFormComponent extends BaseFormComponent {


}
