import { Injectable } from '@angular/core';
import { GlobalServiceService } from './global-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressesService {
  // TODO: { Properties[global + current + assign],,,, Methods[],,,, All import at[imports X, constructor 3] }3
  private baseUrl: string;
  private addressRoute: string;
  productImg: string = '';
  private apiKey: string;
  constructor(
    private GlobalServiceService: GlobalServiceService,
    private _HttpClient: HttpClient
  ) {
    this.baseUrl = this.GlobalServiceService.baseUrl;
    this.addressRoute = this.GlobalServiceService.addressRoute;
    this.apiKey = this.GlobalServiceService.apiKey;
  }
  getAllAddress(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.addressRoute} `, {
      headers: {
        'X-API-KEY': `${this.apiKey}`,
        authorization: `Bearer ${localStorage.getItem('user')}`,
      },
      withCredentials: true,
    });
  }
  addAddress(formData: any): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}${this.addressRoute}`,
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
  updateAddress(addressId: string, formData: any): Observable<any> {
    return this._HttpClient.put(
      `${this.baseUrl}${this.addressRoute}/${addressId}`,
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
  removeAddress(addressId: string): Observable<any> {
    return this._HttpClient.delete(
      `${this.baseUrl}${this.addressRoute}/${addressId}`,
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
