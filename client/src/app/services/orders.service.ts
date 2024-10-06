import { Injectable } from '@angular/core';
import { GlobalServiceService } from './global-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  // TODO: { Properties[global + currentUser + assign],,,, Methods[+3],,,, All import at[imports x, constructor 3] }3
  private baseUrl: string;
  private orderRoute: string;
  productImg: string = '';
  private apiKey: string;
  constructor(
    private _GlobalServiceService: GlobalServiceService,
    private _HttpClient: HttpClient
  ) {
    this.baseUrl = this._GlobalServiceService.baseUrl;
    this.orderRoute = this._GlobalServiceService.orderRoute;
    this.productImg = this._GlobalServiceService.productImg;
    this.apiKey = this._GlobalServiceService.apiKey;
  }
  getUserOrder(limit: number, page: number, sort: string): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}${this.orderRoute}/getOrderPageByUserHimSelf?limit=${limit}&page=${page}&sort=${sort}`,
      {
        headers: {
          'X-API-KEY': `${this.apiKey}`,
          authorization: `Bearer ${localStorage.getItem('user')}`,
        },
        withCredentials: true,
      }
    );
  }
  createOneOrderByUser(formData: any): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}${this.orderRoute}`,
      { address: formData },
      {
        headers: {
          'X-API-KEY': `${this.apiKey}`,
          authorization: `Bearer ${localStorage.getItem('user')}`,
        },
        withCredentials: true,
      }
    );
  }
}
