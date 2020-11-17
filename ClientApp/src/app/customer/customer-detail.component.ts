import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerService, CUSTOMER_SERVICE, Customer } from '.';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-customer-detail',
  template: `
    <div *ngIf="customer$ | async as customer; else loading">
      <h1> Customer {{ customer.name }} </h1>
      {{ customer | json }}
    </div>
    <ng-template #loading><em>Loading...</em></ng-template>
  `
})
export class CustomerDetailComponent implements OnInit {

  @Input()
  public id: string;

  public customer$: Observable<Customer>;

  constructor(
    @Inject(CUSTOMER_SERVICE)
    private service: CustomerService,
    @Optional()
    private route?: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.customer$ = this.route.params.pipe(
      map( params => params['id'] || this.id),
      mergeMap( id => this.service.get(id)),
    );
  }


}
