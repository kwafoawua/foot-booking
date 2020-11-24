export class PaginationService {
  constructor() {
  }

  getRequestParams(page, pageSize) {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (page) { params[ `page` ] = page - 1;}

    if (pageSize) { params[ `size` ] = pageSize;}

    return params;
  }
}
