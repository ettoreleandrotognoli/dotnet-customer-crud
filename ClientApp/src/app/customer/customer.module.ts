import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { CustomerModuleOptions, CUSTOMER_MODULE_OPTIONS, CUSTOMER_RESOURCE_URL, CUSTOMER_SERVICE, DEFAULT_CUSTOMER_MODULE_OPTIONS } from '.';
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
import { PaginationComponent } from './pagination/pagination.component';
import { HttpCustomerService } from './http-customer.service';
import { ValidatorService } from './form/validator.service';

const COMPONENTS = [
  PaginationComponent,
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
    FontAwesomeModule,
  ],
  exports: [
    ...COMPONENTS
  ],
  providers: [
    ValidatorService,
    MockCustomerService,
    CustomerFormService,
  ],
})
export class CustomerModule {

  public static forRoot(options: Partial<CustomerModuleOptions> = {}): ModuleWithProviders {
    const finalOptions = { ...DEFAULT_CUSTOMER_MODULE_OPTIONS, ...options };
    return {
      ngModule: CustomerModule,
      providers: [
        {
          provide: CUSTOMER_MODULE_OPTIONS,
          useValue: finalOptions,
        },
        {
          provide: CUSTOMER_RESOURCE_URL,
          useValue: finalOptions.resourceUrl,
        },
        {
          provide: CUSTOMER_SERVICE,
          useClass: finalOptions.resourceUrl ? HttpCustomerService : MockCustomerService
        }
      ]
    };
  }

  public static routes(): Routes {
    return [
      { path: 'customer', component: CustomerListComponent },
      { path: 'customer/new', component: CustomerDetailComponent },
      { path: 'customer/edit/:id', component: CustomerDetailComponent },
    ];
  }

}
