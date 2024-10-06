import { WishlistService } from './../../services/wishlist.service';
import { CartsService } from './../../services/carts.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { ICategory } from '../../interfaces/category';
import { Pagination } from '../../interfaces/pagination';
import { ISubcategory } from '../../interfaces/subcategory';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  // TODO: { Properties[depends on case],,,, Methods[lifecycle + lpssfls + 3],,,, All import at[imports 3, constructor 3] }3
  // TODO: lpssfl           => { limitItems, changePage, sortItems, searchItems, filterItemsOnCategory, filterItemsOnSubCategory, filterItemsOnColor, filterItemsOnSize, filterItemsOnTags, listAllItems, changeShow }
  // TODO: + 2              => { changeActive, checkToken, changeShow }
  // TODO: depends on case  => { createOne(addressForm, invalidAddressForm, addressToastMessage),
  // TODO:                       getAll    (subscription, Todos[], userImg, pagination|length|limit|page|sort|search|categoryId|subcategoryId|color|size|tags|listAll),
  // TODO:                       getOne    (subscription, Todo{}, userImg, id),
  // TODO:                       updateOne (createOne + getOne),
  // TODO:                       deleteOne (addressToastMessage) }
  // TODO:                  => Be care ful with the getAll service when you add queries
  // TODO: Note             => The important to revise and recap is {reviews, products}
  // TODO: Note             => When createOne or updateOne or deleteOne refetch the getAll() to display the new items instead of refresh the page, but this only if you are in the same page
  // TODO: Note             => The better way to implement update design is the modal like what we did in the update review
  // TODO: Note             => RouterLink: has routerLink && queryParams
  // TODO: Note             => ActivatedRoute: has snapshot.params && snapshot.queryParams
  // TODO: Note             => The important to revise and recap is {reviews, products}
  // TODO: Note             => Add all the services and interfaces first
  // TODO: Note             => Add all the services and call the methods at components
  openDrop: boolean = false;
  //
  subscription: any;
  //
  categories: ICategory[] = [];
  subcategories: ISubcategory[] = [];
  products: any[] = [];
  //
  pagination: Pagination = {};
  limit: number = 6; // default value
  page: number = 1;
  sort: string = '-createdAt'; // default value
  search: string = '';
  categoryId: string = '';
  subcategoryId: string = '';
  color: string = '';
  size: string = '';
  tags: string = '';
  listAll: boolean = false;
  show: string = 'three';
  //
  productImg: string = '';
  //
  dropItems: any[] = [
    {
      id: 1,
      name: 'one',
    },
    {
      id: 2,
      name: 'two',
    },
    {
      id: 3,
      name: 'three',
    },
  ];
  //
  subcategoryName: string | null = '';
  //

  colorList: any[] = [
    {
      id: 1,
      name: 'black',
    },
    {
      id: 1,
      name: 'red',
    },
    {
      id: 1,
      name: 'browen',
    },
  ];
  sizeList: any[] = [
    {
      id: 1,
      name: 'xs',
    },
    {
      id: 2,
      name: 'sm',
    },
    {
      id: 3,
      name: 'md',
    },
    {
      id: 4,
      name: 'lg',
    },
    {
      id: 5,
      name: 'xl',
    },
  ];
  tagsList: string[] = [];
  //
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _CategoriesService: CategoriesService,
    private _ProductsService: ProductsService,
    private _CartsService: CartsService,
    private _WishlistService: WishlistService
  ) {}

  getAllCategory() {
    this.subscription = this._CategoriesService
      .getAllCategory(this.limit, this.page, this.sort)
      .subscribe({
        next: (res) => {
          this.categories = res.data;
        },
        error: (err) => {},
      });
  }
  getAllSubCategory(categoryId: string) {
    this.subscription = this._CategoriesService
      .getAllSubCategory(categoryId)
      .subscribe({
        next: (res) => {
          this.subcategories = res.data;
        },
        error: (err: any) => {},
      });
  }
  getAllProduct() {
    if (this.listAll) {
      this.subscription = this._ProductsService
        .getAllProduct(
          this.limit,
          this.page,
          this.sort,
          this.search,
          '',
          '',
          this.color,
          this.size
        )
        .subscribe({
          next: (res) => {
            this.products = res.data;
            this.pagination = res.pagination;
          },
          error: (err: any) => {},
        });
    } else {
      this.subscription = this._ProductsService
        .getAllProduct(
          this.limit,
          this.page,
          this.sort,
          this.search,
          this.categoryId,
          this.subcategoryId,
          this.color,
          this.size,
          this.tags
        )
        .subscribe({
          next: (res) => {
            this.products = res.data;
            this.pagination = res.pagination;
          },
          error: (err: any) => {},
        });
    }
  }
  addProductToWishlist(productId: string) {
    if (!localStorage.getItem('user')) {
      alert('You have to sign in first');
    } else {
      this._WishlistService.addProductToWishlist(productId).subscribe({
        next: (res) => {
          alert('Product has been added to wishlist');
        },
        error: (err) => {},
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
        error: (err) => {},
      });
    }
  }
  // Methods(lifecycle + lpssfls + 3)
  limitItems(limit: number) {
    this.limit = limit;
    this.getAllProduct();
  }
  changePage(page: number) {
    this.page = page;
    this.getAllProduct();
  }
  sortItems(sort: string) {
    this.sort = sort;
    this.getAllProduct();
  }
  searchItems(search: string) {
    this.search = search;
    this.getAllProduct();
  }
  filterItemsOnCategory(categoryId: string) {
    this.categoryId = categoryId;
    this.subcategoryId = '';
    this.getAllProduct();
  }
  filterItemsOnSUbCategory(subcategoryId: string) {
    this.subcategoryId = subcategoryId;
    this.categoryId = '';
    this.getAllProduct();
  }
  colorItems(color: string) {
    this.color = color;
    this.getAllProduct();
  }
  sizeItems(size: string) {
    this.size = size;
    this.getAllProduct();
  }
  tagsItems(tags: string) {
    this.tags = tags;
    this.getAllProduct();
  }
  listAllItems() {
    this.listAll = true;
    this.getAllProduct();
  }
  changeShow(show: string) {
    this.show = show;
    this.getAllProduct();
  }
  categoryVal(event: any) {
    this.categoryId = event.target.value;
    this.getAllSubCategory(this.categoryId);
    this.filterItemsOnCategory(event.target.value);
    this.getAllProduct();
  }
  toggleDrop() {
    this.openDrop = !this.openDrop;
  }
  ngOnInit(): void {
    this.productImg = this._ProductsService.productImg;
    // Get the query parameters
    this.subcategoryId = this._ActivatedRoute.snapshot.params['subcategoryId'];
    this._ActivatedRoute.queryParams.subscribe((params) => {
      this.subcategoryName = params['subcategoryName'];
      this.categoryId = params['categoryId'];
    });
    this.getAllCategory();
    this.getAllSubCategory(this.categoryId);
    this.getAllProduct();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
