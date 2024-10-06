import { CartsService } from './../../services/carts.service';
import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../interfaces/product';
import { WishlistService } from '../../services/wishlist.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recent-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recent-products.component.html',
  styleUrl: './recent-products.component.scss',
})
export class RecentProductsComponent {
  // TODO: { Properties[depends on case],,,, Methods[lifecycle + 4],,,, All import at[imports 3, constructor 3] }3
  subscription: any;
  products: IProduct[] = [];
  productImg: string = '';
  limit: number = 8;
  page: number = 1;
  sort: string = '-createdAt';
  //
  invalidWishListForm: string = '';
  toastMessage: string = '';
  constructor(
    private _ProductsService: ProductsService,
    private _WishlistService: WishlistService,
    private _CartsService: CartsService
  ) {}
  getAllRecenets() {
    this.subscription = this._ProductsService
      .getAllProduct(this.limit, this.page, this.sort)
      .subscribe({
        next: (res) => {
          this.products = res.data;
        },
        error: (err) => {},
      });
  }
  addProductToCart(productId: string) {
    if (!localStorage.getItem('user')) {
      alert('You have to sign in first');
    } else {
      this._CartsService.addProductToCart(productId).subscribe({
        next: (res) => {
          alert('Product has been added to cart');
        },
        error: (err) => {},
      });
    }
  }

  addProductToWishlist(productId: string) {
    if (!localStorage.getItem('user')) {
      alert('You have to sign in first');
    } else {
      this._WishlistService.addProductToWishlist(productId).subscribe({
        next: (res) => {
          alert('Product has been added to wishlist');
          this.toastMessage = 'Product has been added to wishlist';
        },
        error: (err) => {
          this.invalidWishListForm = 'Some thing went wrong';
        },
      });
    }
  }
  ngOnInit(): void {
    this.productImg = this._ProductsService.productImg;

    this.getAllRecenets();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
