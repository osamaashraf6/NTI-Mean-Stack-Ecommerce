import { Component } from '@angular/core';
import { LandingComponent } from '../../components/landing/landing.component';
import { ServicesComponent } from '../../components/services/services.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { BestSellersComponent } from '../../components/best-sellers/best-sellers.component';
import { OffersComponent } from '../../components/offers/offers.component';
import { RecentProductsComponent } from '../../components/recent-products/recent-products.component';
import { SponsorsComponent } from '../../components/sponsors/sponsors.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LandingComponent,
    ServicesComponent,
    CategoriesComponent,
    BestSellersComponent,
    OffersComponent,
    RecentProductsComponent,
    SponsorsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
