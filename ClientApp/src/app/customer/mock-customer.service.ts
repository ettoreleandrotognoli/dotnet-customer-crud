import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { delay, filter } from 'rxjs/operators';
import { CustomerService, Customer } from '.';
import * as faker from 'faker';
@Injectable()
export class MockCustomerService implements CustomerService {


  private customerList: Customer[] = [];

  constructor() {
    for (let i = 0; i < 20 ; i += 1) {
        this.customerList.push(this.randomCustomer());
    }
  }

  public listAll(): Observable<Customer[]> {
    return of(this.customerList).pipe(delay(500));
  }

  public get(id: string): Observable<Customer> {
    return from(this.customerList).pipe(
      filter( it => it.id === id),
      delay(500),
    );
  }


  public randomCustomer(): Customer {
    return {
      id: `${faker.random.number()}`,
      name: faker.name.findName(),
      birthday: faker.date.past().toISOString(),
      addresses: [],
      phones: [],
      sites: []
    };
  }

}
