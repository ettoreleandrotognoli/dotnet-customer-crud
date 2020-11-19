import { AfterViewInit, ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { CustomerService, CUSTOMER_SERVICE, Customer } from '.';
import { defer, EMPTY, Observable, of, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap, tap, delay } from 'rxjs/operators';
import { CustomerFormService } from './form/customer-form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer-detail',
  template: `
    <ng-container *ngIf="customerForm !== null; else loading">
      <h2 *ngIf="customer">Customer: {{ customer.name || 'New'}}</h2>
      {{ customerForm.status }}
      {{ customerForm.errors | json }}
      <form [formGroup]="customerForm" (ngSubmit)="save()">
        <app-customer-form [formGroup]="customerForm"></app-customer-form>
        <div class="float-right">
          <button type="button" *ngIf="id" (click)="remove()" class="btn btn-danger">Remove</button>
          <button type="submit" [disabled]="customerForm.invalid" class="btn btn-success">Save</button>
        </div>
      </form>
    </ng-container>
    <ng-template #loading>
    <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    </ng-template>
  `
})
export class CustomerDetailComponent implements OnInit, OnDestroy {

  @Input()
  public id: string = null;


  public customer: Partial<Customer>;
  public customerForm: FormGroup = this.formService.customerForm();

  private subscription: Subscription;

  @Input()
  public successRoute: any[] = ['/customer/'];

  constructor(
    @Inject(CUSTOMER_SERVICE)
    private service: CustomerService,
    private formService: CustomerFormService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Optional()
    private route?: ActivatedRoute,
  ) {

  }

  public getCustomer(): Partial<Customer> {
    return this.customerForm.value;
  }

  public setCustomer(customer: Partial<Customer>) {
    this.customer = customer;
    this.customerForm = this.formService.customerForm(customer);
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
    this.service.save(customer).pipe(
      this.loading(),
    ).subscribe();
  }

  public remove() {
    this.service.remove({ id: this.id }).pipe(
      this.loading(),
    ).subscribe();
  }

  public ngOnInit() {
    this.subscription = this.route.params.pipe(
      map(params => params['id'] || this.id),
      tap(id => this.id = id),
      mergeMap(id => (id ? this.service.get(id) : this.route.params)),
      tap(customer => this.setCustomer(customer)),
    ).subscribe();
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
