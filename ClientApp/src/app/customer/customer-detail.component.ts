import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { CustomerService, CUSTOMER_SERVICE, Customer } from '.';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, tap} from 'rxjs/operators';
import { CustomerFormService } from './customer-form.service';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-detail',
  template: `
    <div *ngIf="customer$ | async as customer; else loading">
      <h1> Customer {{ customer.name }} </h1>
      {{ customer | json }}
      <form [formGroup]="customerForm">
        <div>
          <label>
            Name:
            <input type="text" formControlName="name" required>
          </label>
          <label>
            Birthday:
            <input type="text" formControlName="birthday" required>
          </label>
          <label>
            CPF:
            <input type="text" formControlName="cpf" required>
          </label>
          <label>
            RG:
            <input type="text" formControlName="rg" required>
          </label>
        </div>
        <div formArrayName="phones">
          Phones
          <div *ngFor="let _ of phones.controls; let i=index">
            <div [formGroupName]="i">
              Phone {{i}}:
              <label>
                Number:
                <input formControlName="number" type="text" >
              </label>
              <label>
                Name/Description:
                <input formControlName="name" type="text" >
              </label>
            </div>
          </div>
        </div>
        <div formArrayName="sites">
          Network
          <div *ngFor="let _ of sites.controls; let i=index">
            <div [formGroupName]="i">
              Site {{i}}:
              <label>
                URL:
                <input formControlName="url" type="text" >
              </label>
            </div>
          </div>
        </div>
        <div formArrayName="addresses">
          Addresses
          <div *ngFor="let _ of addresses.controls; let i=index">
            <div [formGroupName]="i">
              Address {{i}}:
              <label>
                Street:
                <input formControlName="street" type="text" >
              </label>
              <label>
                Zip Code:
                <input formControlName="zipCode" type="text" >
              </label>
              <label>
                Number:
                <input formControlName="number" type="text" >
              </label>
              <label>
                Name/Description:
                <input formControlName="name" type="text" >
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
    <ng-template #loading><em>Loading...</em></ng-template>
  `
})
export class CustomerDetailComponent implements OnInit {

  @Input()
  public id: string;

  public customer$: Observable<Customer>;

  public customerForm: FormGroup;

  constructor(
    @Inject(CUSTOMER_SERVICE)
    private service: CustomerService,
    private formService: CustomerFormService,
    @Optional()
    private route?: ActivatedRoute,
  ) {
  }

  get phones(): FormArray {
    return this.customerForm.get('phones') as FormArray;
  }

  get sites(): FormArray {
    return this.customerForm.get('sites') as FormArray;
  }

  get addresses(): FormArray {
    return this.customerForm.get('addresses') as FormArray;
  }


  ngOnInit() {
    this.customer$ = this.route.params.pipe(
      map( params => params['id'] || this.id),
      mergeMap( id => this.service.get(id)),
      tap( customer => this.customerForm = this.formService.customerForm(customer)),
    );
  }


}
