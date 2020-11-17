import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerService, CUSTOMER_SERVICE, Customer } from '.';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fetch-data',
  template: `
    <h1 id="tableLabel"> Customer List </h1>

    <div *ngIf="customers$ | async as customers; else loading">
      <table class='table table-striped' aria-labelledby="tableLabel">
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let customer of customers">
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
