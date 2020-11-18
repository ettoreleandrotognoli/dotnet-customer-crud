import { Component, Inject, OnInit } from '@angular/core';
import { CustomerService, CUSTOMER_SERVICE, Customer } from '.';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  template: `
    <h1 id="tableLabel">
      Customer List
      <a class="btn btn-light" [routerLink]="['/customer/new']">
        <fa-icon [icon]="faPlus"></fa-icon>
        <span class="sr-only">New</span>
      </a>
    </h1>

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
export class CustomerListComponent implements OnInit {

  public customers$: Observable<Customer[]>;
  public faPlus = faPlus;


  constructor(
    @Inject(CUSTOMER_SERVICE)
    private service: CustomerService
  ) {

  }

  ngOnInit() {
    this.customers$ = this.service.listAll();
  }


}
