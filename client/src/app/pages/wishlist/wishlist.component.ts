import { Component, OnDestroy, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { IProduct } from '../../interfaces/product';
import { CartsService } from '../../services/carts.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit, OnDestroy {
  // TODO: { Properties[depend on each case create get..],,,, Methods[lifycycle + 4],,,, All import at(imports 3, constructor 3) }3
  subscription: any;
  wishlists: any[] = [];
  productImg: string = '';
  toastMessageForCart: string = '';
  invalidCartForm: string = '';
  constructor(
    private _wishlistService: WishlistService,
    private _CartsService: CartsService,
    private _ProductsService: ProductsService
  ) {}
  getUserWishlist() {
    this.subscription = this._wishlistService.getUserWishlist().subscribe({
      next: (res) => {
        this.wishlists = res.data;
      },
      error: (err: any) => {},
    });
  }
  removeProductFromWishlist(productId: string) {
    this._wishlistService.removeProductFromWishlist(productId).subscribe({
      next: (res) => {
        alert('Product hasa been deleted from the wishlist');
        this.getUserWishlist();
      },
      error: (err: any) => {},
    });
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
          this.invalidCartForm = 'Some thing went wrong';
        },
      });
    }
  }

  ngOnInit(): void {
    this.productImg = this._ProductsService.productImg;
    this.getUserWishlist();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
