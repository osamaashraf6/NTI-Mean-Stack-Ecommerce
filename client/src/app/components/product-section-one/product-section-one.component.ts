import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { WishlistService } from '../../services/wishlist.service';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-product-section-one',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-section-one.component.html',
  styleUrl: './product-section-one.component.scss',
})
export class ProductSectionOneComponent implements OnInit, OnDestroy {
  invalidWishListForm: string = '';
  toastMessage: string = '';
  products: any[] = [];
  product: any = {};
  id: string = '';
  subscription: any;
  productImg: string = '';
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
  getOneProduct(productId: string) {
    this.subscription = this._ProductsService
      .getOneProduct(productId)
      .subscribe({
        next: (res) => {
          console.log(res.data.imgs);
          this.product = res.data;
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
  ngOnInit() {
    this.id = this._ActivatedRoute.snapshot.params['productId'];
    this.getOneProduct(this.id);
    // this.products = [
    //   {
    //     name: 'Kids Fashion',
    //     image: 'assets/product-1.jpg',
    //     description: 'Description 1',
    //   },
    //   {
    //     name: 'Kids Fashion',
    //     image: 'assets/product-1.jpg',
    //     description: 'Description 2',
    //   },
    //   {
    //     name: 'Kids Fashion',
    //     image: 'assets/product-1.jpg',
    //     description: 'Description 3',
    //   },
    //   // Add more products as needed
    // ];

    this.productImg = this._ProductsService.productImg;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
