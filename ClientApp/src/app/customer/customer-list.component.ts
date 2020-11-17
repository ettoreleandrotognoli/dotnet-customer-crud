import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerService, CUSTOMER_SERVICE, Customer } from '.';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  template: `
    <h1 id="tableLabel"> Customer List </h1>

    <div *ngIf="customers$ | async as customers; else loading">
      <table class='table table-striped' aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Name </th>
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

    <ng-template #loading><em>Loading...</em></ng-template>

  `
})
export class CustomerListComponent implements OnInit {

  public customers$: Observable<Customer[]>;


  constructor(
    @Inject(CUSTOMER_SERVICE)
    private service: CustomerService
  ) {

  }

  ngOnInit() {
    this.customers$ = this.service.listAll();
  }


}
