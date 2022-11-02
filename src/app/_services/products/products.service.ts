import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, ReplaySubject } from 'rxjs';

import { ProductBrand, ResponseData} from '@app/_models/ProductBrand';

const baseUrl = "http://localhost:5000/product";

const limit : number = 10;
let users: ProductBrand[];

@Injectable({ providedIn: 'root'})
export class ProductsService {
  constructor(private http: HttpClient) {
  }

  getAllProductsByBrandName(brand:string, pageNr: number = 0) {
    let response = this.http.get<ResponseData<ProductBrand[]>>(`${baseUrl}/brand/${brand}`);
    return response;
  }

  getAllProducts(pageNr: number = 0) {
    let response = this.http.get<ResponseData<ProductBrand[]>>(`${baseUrl}`);
    return response;
  }

  getById(id: string) {
      return this.http.get<ResponseData<ProductBrand>>(`${baseUrl}/${id}`);
  }

  search(query: string) {
      return this.http.get<ResponseData<ProductBrand[]>>(`${baseUrl}/search/${query}`);
  }

  create(params: any) {
    return this.http.post<ResponseData<ProductBrand>>(`${baseUrl}`, params);
  }

  update(id:string, params: any) {
    return this.http.put<ResponseData<ProductBrand>>(`${baseUrl}/${id}`, params);
  }

  delete(id: string) {
    return this.http.delete<ResponseData<string>>(`${baseUrl}/id`);
  }
}
