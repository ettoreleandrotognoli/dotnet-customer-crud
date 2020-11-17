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
  postalCode: string;
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

export interface Customer {
  id: string;
  name: string;
  birthday: string;
  addresses: Address[];
  phones: Phone[];
  sites: Site[];
}

export interface CustomerService {
  get(id: string): Observable<Customer>;
  listAll(): Observable<Customer[]>;
}

export const CUSTOMER_RESOURCE_URL = new InjectionToken<string>('CustomerResourceUrl');
export const CUSTOMER_SERVICE = new InjectionToken<CustomerService>('CustomerService');
