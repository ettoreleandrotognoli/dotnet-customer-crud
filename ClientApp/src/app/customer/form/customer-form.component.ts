import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { CustomerFormService } from './customer-form.service';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';


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
      <div class="col-12" formArrayName="phones">
        <h2>
          Phones
          <button (click)="addPhone()" type="button" class="btn btn-sm btn-primary">
              <fa-icon [icon]="addIcon"></fa-icon>
              <span class="sr-only">Add</span>
          </button>
        </h2>
        <ng-container *ngFor="let phoneFormGroup of phones.controls; let i=index">
            <app-customer-phone-form
              class="col-12"
              [options]="{ number : { formGroup : 'col-md-5' }, name: { formGroup : 'col-md-7'}}"
              prefix="phones-{{i}}-"
              [formGroupName]="i"
              [formGroup]="phoneFormGroup">
                    <button (click)="removePhone(i)" type="button" class="btn btn-sm btn-danger">
                      <fa-icon [icon]="removeIcon"></fa-icon>
                      <span class="sr-only"></span>
                    </button>
            </app-customer-phone-form>
        </ng-container>
      </div>
      <div class="col-12" formArrayName="sites">
        <h2>
          Network
          <button (click)="addSite()" type="button" class="btn btn-sm btn-primary">
              <fa-icon [icon]="addIcon"></fa-icon>
              <span class="sr-only">Add</span>
          </button>
        </h2>
        <ng-container *ngFor="let siteFormGroup of sites.controls; let i=index">
          <app-customer-site-form
            class="col-12"
            prefix="sites-{{i}}-"
            [formGroupName]="i"
            [formGroup]="siteFormGroup">
            <button (click)="removeSite(i)" type="button" class="btn btn-sm btn-danger">
              <fa-icon [icon]="removeIcon"></fa-icon>
              <span class="sr-only"></span>
            </button>
          </app-customer-site-form>
        </ng-container>
      </div>
      <div class="col-12" formArrayName="addresses">
        <h2>
          Addresses
          <button (click)="addAddress()" type="button" class="btn btn-sm btn-primary">
              <fa-icon [icon]="addIcon"></fa-icon>
              <span class="sr-only">Add</span>
          </button>
        </h2>
        <ng-container *ngFor="let addressFormGroup of addresses.controls; let i=index">
          <app-customer-address-form
            class="col-12"
            prefix="addresses-{{i}}-"
            [formGroupName]="i"
            [formGroup]="addressFormGroup" >
            <button (click)="removeAddress(i)" type="button" class="btn btn-sm btn-danger">
              <fa-icon [icon]="removeIcon"></fa-icon>
              <span class="sr-only"></span>
            </button>
          </app-customer-address-form>
        </ng-container>
      </div>
    </div>`
})
export class CustomerFormComponent {

  @Input()
  public prefix = '';

  @Input()
  public formGroup: FormGroup;

  public removeIcon = faTimes;
  public addIcon = faPlus;

  constructor(
    private formService: CustomerFormService
  ) {

  }

  get phones(): FormArray {
    return this.formGroup.get('phones') as FormArray;
  }

  public addPhone() {
    this.phones.controls.splice(0, 0, this.formService.phoneForm());
  }

  public removePhone(index: number) {
    this.phones.controls.splice(index, 1);
  }

  public addAddress() {
    this.addresses.controls.splice(0, 0, this.formService.addressForm());
  }

  public removeAddress(index: number) {
    this.addresses.controls.splice(index, 1);
  }

  public addSite() {
    this.sites.controls.splice(0, 0, this.formService.siteForm());
  }

  public removeSite(index: number) {
    this.sites.controls.splice(index, 1);
  }



  get sites(): FormArray {
    return this.formGroup.get('sites') as FormArray;
  }

  get addresses(): FormArray {
    return this.formGroup.get('addresses') as FormArray;
  }

}
