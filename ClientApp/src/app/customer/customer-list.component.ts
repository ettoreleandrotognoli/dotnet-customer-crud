import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CustomerService, CUSTOMER_SERVICE, Customer } from '.';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { interval, Observable, ReplaySubject, Subject, Subscription } from 'rxjs';
import { debounce, tap, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  template: `
    <div class="row">
      <div class="col-md-6">
        <h1 id="tableLabel"> Customer List </h1>
      </div>
      <div class="col-md-6">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <fa-icon [icon]="searchIcon"></fa-icon>
              <span class="sr-only">search</span>
            </span>
          </div>
          <input [value]="searchString" (keyup)="searchBy($event.target.value)" type="text">
          <div class="input-group-append">
            <a class="btn btn-primary" [routerLink]="['/customer/new', { name : searchString }]">
              <fa-icon [icon]="addIcon"></fa-icon>
              <span class="sr-only">New</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div *ngIf="customers$ | async as customers; else loading">
      <table class='table table-striped' aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Name </th>
            <th>RG</th>
            <th>CPF</th>
            <th>Birthday </th>
            <th>Phones </th>
            <th>Addresses </th>
            <th>Sites </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let customer of customers">
              <td> {{ customer.name }}</td>
              <td> {{ customer.rg }}</td>
              <td> {{ customer.cpf }}</td>
              <td> {{ customer.birthday }}</td>
              <td> {{ customer.phones }}</td>
              <td> {{ customer.addresses }}</td>
              <td> {{ customer.sites }}</td>
              <td>
                <a class="nav-link text-dark" [routerLink]="['/customer/edit', customer.id ]">
                  Customer
                </a>
              </td>
          </tr>
        </tbody>
      </table>
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
export class CustomerListComponent implements OnInit, OnDestroy {

  public customers$: Observable<Customer[]>;
  public addIcon = faPlus;
  public searchIcon = faSearch;


  protected searchSubject: Subject<string> = new ReplaySubject(1);

  private subscription: Subscription;
  public searchParamName = 'q';
  public searchString = '';

  constructor(
    @Inject(CUSTOMER_SERVICE)
    private service: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.searchSubject.asObservable().subscribe(it => this.searchString = it);
    this.searchSubject.asObservable().pipe(
      debounce(() => interval(250)),
    ).subscribe(
      it => this.router.navigate([], { queryParams: { [this.searchParamName]: it } })
    );
  }

  public searchBy(searchString: string) {
    this.searchSubject.next(searchString);
  }

  ngOnInit() {
    this.subscription = this.route.queryParams.pipe(
      map(queryParams => queryParams[this.searchParamName] || ''),
      tap(searchString => this.searchString = searchString),
      tap(searchString => this.customers$ = this.service.listAll()),
    ).subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
