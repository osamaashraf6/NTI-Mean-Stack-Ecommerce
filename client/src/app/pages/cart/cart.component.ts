import { CommonModule } from '@angular/common';
import { ICart } from '../../interfaces/cart';
import { IProduct } from '../../interfaces/product';
import { CartsService } from './../../services/carts.service';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrdersService } from '../../services/orders.service';
import { AddressesService } from '../../services/addresses.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  // cart
  // TODO: { Properties[depend on each case create get..],,,, Methods[lifycycle + 4],,,, All import at(imports 3, constructor 3) }3
  addressForm: FormGroup = new FormGroup({
    address: new FormControl(null, [Validators.required]),
  });
  invalidAddressForm: string = '';
  open: boolean = false;
  subscription: any;
  cart: ICart[] | any = [];
  addresses: any[] = [];
  totalPrice: number = 0;
  totalPriceAfterDiscount: number = 0;
  length: number = 0;
  taxPrice: number = 0;
  productImg: string = '';
  invalidCoupon: string = '';
  constructor(
    private CartsService: CartsService,
    private _Router: Router,
    private _OrdersService: OrdersService,
    private _AddressesService: AddressesService,
    private _ProductsService: ProductsService
  ) {}
  toggleModal() {
    this.open = !this.open;
  }
  getUserCart() {
    this.subscription = this.CartsService.getUserCart().subscribe({
      next: (res) => {
        this.cart = res.data;
        this.totalPrice = res.data.totalPrice;
        this.length = res.length;
        this.taxPrice = res.taxPrice;
        this.totalPriceAfterDiscount = res.data.totalPriceAfterDiscount;
      },
      error: (err: any) => {},
    });
  }
  removeProductFromCart(productId: string) {
    this.CartsService.removeProductFromCart(productId).subscribe({
      next: (res) => {
        alert('Product hasa been deleted from the Cart');
        this.getUserCart();
      },
      error: (err: any) => {},
    });
  }
  // reloadComponent(): void {
  //   this._Router.navigate([this._Router.url]);
  // }
  clearUserCart() {
    this.CartsService.clearUserCart().subscribe({
      next: (res) => {
        alert('Your Cart has been cleared');
        // this.reloadComponent();
        window.location.reload();
      },
      error: (err: any) => {},
    });
  }
  applyCouponCart(name: string) {
    this.CartsService.applyCouponCart(name).subscribe({
      next: (res) => {
        alert('Coupon has been applied successfully');
        this.getUserCart();
      },
      error: (err: any) => {
        this.invalidCoupon = err.error.message;
      },
    });
  }
  createOneOrderByUser(formData: FormGroup) {
    this._OrdersService.createOneOrderByUser(formData.value).subscribe({
      next: (res) => {
            console.log(this.addressForm.value.address);

        alert('Order added successfully');
        this.getUserCart();
      },
      error: (err) => {},
    });
  }
  getAddress() {
    this.subscription = this._AddressesService.getAllAddress().subscribe({
      next: (res) => {
        this.addresses = res.data;
      },
      error: (err) => {},
    });
  }
  ngOnInit(): void {
    this.getUserCart();
    this.getAddress();
    this.productImg = this._ProductsService.productImg;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
