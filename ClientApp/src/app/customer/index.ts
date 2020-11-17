import { Inject, InjectionToken } from "@angular/core"
import { Observable } from "rxjs";


export interface CustomerModuleOptions {
  resourceUrl: string;
}

export const DEFAULT_CUSTOMER_MODULE_OPTIONS: CustomerModuleOptions = {
  resourceUrl: null
};

export interface Customer {


}

export interface CustomerService {
  listAll(): Observable<Customer[]>;
}

export const CUSTOMER_RESOURCE_URL = new InjectionToken<string>('CustomerResourceUrl');
export const CUSTOMER_SERVICE = new InjectionToken<CustomerService>('CustomerService');
