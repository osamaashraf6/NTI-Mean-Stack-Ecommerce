import { Injectable } from '@angular/core';
import { GlobalServiceService } from './global-service.service';
import { HttpClient } from '@angular/common/http';
import { IReview } from '../interfaces/review';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  // TODO: { Properties[global + current + assign],,,, Methods[+3],,,, All import at[imports X, constructor 3] }3
  private baseUrl: string;
  private reviewRoute: string;
  private productRoute: string;
  userImg: string = '';
  private apiKey: string;
  constructor(
    private _GlobalServiceService: GlobalServiceService,
    private _HttpClient: HttpClient
  ) {
    this.baseUrl = this._GlobalServiceService.baseUrl;
    this.reviewRoute = this._GlobalServiceService.reviewRoute;
    this.productRoute = this._GlobalServiceService.productRoute;
    this.userImg = this._GlobalServiceService.userImg
    this.apiKey = this._GlobalServiceService.apiKey;
  }
  createOneReviewByUser(productId: string, formData: IReview): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}${this.productRoute}/${productId}/reviews`,
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
  getAllReviewOfUser(
    limit: number,
    page: number,
    sort: string
  ): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}${this.reviewRoute}/userReviews?limit=${limit}&page=${page}&sort=${sort}`,
      {
        headers: {
          'X-API-KEY': `${this.apiKey}`,
          authorization: `Bearer ${localStorage.getItem('user')}`,
        },
        withCredentials: true,
      }
    );
  }
  getAllReviewOfProduct(productId: string): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}${this.productRoute}/${productId}/reviews`,
      {
        headers: {
          'X-API-KEY': `${this.apiKey}`,
        },
        withCredentials: true,
      }
    );
  }
  updateOneReviewByUser(reviewId: string, formData: IReview): Observable<any> {
    return this._HttpClient.put(
      `${this.baseUrl}${this.reviewRoute}/${reviewId}`,
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
  deleteOneReviewByUser(reviewId: string): Observable<any> {
    return this._HttpClient.delete(
      // `${this.baseUrl}${this.productRoute}/${productId}/reviews/${reviewId}`,
      `${this.baseUrl}${this.reviewRoute}/${reviewId}`,
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
