import { Injectable } from '@angular/core';
import { GlobalServiceService } from './global-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // TODO: { Properties[global + current + assign],,,, Methods[+3],,,, All import at[imports X, constructor 3] }3
  private baseUrl: string;
  private productRoute: string;
  productImg: string = '';
  private apiKey: string;
  constructor(
    private GlobalServiceService: GlobalServiceService,
    private _HttpClient: HttpClient
  ) {
    this.baseUrl = this.GlobalServiceService.baseUrl;
    this.productRoute = this.GlobalServiceService.productRoute;
    this.productImg = this.GlobalServiceService.productImg;
    this.apiKey = this.GlobalServiceService.apiKey;
  }
  getAllProduct(
    limit: number,
    page: number,
    sort: string,
    search?: string,
    categoryId?: string,
    subcategoryId?: string,
    color?: string,
    size?: string,
    tags?: string
  ): Observable<any> {
    let queryParams = `limit=${limit}&page=${page}&sort=${sort}`;
    if (search) {
      queryParams += `&search=${search}`;
    }
    if (categoryId) {
      queryParams += `&categoryId=${categoryId}`;
    }
    if (subcategoryId) {
      queryParams += `&subcategoryId=${subcategoryId}`;
    }
    if (color) {
      queryParams += `&color=${color}`;
    }
    if (size) {
      queryParams += `&size=${size}`;
    }
    if (tags) {
      queryParams += `&tags=${tags}`;
    }
    return this._HttpClient.get(
      `${this.baseUrl}${this.productRoute}?${queryParams}`,
      {
        headers: {
          'X-API-KEY': `${this.apiKey}`,
        },
        withCredentials: true,
      }
    );
  }
  getOneProduct(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.productRoute}/${id}`, {
      headers: {
        'X-API-KEY': `${this.apiKey}`,
      },
      withCredentials: true,
    });
  }
}
