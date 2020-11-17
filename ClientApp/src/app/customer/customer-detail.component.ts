import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { CustomerService, CUSTOMER_SERVICE, Customer } from '.';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { CustomerFormService } from './form/customer-form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-detail',
  template: `
    <div *ngIf="customer$ | async as customer; else loading">
      <h1> Customer ({{customer.id}}) {{ customer.name }} </h1>
      <form [formGroup]="customerForm" (ngSubmit)="save()">
        <app-customer-form [formGroup]="customerForm"></app-customer-form>
        <button type="button" *ngIf="id" (click)="remove()" class="btn btn-danger">Remove</button>
        <button type="submit" class="btn btn-success">Save</button>
      </form>
    </div>
    <ng-template #loading><em>Loading...</em></ng-template>
  `
})
export class CustomerDetailComponent implements OnInit {

  @Input()
  public id: string = null;

  public customer$: Observable<Partial<Customer>>;

  public customerForm: FormGroup;

  constructor(
    @Inject(CUSTOMER_SERVICE)
    private service: CustomerService,
    private formService: CustomerFormService,
    @Optional()
    private route?: ActivatedRoute,
  ) {

  }

  public getCustomer(): Partial<Customer> {
    return this.customerForm.value;
  }

  public save() {
    const customer = this.getCustomer();
    this.service.save(customer).subscribe();
  }

  public remove() {
    this.service.remove({ id: this.id }).subscribe();
  }

  public ngOnInit() {
    this.customer$ = this.route.params.pipe(
      map(params => params['id'] || this.id),
      tap(id => this.id = id),
      mergeMap(id => (id ? this.service.get(id) : of({}))),
      tap(customer => this.customerForm = this.formService.customerForm(customer)),
    );
  }


}
