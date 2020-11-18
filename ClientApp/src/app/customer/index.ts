import { Inject, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';


export interface CustomerModuleOptions {
  resourceUrl: string;
}

export const DEFAULT_CUSTOMER_MODULE_OPTIONS: CustomerModuleOptions = {
  resourceUrl: null
};

export interface Address {
  name: string;
  zipCode: string;
  street: string;
  number: string;
}

export interface Phone {
  name: string;
  number: string;
}

export interface Site {
  url: string;
}

export interface Pagination {
  offset: number;
  limit: number;
}

export interface Search {
  q: string;
}

export interface Page<T> {
  items: T[];
  total: number;
}

export interface Customer {
  id: string;
  name: string;
  cpf: string;
  rg: string;
  birthday: string;
  addresses: Address[];
  phones: Phone[];
  sites: Site[];
}

export interface CustomerService {
  get(id: string): Observable<Customer>;
  save(customer: Partial<Customer>): Observable<Customer>;
  remove(customer: { id: string }): Observable<void>;
  searchPage(params?: Partial<Pagination & Search>): Observable<Page<Customer>>;
}

export const CUSTOMER_MODULE_OPTIONS = new InjectionToken<CustomerModuleOptions>('CustomerModuleOptions');
export const CUSTOMER_RESOURCE_URL = new InjectionToken<string>('CustomerResourceUrl');
export const CUSTOMER_SERVICE = new InjectionToken<CustomerService>('CustomerService');
