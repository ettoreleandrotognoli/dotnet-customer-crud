import * as _ from 'lodash';

export interface PageItem {
  number: number;
  limit: number;
  offset: number;
  active: boolean;
}

export class PaginationModel {

  constructor(
    public pageSize: number,
    public page: number = 1
  ) {

  }

  public generatePages(totalItems: number): PageItem[] {
    return _.range(0, totalItems, this.pageSize)
      .map(initialItem => {
        const pageNumber = Math.trunc(initialItem / this.pageSize) + 1;
        return {
          offset: initialItem,
          limit: this.pageSize,
          number: pageNumber,
          active: pageNumber === this.page
        };
      });
  }

  public getOffset(pageNumber: number = null): number {
    pageNumber = pageNumber || this.page;
    return (pageNumber - 1) * this.pageSize;
  }

}
