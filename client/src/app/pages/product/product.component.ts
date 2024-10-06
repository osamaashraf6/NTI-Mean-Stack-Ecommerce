import { Component } from '@angular/core';
import { ProductSectionOneComponent } from '../../components/product-section-one/product-section-one.component';
import { ProductSectionTwoComponent } from '../../components/product-section-two/product-section-two.component';
import { ProductSectionThreeComponent } from '../../components/product-section-three/product-section-three.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    ProductSectionOneComponent,
    ProductSectionTwoComponent,
    ProductSectionThreeComponent,
    RouterLink
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {}
