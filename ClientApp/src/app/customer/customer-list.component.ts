import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CustomerService, CUSTOMER_SERVICE, Customer, Address, Page, Pagination, Search } from '.';
import { faPlus, faSearch, faPen, faPhone } from '@fortawesome/free-solid-svg-icons';
import { interval, Observable, ReplaySubject, Subject, Subscription, throwError } from 'rxjs';
import { debounce, tap, map, catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { PageItem, PaginationModel } from './pagination';
import { ToastrService } from 'ngx-toastr';

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
    <div *ngIf="customerPage$ | async as customerPage; else loading">
      <app-pagination [model]="paginationModel" [queryParamsFactory]="paginateParams()" [totalItems]="customerPage.total"></app-pagination>
      <div class="table-responsive-md">
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
          <tr *ngFor="let customer of customerPage.items">
              <td> {{ customer.name }}</td>
              <td> {{ customer.rg }}</td>
              <td> {{ customer.cpf }}</td>
              <td> {{ customer.birthday | date }}</td>
              <td>
                <ng-container *ngFor="let phone of (customer.phones || [])" >
                  <p>
                    <a class="text-dark" href="tel:{{phone.number}}" title="{{phone.name}}">
                      <small>
                      {{phone.number}}
                      <fa-icon [icon]="phoneIcon"></fa-icon>
                      </small>
                    </a>
                  </p>
                </ng-container>
              </td>
              <td>
                <ng-container *ngFor="let address of (customer.addresses || [])" >
                  <p>
                    <a class="text-dark" [href]="addressLink(address)" target="_blank">
                      <small title="{{address.name}} - {{address.zipCode}}">
                        {{address.street}}, {{address.number}}
                      </small>
                    </a>
                  </p>
                </ng-container>
              </td>
              <td>
                <ng-container *ngFor="let site of (customer.sites || [])" >
                  <app-url [url]="site.url"></app-url>
                </ng-container>
              </td>
              <td>
                <a class="nav-link text-dark" [routerLink]="['/customer/edit', customer.id ]">
                  <fa-icon [icon]="editIcon"></fa-icon>
                  <span class="sr-only">Edit</span>
                </a>
              </td>
          </tr>
        </tbody>
      </table>
      </div>
      <app-pagination [model]="paginationModel" [queryParamsFactory]="paginateParams()"  [totalItems]="customerPage.total"></app-pagination>
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

  public customerPage$: Observable<Page<Customer>>;
  public addIcon = faPlus;
  public editIcon = faPen;
  public searchIcon = faSearch;
  public phoneIcon = faPhone;

  public paginationModel: PaginationModel = new PaginationModel(10);

  protected searchSubject: Subject<string> = new ReplaySubject(1);

  private subscription: Subscription;
  public pageParamName = 'page';
  public searchParamName = 'q';
  public searchString = '';

  constructor(
    @Inject(CUSTOMER_SERVICE)
    private service: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.searchSubject.asObservable().subscribe(it => this.searchString = it);
    this.searchSubject.asObservable().pipe(
      debounce(() => interval(250)),
    ).subscribe(
      it => this.patchQueryParams({ [this.searchParamName]: it })
    );
  }

  public searchBy(searchString: string) {
    this.searchSubject.next(searchString);
  }

  ngOnInit() {
    this.subscription = this.route.queryParams.pipe(
      tap(queryParams => this.parseQueryParams(queryParams)),
      map(queryParams => this.serviceParams(queryParams)),
      tap(serviceParams => this.customerPage$ = this.service.searchPage(serviceParams).pipe(catchError(error => this.catchError(error)))),
    ).subscribe();
  }

  catchError(error) {
    this.toastr.error('Sorry about that 😕', `Error during: Load Customers `);
    return throwError(error);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  parseQueryParams(queryParams: any) {
    this.paginationModel.page = parseInt(queryParams[this.pageParamName] || '1', 10);
    this.searchString = queryParams[this.searchParamName] || '';
  }

  patchQueryParams(queryParams: any) {
    const finalQueryParams = this.mergeQueryParams(queryParams);
    this.router.navigate([], { queryParams: finalQueryParams });
  }

  serviceParams(queryParams: any): Partial<Pagination & Search> {
    return {
      q: queryParams[this.searchParamName] || '',
      limit: this.paginationModel.pageSize,
      offset: this.paginationModel.getOffset(),
    };
  }

  mergeQueryParams(queryParams: any) {
    return { ...this.route.snapshot.queryParams, ...queryParams };
  }

  paginateParams() {
    return (pageItem: PageItem) => {
      return this.mergeQueryParams({ [this.pageParamName]: pageItem.number });
    };
  }

  addressLink(address: Address) {
    return `https://google.com/maps/search/${address.street}, ${address.number} ${address.zipCode}`;
  }

}
