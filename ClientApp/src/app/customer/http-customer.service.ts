import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { CustomerService, Customer } from '.';

@Injectable()
export class HttpCustomerService implements CustomerService {

  constructor(
    private resourceUrl: string,
    private http: HttpClient
  ) {

  }

  public listAll(): Observable<Customer[]> {
    return EMPTY;
  }

  public get(id: string): Observable<Customer> {
    return EMPTY;
  }


  public save(customer: Partial<Customer>): Observable<Customer> {
    return EMPTY;
  }

  public remove(customer: { id: string }): Observable<void> {
    return EMPTY;
  }

}
