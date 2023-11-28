import {Product} from "./product.model";

export interface Pagination<T> {
  pageIndex: number
  pageSize: number
  totalCount: number
  data: T[]
}
