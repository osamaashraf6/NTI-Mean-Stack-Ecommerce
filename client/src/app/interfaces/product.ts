export interface IProduct {
  _id: string;
  name?: string;
  desc?: string;
  price?: number;
  priceAfterDiscount?: number;
  ratingAverage?: number;
  ratingCount?: number;
  quantity?: number;
  sold?: number;
  coverimg?: string;
  imgs?: string[];
  categoryId?: any;
  subcategoryId?: any;
}
