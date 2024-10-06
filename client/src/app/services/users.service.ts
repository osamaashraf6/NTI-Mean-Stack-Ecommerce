import { Injectable } from '@angular/core';
import { GlobalServiceService } from './global-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string;
  private userRoute: string;
  userImg: string = '';
  private apiKey: string;
  constructor(
    private _GlobalServiceService: GlobalServiceService,
    private _HttpClient: HttpClient
  ) {
    this.baseUrl = this._GlobalServiceService.baseUrl;
    this.userRoute = this._GlobalServiceService.userRoute;
    this.userImg = this._GlobalServiceService.userImg;
    this.apiKey = this._GlobalServiceService.apiKey;
  }
  changeUserPasswordByUserHimSelf(formData: any): Observable<any> {
    return this._HttpClient.put(
      `${this.baseUrl}${this.userRoute}/changeUserPasswordByUserHimSelf`,
      formData,
      {
        headers: {
          'X-API-KEY': `${this.apiKey}`,
          authorization: `Bearer ${localStorage.getItem('user')}`,
        },
        withCredentials: true,
      }
    );
  }
  getUserProfileByHimSelf(): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}${this.userRoute}/getUserProfileByHimSelf`,
      {
        headers: {
          'X-API-KEY': `${this.apiKey}`,
          authorization: `Bearer ${localStorage.getItem('user')}`,
        },
        withCredentials: true,
      }
    );
  }
  updateUserProfileByHimSelf(formData: any): Observable<any> {
    return this._HttpClient.put(
      `${this.baseUrl}${this.userRoute}/updateUserProfileByHimSelf`,
      formData,
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
