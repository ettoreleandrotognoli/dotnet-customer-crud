import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { delay, filter } from 'rxjs/operators';
import { CustomerService, Customer, Phone, Address, Site} from '.';
import * as faker from 'faker';
import * as _ from 'lodash';
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
      addresses: _.range(0, _.random(1, 3, false)).map( __ => this.randomAddress()),
      phones: _.range(0, _.random(1, 3, false)).map( __ => this.randomPhone()),
      sites: _.range(0, _.random(1, 5, false)).map( __ => this.randomSite()),
    };
  }

}
