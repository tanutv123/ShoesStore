import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product} from "../shared/models/product.model";
import {Pagination} from "../shared/models/pagination.model";
import {Brand} from "../shared/models/brand.model";
import {Type} from "../shared/models/type.model";
import {ShopParams} from "../shared/models/shopParams.model";

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = "https://localhost:7141/api/";
  constructor(private http: HttpClient) { }

  getProducts(shopParams : ShopParams) {
    let params = new HttpParams();

    if (shopParams.brandId > 0) params = params.append('brandId', shopParams.brandId);
    if (shopParams.typeId > 0) params = params.append('typeId', shopParams.typeId);
    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber);
    params = params.append('pageSize', shopParams.pageSize);
    if (shopParams.search) params = params.append('search', shopParams.search);

    return this.http.get<Pagination<Product[]>>(this.baseUrl + 'products', {
      params: params
    });
  }

  getBrands() {
    return this.http.get<Brand[]>(this.baseUrl + 'products/brands');
  }

  getTypes() {
    return this.http.get<Type[]>(this.baseUrl + 'products/types');
  }
}
