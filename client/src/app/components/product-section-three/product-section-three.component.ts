import { CartsService } from './../../services/carts.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { IProduct } from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-product-section-three',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-section-three.component.html',
  styleUrl: './product-section-three.component.scss',
})
export class ProductSectionThreeComponent implements OnInit, OnDestroy {
  subscription: any;
  products: IProduct[] = [];
  limit: number = 5;
  page: number = 1;
  sort: string = 'createdAt';
  subcategoryId: string = '';

  productImg: string = '';

  invalidWishListForm: string = '';
  toastMessage: string = '';
  constructor(
    private _WishlistService: WishlistService,
    private _ProductsService: ProductsService,
    private _ActivatedRoute: ActivatedRoute,
    private _CartsService: CartsService
  ) {}
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
          alert('Product has been added to cart');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  reload() {
    window.location.reload();
  }
  getRelatedProduct() {
    this.subscription = this._ProductsService
      .getAllProduct(
        this.limit,
        this.page,
        this.sort,
        '',
        '',
        this.subcategoryId
      )
      .subscribe({
        next: (res) => {
          this.products = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  ngOnInit(): void {
    this.productImg = this._ProductsService.productImg;
    this._ActivatedRoute.queryParams.subscribe((params) => {
      this.subcategoryId = params['subcategoryId'];
    });
    this.getRelatedProduct();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
