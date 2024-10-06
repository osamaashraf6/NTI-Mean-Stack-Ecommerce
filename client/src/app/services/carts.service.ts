import { Injectable } from '@angular/core';
import { GlobalServiceService } from './global-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  // TODO: { Properties[global + current + assign],,,, Methods[],,,, All import at[imports X, constructor 3] }3

  private baseUrl: string;
  private cartRoute: string;
  productImg: string = '';
  private apiKey: string;
  constructor(
    private GlobalServiceService: GlobalServiceService,
    private _HttpClient: HttpClient
  ) {
    this.baseUrl = this.GlobalServiceService.baseUrl;
    this.cartRoute = this.GlobalServiceService.cartRoute;
    this.productImg = this.GlobalServiceService.productImg;
    this.apiKey = this.GlobalServiceService.apiKey;
  }
  addProductToCart(productId: string): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}${this.cartRoute}`,
      { productId: productId },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('user')}`,
          'X-API-KEY': `${this.apiKey}`,
        },
        withCredentials: true,
      }
    );
  }
  getUserCart(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.cartRoute} `, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('user')}`,
        'X-API-KEY': `${this.apiKey}`,
      },
      withCredentials: true,
    });
  }
  removeProductFromCart(productId: string): Observable<any> {
    return this._HttpClient.delete(
      `${this.baseUrl}${this.cartRoute}/${productId} `,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('user')}`,
          'X-API-KEY': `${this.apiKey}`,
        },
        withCredentials: true,
      }
    );
  }
  clearUserCart(): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}${this.cartRoute} `, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('user')}`,
        'X-API-KEY': `${this.apiKey}`,
      },
      withCredentials: true,
    });
  }
  applyCouponCart(name: string): Observable<any> {
    return this._HttpClient.put(
      `${this.baseUrl}${this.cartRoute}/applyCoupon `,
      { name },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('user')}`,
          'X-API-KEY': `${this.apiKey}`,
        },
        withCredentials: true,
      }
    );
  }
}
