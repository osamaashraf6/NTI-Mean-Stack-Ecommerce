import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReviewsService } from '../../services/reviews.service';
import { IReview } from '../../interfaces/review';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-product-section-two',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './product-section-two.component.html',
  styleUrl: './product-section-two.component.scss',
})
export class ProductSectionTwoComponent implements OnInit, OnDestroy {
  reviewForm: FormGroup = new FormGroup({
    rate: new FormControl(null, [Validators.required]),
    comment: new FormControl(null, [Validators.required]),
  });
  invalidReviewForm: string = '';
  reviewToastMessage: string = '';
  reviewUpadtedToastMessage: string = '';
  openUpdateAddress = false;
  product: any = {};
  reviews: any[] = [];
  length: number = 0;
  productName: string = '';
  userId: string | null = '';
  reviewId: string | null = '';
  id: string = '';
  subscription: any;
  flag: string = 'desc';
  userImg: string = '';
index: any;
  constructor(
    private _ProductsService: ProductsService,
    private _ActivatedRoute: ActivatedRoute,
    private _ReviewsService: ReviewsService,
    private _UsersService: UsersService
  ) {}
  filterTabs(c: string) {
    switch (c) {
      case 'description':
        this.flag = 'desc';
        break;
      case 'information':
        this.flag = 'info';
        break;
      case 'reviews':
        this.flag = 'rev';
        break;
      default:
        this.flag = 'desc';
        break;
    }
  }

  //

  getStarsArray(rate: number): number[] {
    return Array(rate).fill(1); // Creates an array of length 'rate'
  }
  //

  getOneProduct(productId: string) {
    this.subscription = this._ProductsService
      .getOneProduct(productId)
      .subscribe({
        next: (res) => {
          this.product = res.data;
          this.productName = res.data.name;
        },
        error: (err) => {},
      });
  }
  createOneReviewByUser(productId: string, formData: FormGroup) {
    if (!localStorage.getItem('user')) {
      alert('You have to sign in first');
    } else {
      this._ReviewsService
        .createOneReviewByUser(productId, formData.value)
        .subscribe({
          next: (res) => {
            alert('Review has been created successfully');
            this.getAllReviewOfProduct(this.id);
          },
          error: (err) => {
            this.invalidReviewForm = err.error.errors[0].msg;
            console.log(err);
          },
        });
    }
  }
  updateOneReviewByUser(productId: string, formData: FormGroup) {
    if (!localStorage.getItem('user')) {
      alert('You have to sign in first');
    } else {
      this._ReviewsService
        .updateOneReviewByUser(this.reviewId!, formData.value)
        .subscribe({
          next: (res) => {
            alert('Review has been updated successfully');
            this.getAllReviewOfProduct(this.id);
            this.openUpdateAddress = false;
          },
          error: (err) => {
            this.reviewUpadtedToastMessage = err.error.errors[0].msg;
            console.log(err);
          },
        });
    }
  }
  getAllReviewOfProduct(productId: string) {
    this.subscription = this._ReviewsService
      .getAllReviewOfProduct(productId)
      .subscribe({
        next: (res) => {
          this.reviews = res.data;
          this.length = res.data.length;
        },
        error: (err) => {},
      });
  }
  deleteOneReviewByUser(reviewId: string) {
    if (!localStorage.getItem('user')) {
      alert('You have to sign in first');
    } else {
      this._ReviewsService.deleteOneReviewByUser(reviewId).subscribe({
        next: (res) => {
          alert('Review has been deleted successfully');
          this.getAllReviewOfProduct(this.id);
          window.location.reload();
        },
        error: (err) => {
          this.reviewToastMessage = err.error.errors[0].msg;
          console.log(err);
        },
      });
    }
  }
  toggleUpdateAddress(reviewId: string) {
    this.openUpdateAddress = !this.openUpdateAddress;
    this.reviewId = reviewId;
  }
  ngOnInit(): void {
    this.userImg = this._UsersService.userImg;

    this.id = this._ActivatedRoute.snapshot.params['productId'];
    this.getOneProduct(this.id);
    this.getAllReviewOfProduct(this.id);
    const userid: any = JSON.parse(localStorage.getItem('userinfo')!)._id;
    this.userId = userid;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
