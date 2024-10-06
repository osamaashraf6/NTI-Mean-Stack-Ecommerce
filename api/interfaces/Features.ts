export interface IQueryString {
  readonly sort?: string;
  readonly fields?: string;
  readonly search?: string;
  readonly page?: number;
  readonly limit?: number;
  [key: string]: any;
}

export interface ISearchQuery {
  $or?: Array<{ [key: string]: RegExp }>;
  [key: string]: any;
}

export interface IPaginationQuery {
  totalPages?: number;
  currentPage?: number;
  next?: number;
  prev?: number;
}