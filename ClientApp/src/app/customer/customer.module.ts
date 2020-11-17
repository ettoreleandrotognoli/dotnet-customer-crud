import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { CustomerModuleOptions, CustomerService, CUSTOMER_SERVICE, DEFAULT_CUSTOMER_MODULE_OPTIONS } from '.';
import { CustomerListComponent } from './customer-list.component';
import { MockCustomerService } from './mock-customer.service';
import { CommonModule } from '@angular/common';
import { CustomerDetailComponent } from './customer-detail.component';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { CustomerFormService } from './customer-form.service';

const COMPONENTS = [
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
