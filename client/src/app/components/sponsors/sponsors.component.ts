import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-sponsors',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './sponsors.component.html',
  styleUrl: './sponsors.component.scss',
})
export class SponsorsComponent {
  products: any[] = [];

  ngOnInit() {
    this.products = [
      {
        name: 'Kids Fashion',
        image:
          'https://cdn.pixabay.com/photo/2018/11/10/20/13/coca-cola-3807410_1280.jpg',
        description: 'Description 1',
      },
      {
        name: 'Kids Fashion',
        image:
          'https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_640.png',
        description: 'Description 2',
      },
      {
        name: 'Kids Fashion',
        image:
          'https://cdn.pixabay.com/photo/2015/02/02/23/58/sign-621746_640.png',
        description: 'Description 3',
      },
      {
        name: 'Kids Fashion',
        image:
          'https://cdn.pixabay.com/photo/2020/01/09/20/34/bmw-4753868_640.jpg',
        description: 'Description 1',
      },
      {
        name: 'Kids Fashion',
        image:
          'https://cdn.pixabay.com/photo/2013/04/01/10/54/registered-98574_640.png',
        description: 'Description 2',
      },
      {
        name: 'Kids Fashion',
        image:
          'https://cdn.pixabay.com/photo/2015/07/18/13/30/at-850362_640.jpg',
        description: 'Description 3',
      },
      // Add more products as needed
    ];
  }
}
