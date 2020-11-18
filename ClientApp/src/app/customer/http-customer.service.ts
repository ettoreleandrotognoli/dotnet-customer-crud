import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { CustomerService, Customer, Pagination, Search, Page, CUSTOMER_RESOURCE_URL } from '.';

@Injectable()
export class HttpCustomerService implements CustomerService {

  constructor(
    @Inject(CUSTOMER_RESOURCE_URL)
    private resourceUrl: string,
    private http: HttpClient
  ) {
  }

  public searchPage(params: Partial<Pagination & Search> = {}): Observable<Page<Customer>> {
    return this.http.get<Page<Customer>>(this.resourceUrl, { params: params as HttpParams });
  }

  public get(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.resourceUrl}/${id}`);
  }


  public save(customer: Partial<Customer>): Observable<Customer> {
    if (!customer.id) {
      return this.http.post<Customer>(this.resourceUrl, customer);
    }
    return this.http.put<Customer>(`${this.resourceUrl}/${customer.id}`, customer);
  }

  public remove(customer: { id: string }): Observable<void> {
    return this.http.delete<void>(`${this.resourceUrl}/${customer.id}`);
  }

}
