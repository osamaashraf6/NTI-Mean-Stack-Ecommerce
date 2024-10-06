import { Pagination } from './../../interfaces/pagination';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit, OnDestroy {
  // TODO: { Properties[depend on each case create get..],,,, Methods[lifycycle + 4],,,, All import at(imports 3, constructor 3) }3

  subscription: any;
  orders: any[] = [];
  pagination: any = {};
  limit: number = 3;
  page: number = 1;
  sort: string = 'createdAt';
  productImg: string = '';
  constructor(
    private _OrdersService: OrdersService,
    private _ProductsService: ProductsService
  ) {}
  getUserOrder() {
    this.subscription = this._OrdersService
      .getUserOrder(this.limit, this.page, this.sort)
      .subscribe({
        next: (res) => {
          console.log(res.data);
          this.orders = res.data;
          this.pagination = res.pagination;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  changePage(page: number) {
    this.page = page;
    this.getUserOrder();
  }

  ngOnInit(): void {
    this.getUserOrder();
    this.productImg = this._ProductsService.productImg;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
