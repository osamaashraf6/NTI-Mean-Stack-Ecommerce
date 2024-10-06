import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';
import { WishlistService } from '../../services/wishlist.service';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.scss',
})
export class BestSellersComponent implements OnInit, OnDestroy {
  // TODO: { Properties[depends on case],,,, Methods[lifecycle + 4],,,, All import at[imports 3, constructor 3] }3
  subscription: any;
  products: IProduct[] = [];
  productImg: string = '';
  limit: number = 8;
  page: number = 1;
  sort: string = '-sold';
  //
  invalidWishListForm: string = '';
  toastMessage: string = '';
  invalidCartForm: string = '';
  toastMessageForCart: string = '';

  constructor(
    private _ProductsService: ProductsService,
    private _WishlistService: WishlistService,
    private _CartsService: CartsService
  ) {}
  getAllBestSellers() {
    this.subscription = this._ProductsService
      .getAllProduct(this.limit, this.page, this.sort)
      .subscribe({
        next: (res) => {
          this.products = res.data;
        },
        error: (err) => {
          console.log(err)
        },
      });
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
          // console.log(err);
        },
      });
    }
  }
  addProductToCart(productId: string) {
    if (!localStorage.getItem('user')) {
      alert('You have to sign in first');
    } else {
      this._CartsService.addProductToCart(productId).subscribe({
        next: (res) => {
          this.toastMessageForCart = 'Product has been added to cart';
          alert('Product has been added to cart');
        },
        error: (err) => {
          console.log(err);
          this.invalidCartForm = 'Some thing went wrong';
          // console.log(err);
        },
      });
    }
  }

  ngOnInit(): void {
    this.productImg = this._ProductsService.productImg;
    this.getAllBestSellers();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
