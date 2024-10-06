import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { ISubcategory } from '../../interfaces/subcategory';

@Component({
  selector: 'app-subcategory',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.scss',
})
export class SubcategoryComponent implements OnInit, OnDestroy {
  // TODO: { Properties[depend on each case create get..],,,, Methods[lifycycle + 4],,,, All import at(imports 3, constructor 3) }3
  subscription: any;
  subcategories: ISubcategory[] = [];
  id: string = '';
  constructor(
    private _CategoriesService: CategoriesService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  getAllSubCategory(categoryId: string) {
    this.subscription = this._CategoriesService.getAllSubCategory(
      categoryId
    ).subscribe({
      next: (res) => {
        this.subcategories = res.data;
      },
      error: (err: any) => {},
    });
  }
  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.params['categoryId'];
    this.getAllSubCategory(this.id);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
