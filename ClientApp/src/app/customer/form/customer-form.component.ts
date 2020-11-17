import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { CustomerFormService } from './customer-form.service';


@Component({
  selector: 'app-customer-form',
  template: `
    <div [formGroup]="formGroup" class="form-row">
      <div class="form-group col-md-8">
        <label for="{{prefix}}name"> Name:</label>
        <input id="{{prefix}}name" class="form-control" type="text" formControlName="name" required>
      </div>
      <div class="form-group col-md-4">
        <label for="{{prefix}}birthday">Birthday:</label>
        <input id="{{prefix}}birthday" class="form-control" type="text" formControlName="birthday" required>
      </div>
      <div class="form-group col-md-6">
        <label for="{{prefix}}cpf">CPF:</label>
        <input id="{{prefix}}cpf" class="form-control" type="text" formControlName="cpf" required>
      </div>
      <div class="form-group col-md-6">
        <label for="{{prefix}}rg">RG:</label>
        <input id="{{prefix}}rg" class="form-control" type="text" formControlName="rg" required>
      </div>
      <div class="form-row col-12" formArrayName="phones">
        Phones
        <div class="form-group col-12" *ngFor="let phoneFormGroup of phones.controls; let i=index">
          <app-customer-phone-form prefix="phones-{{i}}-" [formGroupName]="i" [formGroup]="phoneFormGroup"></app-customer-phone-form>
        </div>
      </div>
      <div class="form-row col-12" formArrayName="sites">
        Network
        <div class="form-group col-12" *ngFor="let siteFormGroup of sites.controls; let i=index">
          <app-customer-site-form prefix="sites-{{i}}-" [formGroupName]="i" [formGroup]="siteFormGroup"></app-customer-site-form>
        </div>
      </div>
      <div class="form-row col-12" formArrayName="addresses">
        Addresses
        <div class="form-group col-12" *ngFor="let addressFormGroup of addresses.controls; let i=index">
          <app-customer-address-form prefix="addresses-{{i}}-" [formGroupName]="i" [formGroup]="addressFormGroup" ></app-customer-address-form>
        </div>
      </div>
    </div>`
})
export class CustomerFormComponent {

  @Input()
  public prefix = '';

  @Input()
  public formGroup: FormGroup;

  constructor(
    private formService: CustomerFormService
  ) {

  }

  get phones(): FormArray {
    return this.formGroup.get('phones') as FormArray;
  }

  get sites(): FormArray {
    return this.formGroup.get('sites') as FormArray;
  }

  get addresses(): FormArray {
    return this.formGroup.get('addresses') as FormArray;
  }

}
