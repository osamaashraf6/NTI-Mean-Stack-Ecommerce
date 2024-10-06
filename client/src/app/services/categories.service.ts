import { Injectable } from '@angular/core';
import { GlobalServiceService } from './global-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  // TODO: { Properties[global + currentUser + assign],,,, Methods[+3],,,, All import at[imports x, constructor 3] }3
  private baseUrl: string;
  private categoryRoute: string;
  private apiKey: string;
  constructor(
    private _GlobalServiceService: GlobalServiceService,
    private _HttpClient: HttpClient
  ) {
    this.baseUrl = this._GlobalServiceService.baseUrl;
    this.categoryRoute = this._GlobalServiceService.categoryRoute;
    this.apiKey = this._GlobalServiceService.apiKey;
  }
  getAllCategory(limit: number, page: number, sort: string): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}${this.categoryRoute}?limit=${limit}&page=${page}&sort=${sort}`,
      {
        headers: {
          'X-API-KEY': `${this.apiKey}`,
        },
        withCredentials: true,
      }
    );
  }
  getAllSubCategory(categoryId: string): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}${this.categoryRoute}/${categoryId}/subcategories`,
      {
        headers: {
          'X-API-KEY': `${this.apiKey}`,
        },
        withCredentials: true,
      }
    );
  }
}
