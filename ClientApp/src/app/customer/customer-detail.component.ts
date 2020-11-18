import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { CustomerService, CUSTOMER_SERVICE, Customer } from '.';
import { defer, Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { CustomerFormService } from './form/customer-form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-detail',
  template: `
    <div *ngIf="customer$ | async as customer; else loading">
      <h1> Customer {{ customer.name }} </h1>
      <form [formGroup]="customerForm" (ngSubmit)="save()">
        <app-customer-form [formGroup]="customerForm"></app-customer-form>
        <div class="float-right">
          <button type="button" *ngIf="id" (click)="remove()" class="btn btn-danger">Remove</button>
          <button type="submit" class="btn btn-success">Save</button>
        </div>
      </form>
    </div>
    <ng-template #loading>
    <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    </ng-template>
  `
})
export class CustomerDetailComponent implements OnInit {

  @Input()
  public id: string = null;

  public customer$: Observable<Partial<Customer>>;

  public customerForm: FormGroup;

  @Input()
  public successRoute: any[] = ['/customer/'];

  constructor(
    @Inject(CUSTOMER_SERVICE)
    private service: CustomerService,
    private formService: CustomerFormService,
    private router: Router,
    @Optional()
    private route?: ActivatedRoute,
  ) {

  }

  public getCustomer(): Partial<Customer> {
    return this.customerForm.value;
  }

  public loading<T>(): (source: Observable<T>) => Observable<Partial<Customer>> {
    return (source: Observable<T>): Observable<Partial<Customer>> => {
      return source.pipe(
        tap(() => { }, console.error, () => this.router.navigate(this.successRoute)),
        map(() => this.getCustomer()),
      );
    };
  }

  public save() {
    const customer = this.getCustomer();
    this.customer$ = this.service.save(customer).pipe(
      this.loading(),
    );
  }

  public remove() {
    this.customer$ = this.service.remove({ id: this.id }).pipe(
      this.loading(),
    );
  }

  public ngOnInit() {
    this.customer$ = this.route.params.pipe(
      map(params => params['id'] || this.id),
      tap(id => this.id = id),
      mergeMap(id => (id ? this.service.get(id) : this.route.params)),
      tap(customer => this.customerForm = this.formService.customerForm(customer)),
    );
  }


}
