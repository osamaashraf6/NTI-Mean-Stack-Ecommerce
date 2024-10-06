import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent implements OnInit {
  products: any[] = [];

  ngOnInit() {
    this.products = [
      {
        name: 'Eelectronics Category',
        image:
          'https://cdn.pixabay.com/photo/2024/04/11/16/20/business-8690142_640.jpg',
        description: 'Shop now and get the offer',
      },
      {
        name: 'Women Fashion',
        image:
          'https://cdn.pixabay.com/photo/2021/01/02/17/24/rear-5882411_640.jpg',
        description:
          'Step into elegance with our Chic Floral Midi Dress. Perfect for any occasion, this dress combines timeless style with modern comfort',
      },
      {
        name: 'Labtop Subcategory',
        image:
          'https://media.istockphoto.com/id/1770666963/photo/portrait-of-handsome-caucasian-man-looking-at-laptop-working-online-from-his-home.webp?b=1&s=612x612&w=0&k=20&c=vIFxotHx_tlqtyIPYnZ-RfqFcmBNEnbeLBZd4H3D0DM=',
        description:
          'Experience power and portability like never before with the UltraThin Pro Laptop. Designed for professionals and students',
      },
      // Add more products as needed
    ];
  }
}
