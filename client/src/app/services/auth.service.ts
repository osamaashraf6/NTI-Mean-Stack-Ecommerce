import { Injectable } from '@angular/core';
import { GlobalServiceService } from './global-service.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import Cookies from 'js-cookie';
import { IUser } from '../interfaces/user';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // TODO: { Properties[global + currentUser + assign],,,, Methods[+3],,,, All import at[imports x, constructor 3] }3
  private baseUrl: string;
  private authRoute: string;
  private apiKey: string;
  currentUser = new BehaviorSubject(null);
  constructor(
    private _GlobalService: GlobalServiceService,
    private _HttpClient: HttpClient,
    private _Router: Router
  ) {
    this.baseUrl = this._GlobalService.baseUrl;
    this.authRoute = this._GlobalService.authRoute;
    this.apiKey = this._GlobalService.apiKey;
    // This for if the user reload the page
    if (localStorage.getItem('user') != null) {
      this.getAndDecodeAndSaveAtCurrentUser();
    }
  }
  register(formData: IUser): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}${this.authRoute}/register`,
      formData,
      {
        headers: {
          'X-API-KEY': `${this.apiKey}`,
          // 'X-CSRF-Token': `${Cookies.get('cookies')}`,
        },
        withCredentials: true,
      }
    );
  }
  login(formData: IUser): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}${this.authRoute}/login`,
      formData,
      {
        headers: {
          'X-API-KEY': `${this.apiKey}`,
          // 'X-CSRF-Token': `${Cookies.get('cookies')}`,
        },
        withCredentials: true,
      }
    );
  }
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('userinfo');
    this.currentUser.next(null);
    this._Router.navigate(['']);
  }
  forgetPassword(formData: IUser): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}${this.authRoute}/forgetPassword`,
      formData,
      {
        headers: {
          'X-API-KEY': `${this.apiKey}`,
          // 'X-CSRF-Token': `${Cookies.get('cookies')}`,
        },
        withCredentials: true,
      }
    );
  }
  verifyResetCode(formData: string): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}${this.authRoute}/verifyResetCode`,
      formData,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('verify')}`,
          'X-API-KEY': `${this.apiKey}`,
          // 'X-CSRF-Token': `${Cookies.get('cookies')}`,
        },
        withCredentials: true,
      }
    );
  }
  resetPassword(formData: IUser): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}${this.authRoute}/resetPassword`,
      formData,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('verify')}`,
          'X-API-KEY': `${this.apiKey}`,
          // 'X-CSRF-Token': `${Cookies.get('cookies')}`,
        },
        withCredentials: true,
      }
    );
  }
  getAndDecodeAndSaveAtCurrentUser() {
    const token = localStorage.getItem('user');
    if (token) {
      this.currentUser.next(jwtDecode(token));
    }
  }
  checkToken() {
    const token: any = localStorage.getItem('user');
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp! < Date.now() / 1000) {
      this.logout();
    }
  }
  // refreshToeknForSession
  // extendexpiretimeTokenOnRememberMe
  // useremailautofillCredentialOnRememberMe
}
