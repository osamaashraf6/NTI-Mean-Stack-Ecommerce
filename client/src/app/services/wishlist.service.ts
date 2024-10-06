import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalServiceService } from './global-service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  // TODO: { Properties[global + current + assign],,,, Methods[],,,, All import at[imports X, constructor 3] }3
  private baseUrl: string;
  private wishlistRoute: string;
  productImg: string = '';
  private apiKey: string;
  constructor(
    private GlobalServiceService: GlobalServiceService,
    private _HttpClient: HttpClient
  ) {
    this.baseUrl = this.GlobalServiceService.baseUrl;
    this.wishlistRoute = this.GlobalServiceService.wishlistRoute;
    this.productImg = this.GlobalServiceService.productImg;
    this.apiKey = this.GlobalServiceService.apiKey;
  }
  addProductToWishlist(productId: string): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}${this.wishlistRoute}`,
      { productId },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('user')}`,
          'X-API-KEY': `${this.apiKey}`,
        },
        withCredentials: true,
      }
    );
  }
  getUserWishlist(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.wishlistRoute} `, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('user')}`,
        'X-API-KEY': `${this.apiKey}`,
      },
      withCredentials: true,
    });
  }
  removeProductFromWishlist(productId: string): Observable<any> {
    return this._HttpClient.delete(
      `${this.baseUrl}${this.wishlistRoute}/${productId} `,
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
