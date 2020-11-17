import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { CustomerModuleOptions, CustomerService, CUSTOMER_SERVICE, DEFAULT_CUSTOMER_MODULE_OPTIONS } from '.';
import { CustomerListComponent } from './customer-list.component';
import { MockCustomerService } from './mock-customer.service';
import { CommonModule } from '@angular/common';
import { CustomerDetailComponent } from './customer-detail.component';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';

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
    FormsModule,
    RouterModule,
  ],
  exports: [
    ...COMPONENTS
  ],
  providers: [
  ],
})
export class CustomerModule {

  public static forRoot(options:  Partial<CustomerModuleOptions>): ModuleWithProviders {
    const finalOptions = Object.assign({}, DEFAULT_CUSTOMER_MODULE_OPTIONS , options);
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
