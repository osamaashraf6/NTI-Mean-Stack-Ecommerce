import { IProduct } from './product';

export interface ICart {
  _id: string;
  userId: string;
  items: IItems[];
  totalPrice: number;
  totalPriceAfterDiscount: number | undefined;
}

export interface IItems {
  productId: IProduct;
  price: number;
  quantity: number;
  _id?: string;
}
