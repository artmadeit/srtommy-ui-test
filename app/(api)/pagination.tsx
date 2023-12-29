export type Page<T> = {
  _embedded: {
    [key: string]: T[];
  };
  _links: any;
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
};

export type SpringPage<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
};
