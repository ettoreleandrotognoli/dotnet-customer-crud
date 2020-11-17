import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CustomerService, Customer } from '.';

@Injectable()
export class MockCustomerService implements CustomerService {


  private customerList: Customer[] = [

  ];

  public listAll(): Observable<Customer[]> {
    return of(this.customerList).pipe(delay(500));
  }


}
