import { Injectable, Optional } from '@angular/core';
import { defer, from, Observable, of } from 'rxjs';
import { delay, filter } from 'rxjs/operators';
import { CustomerService, Customer, Phone, Address, Site, Pagination, Search, Page } from '.';
import * as faker from 'faker';
import * as _ from 'lodash';
import { fake } from 'faker';
@Injectable()
export class MockCustomerService implements CustomerService {


  private customerList: Customer[] = [];

  constructor() {
    for (let i = 0; i < 2; i += 1) {
      this.customerList.push(this.randomCustomer());
    }
  }

  public searchPage(args: Partial<Pagination & Search> = {}): Observable<Page<Customer>> {
    return of({ total: this.customerList.length, items: this.customerList }).pipe(delay(500));
  }

  public save(customer: Partial<Customer>): Observable<Customer> {
    return defer(() => {
      if (customer.id === null || customer.id === undefined) {
        customer.id = `${faker.random.number()}`;
        this.customerList.push(customer as Customer);
        return of(customer as Customer).pipe(
          delay(500)
        );
      }
      const listIndex = this.customerList.findIndex(it => it.id === customer.id);
      const oldCustomer = this.customerList[listIndex];
      const newCustomer = { ...oldCustomer, ...customer };
      this.customerList[listIndex] = newCustomer;
      return of(newCustomer).pipe(
        delay(500)
      );
    });
  }

  public remove(customer: { id: string }) {
    return defer(() => {
      const listIndex = this.customerList.findIndex(it => it.id === customer.id);
      this.customerList.splice(listIndex, 1);
    });
  }

  public get(id: string): Observable<Customer> {
    return from(this.customerList).pipe(
      filter(it => it.id === id),
      delay(500),
    );
  }

  public randomPhone(): Phone {
    return {
      number: faker.phone.phoneNumber(),
      name: faker.name.jobArea(),
    };
  }

  public randomAddress(): Address {
    return {
      number: `${faker.random.number()}`,
      name: faker.name.jobArea(),
      street: faker.address.streetName(),
      zipCode: faker.address.zipCode()
    };
  }

  public randomSite(): Site {
    return {
      url: faker.internet.url()
    };
  }


  public randomCustomer(): Customer {
    return {
      id: `${faker.random.number()}`,
      name: faker.name.findName(),
      birthday: faker.date.past().toISOString(),
      cpf: faker.finance.account(),
      rg: faker.finance.account(),
      addresses: _.range(0, _.random(1, 3, false)).map(__ => this.randomAddress()),
      phones: _.range(0, _.random(1, 3, false)).map(__ => this.randomPhone()),
      sites: _.range(0, _.random(1, 5, false)).map(__ => this.randomSite()),
    };
  }

}
