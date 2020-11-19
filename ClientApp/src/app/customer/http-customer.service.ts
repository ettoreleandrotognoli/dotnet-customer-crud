import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomerService, Customer, Pagination, Search, Page, CUSTOMER_RESOURCE_URL } from '.';
import { ValidationError } from './form/base-form-component';
import * as _ from 'lodash';
import { Gluers } from '@huehuejs/name-convention/gluer';
import { Splitters } from '@huehuejs/name-convention/splitter';
import { NameConventionConverter } from '@huehuejs/name-convention/converter';
@Injectable()
export class HttpCustomerService implements CustomerService {

  private nameConverter = new NameConventionConverter(
    Gluers.LowerCamelCase,
    Splitters.AnyCase,
  );

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
    const request =
      !customer.id ?
        this.http.post<Customer>(this.resourceUrl, customer) :
        this.http.put<Customer>(`${this.resourceUrl}/${customer.id}`, customer);
    return request.pipe(
      catchError(error => this.parseHttp400(error))
    );
  }

  protected toKeyWay(propertyName): (string | number)[] {

    const splitArrayKey = (arrayKey) => {
      if (!arrayKey.includes('[')) {
        return [arrayKey];
      }
      const [a, b] = arrayKey.split('[');
      return [a, parseInt(b.replace(']', ''), 10)];
    };
    return _.flatMap(propertyName.split('.'), splitArrayKey).map(it => this.nameConverter.parseString(it));
  }

  protected parseHttp400(httpError: HttpErrorResponse) {
    if (httpError.status !== 400) {
      return throwError(httpError);
    }
    const errors = {};
    for (const errorKey of Object.keys(httpError.error['errors'] || {})) {
      const errorMessages: string[] = httpError.error.errors[errorKey];
      const keyWay = this.toKeyWay(errorKey);
      let value = errors;
      for (const key of keyWay) {
        if (value[key]) {
          value = value[key];
          continue;
        }
        value[key] = {};
        value = value[key];
      }
      for (const errorMessage of errorMessages) {
        Object.assign(value, { [errorMessage]: true });
      }
    }
    return throwError(new ValidationError(errors, httpError));
  }



  public remove(customer: { id: string }): Observable<void> {
    return this.http.delete<void>(`${this.resourceUrl}/${customer.id}`);
  }

}
