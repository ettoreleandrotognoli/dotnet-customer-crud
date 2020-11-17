import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { CustomerService, CUSTOMER_SERVICE, Customer } from '.';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, tap } from 'rxjs/operators';
import { CustomerFormService } from './form/customer-form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-detail',
  template: `
    <div *ngIf="customer$ | async as customer; else loading">
      <h1> Customer {{ customer.name }} </h1>
      {{ customer | json }}
      <form [formGroup]="customerForm">
        <app-customer-form [formGroup]="customerForm"></app-customer-form>
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

  ngOnInit() {
    this.customer$ = this.route.params.pipe(
      map(params => params['id'] || this.id),
      mergeMap(id => this.service.get(id)),
      tap(customer => this.customerForm = this.formService.customerForm(customer)),
    );
  }


}
