import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PageItem, PaginationModel } from '.';
import * as _ from 'lodash';



@Component({
  selector: 'app-pagination',
  template: `
  <nav>
    <ul class="pagination">
      <ng-container *ngFor="let page of pages">
        <li class="page-item" [ngClass]="{'active' : page.active }">
          <a class="page-link" [routerLink]="[]" [queryParams]="queryParamsFactory(page)">
            {{page.number}}
          </a>
        </li>
      </ng-container>
    </ul>
  </nav>
  `
})
export class PaginationComponent {

  @Input()
  public totalItems: number;

  @Input()
  public page: number;

  @Input()
  public model: PaginationModel;

  @Input()
  public queryParamsFactory: (PageItem) => any = (it) => it

  constructor(
    private router: Router
  ) {

  }

  get pages(): PageItem[] {
    return this.model.generatePages(this.totalItems);
  }

}
