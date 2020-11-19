import { AfterViewInit, ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { CustomerService, CUSTOMER_SERVICE, Customer } from '.';
import { defer, EMPTY, Observable, of, Subscription, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap, tap, delay, timeout, catchError } from 'rxjs/operators';
import { CustomerFormService } from './form/customer-form.service';
import { FormGroup } from '@angular/forms';
import { applyErrors, ValidationError } from './form/base-form-component';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-customer-detail',
  template: `
    <ng-container *ngIf="customerForm !== null; else loading">
      <h2 *ngIf="customer">Customer: {{ customer.name || 'New'}}</h2>
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
    private toastr: ToastrService,
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

  public loading<T>(operation: string): (source: Observable<T>) => Observable<void> {
    return (source: Observable<T>): Observable<void> => {
      return source.pipe(
        catchError(error => this.catchOperationError(error, operation)),
        tap(
          () => { },
          () => { },
          () => this.toastr.success(`${operation} was succeed 😊`, 'Success')
        ),
        tap(
          () => { },
          () => { },
          () => this.router.navigate(this.successRoute)
        ),
        map(_ => null)
      );
    };
  }

  public catchOperationError(error: any, operation: string) {
    if (!(error instanceof ValidationError)) {
      this.toastr.error('Sorry about that 😕', `Error during: ${operation} `);
      return throwError(error);
    }
    this.toastr.error(error.title, `Error during: ${operation} `);
    applyErrors(this.customerForm, error.errors);
    return throwError(error);
  }

  public catchLoadError(error: any): Observable<never> {
    if (error instanceof HttpErrorResponse && error.status === 404) {
      this.toastr.error('How did you get there? 🤔', 'Customer not found');
    } else {
      this.toastr.error('Sorry about that 😕', `Error during: Load Customer `);
    }
    this.router.navigate(this.successRoute);
    return throwError(error);
  }


  public save() {
    const customer = this.getCustomer();
    this.service.save(customer).pipe(
      this.loading('Save User'),
    ).subscribe();
  }

  public remove() {
    this.service.remove({ id: this.id }).pipe(
      this.loading('Remove User'),
    ).subscribe();
  }

  public ngOnInit() {
    this.subscription = this.route.params.pipe(
      map(params => params['id'] || this.id),
      tap(id => this.id = id),
      mergeMap(id => (id ? this.service.get(id) : this.route.params)),
      catchError(error => this.catchLoadError(error)),
      tap(customer => this.setCustomer(customer)),
    ).subscribe();
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
