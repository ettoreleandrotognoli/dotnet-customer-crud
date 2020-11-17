import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { CustomerModuleOptions, CUSTOMER_SERVICE, DEFAULT_CUSTOMER_MODULE_OPTIONS } from '.';
import { CustomerListComponent } from './customer-list.component';
import { MockCustomerService } from './mock-customer.service';
import { CommonModule } from '@angular/common';
import { CustomerDetailComponent } from './customer-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomerFormService } from './form/customer-form.service';
import { CustomerFormComponent } from './form/customer-form.component';
import { CustomerPhoneFormComponent } from './form/customer-phone-form.component';
import { CustomerSiteFormComponent } from './form/customer-site-form.component';
import { CustomerAddressFormComponent } from './form/customer-address-form.component';

const COMPONENTS = [
  CustomerAddressFormComponent,
  CustomerSiteFormComponent,
  CustomerPhoneFormComponent,
  CustomerFormComponent,
  CustomerListComponent,
  CustomerDetailComponent,
];


@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    ...COMPONENTS
  ],
  providers: [
    CustomerFormService,
  ],
})
export class CustomerModule {

  public static forRoot(options:  Partial<CustomerModuleOptions>): ModuleWithProviders {
    const finalOptions = {...DEFAULT_CUSTOMER_MODULE_OPTIONS , ...options};
    return {
      ngModule: CustomerModule,
      providers: [
        {
          provide: CUSTOMER_SERVICE,
          useClass: MockCustomerService,
        }
      ]
    };
  }

  public static routes(): Routes {
    return  [
      { path: 'customer', component: CustomerListComponent },
      { path: 'customer/:id', component: CustomerDetailComponent },
    ];
  }

}
