import { Pagination } from './../../interfaces/pagination';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReviewsService } from '../../services/reviews.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-reviews',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './user-reviews.component.html',
  styleUrl: './user-reviews.component.scss',
})
export class UserReviewsComponent implements OnInit, OnDestroy {
  reviewForm: FormGroup = new FormGroup({
    rate: new FormControl(null, [Validators.required]),
    comment: new FormControl(null, [Validators.required]),
  });
  invalidReviewForm: string = '';
  subscription: any;
  userReviews: any[] = [];
  reviewUpadtedToastMessage: string = '';
  reviewDeletedToastMessage: string = '';
  openUpdateAddress: boolean = false;
  reviewId: string = '';
  pagination: Pagination = {};
  limit: number = 6;
  page: number = 1;
  sort: string = '-createdAt';
  constructor(private _ReviewsService: ReviewsService) {}
  getAllReviewOfUser() {
    this.subscription = this._ReviewsService
      .getAllReviewOfUser(this.limit, this.page, this.sort)
      .subscribe({
        next: (res) => {
          console.log(res.data);
          this.userReviews = res.data;
          this.pagination = res.pagination;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }
  toggleUpdateAddress(reviewId: string) {
    this.openUpdateAddress = !this.openUpdateAddress;
    this.reviewId = reviewId;
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
            this.getAllReviewOfUser();
            this.openUpdateAddress = false;
          },
          error: (err) => {
            this.reviewUpadtedToastMessage = err.error.errors[0].msg;
            console.log(err);
          },
        });
    }
  }
  deleteOneReviewByUser(reviewId: string) {
    if (!localStorage.getItem('user')) {
      alert('You have to sign in first');
    } else {
      this._ReviewsService.deleteOneReviewByUser(reviewId).subscribe({
        next: (res) => {
          alert('Review has been deleted successfully');
          this.getAllReviewOfUser();
        },
        error: (err) => {
          this.reviewDeletedToastMessage = err.error.errors[0].msg;
          console.log(err);
        },
      });
    }
  }
  getStarsArray(rate: number): number[] {
    return Array(rate).fill(1); // Creates an array of length 'rate'
  }
  changePage(page: number) {
    this.page = page;
    this.getAllReviewOfUser;
  }
  ngOnInit(): void {
    this.getAllReviewOfUser();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
