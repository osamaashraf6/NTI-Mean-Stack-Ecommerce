import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { Pagination } from '../../interfaces/pagination';
import { ICategory } from '../../interfaces/category';
// global service, router, httpclient constr
// its service, router, activated route constr

// ReactiveFormsModule, router, commonmodule import

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit, OnDestroy {
  // TODO: { Properties[depends on case],,,, Methods[lifecycle],,,, All import at[imports 3, constructor 3] }3
  subscription: any;
  categories: ICategory[] = [];
  pagination: Pagination = {};
  limit: number = 12;
  page: number = 1;
  sort: string = '-createdAt';

  constructor(private _CategoriesService: CategoriesService) {}
  getAllCategory() {
    this.subscription = this._CategoriesService
      .getAllCategory(this.limit, this.page, this.sort)
      .subscribe({
        next: (res) => {
          this.categories = res.data;
          this.pagination = res.pagination;
        },
        error: (err) => {},
      });
  }
  changePage(page: number) {
    this.page = page;
    this.getAllCategory();
  }

  ngOnInit(): void {
    this.getAllCategory();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
