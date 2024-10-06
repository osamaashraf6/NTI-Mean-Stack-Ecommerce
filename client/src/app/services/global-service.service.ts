import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalServiceService {
  // TODO: { Properties }4
  // baseUrl
  baseUrl: string = 'http://localhost:5000';
  // Routes
  addressRoute: string = '/api/v1/addresses';
  authRoute: string = '/api/v1/auth';
  cartRoute: string = '/api/v1/carts';
  categoryRoute: string = '/api/v1/categories';
  subCategoryRoute: string = '/api/v1/subcategories';
  orderRoute: string = '/api/v1/orders';
  productRoute: string = '/api/v1/products';
  reviewRoute: string = '/api/v1/reviews';
  userRoute: string = '/api/v1/users';
  wishlistRoute: string = '/api/v1/favourites';
  // Imgs
  userImg: string = `${this.baseUrl}/users/`;
  productImg: string = `${this.baseUrl}/products/`;
  // API Key
  apiKey: string = 'secret123';
  constructor() {}
}
