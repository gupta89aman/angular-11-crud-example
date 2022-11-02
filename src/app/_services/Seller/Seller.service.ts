import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Seller, ResponseData } from '@app/_models/ProductBrand';

const baseUrl = "http://localhost:5000/seller";

const limit : number = 10;

@Injectable({ providedIn: 'root'})
export class SellerService {
  constructor(private http: HttpClient) {
  }

  getAllSellers(pageNr: number = 0) {
    let response = this.http.get<ResponseData<Seller[]>>(`${baseUrl}`);
    return response;
  }

  getById(id: string) {
      return this.http.get<ResponseData<Seller>>(`${baseUrl}/${id}`);
  }

  search(query: string) {
      return this.http.get<ResponseData<Seller[]>>(`${baseUrl}/search/${query}`);
  }

  create(params: Seller) {
    return this.http.post<ResponseData<Seller>>(`${baseUrl}`, params);
  }

  update(sellerId:string, params: Seller) {
    return this.http.put<ResponseData<Seller>>(`${baseUrl}/${sellerId}`, params);
  }
  delete(sellerId:string) {
    return this.http.delete<ResponseData<number>>(`${baseUrl}/${sellerId}`);
  }
}
