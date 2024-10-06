import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pagination } from '../../interfaces/pagination';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartsService } from '../../services/carts.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
})
export class TagComponent implements OnInit, OnDestroy {
  invalidWishListForm: string = '';
  toastMessage: string = '';
  invalidCartForm: string = '';
  toastMessageForCart: string = '';
  subscription: any;
  products: any[] = [];
  //
  pagination: Pagination = {};
  limit: number = 6; // default value
  page: number = 1;
  sort: string = '-createdAt'; // default value
  tags: string = '';
  productImg: string = '';
  constructor(
    private _ProductsService: ProductsService,
    private _ActivatedRoute: ActivatedRoute,
    private _CartsService: CartsService,
    private _WishlistService: WishlistService
  ) {}
  getAllProduct() {
    this.subscription = this._ProductsService
      .getAllProduct(
        this.limit,
        this.page,
        this.sort,
        '',
        '',
        '',
        '',
        '',
        this.tags
      )
      .subscribe({
        next: (res) => {
          this.products = res.data;
          this.pagination = res.pagination;
        },
        error: (err) => {},
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
  changePage(page: number) {
    this.page = page;
    this.getAllProduct();
  }
  tagsItems(tag: string) {
    this.tags = tag;
    this.getAllProduct();
  }
  ngOnInit(): void {
    this.tags = this._ActivatedRoute.snapshot.params['tagName'];
    this.productImg = this._ProductsService.productImg;
    this.getAllProduct();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
