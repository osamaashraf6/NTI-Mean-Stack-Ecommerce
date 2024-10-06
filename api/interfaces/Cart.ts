import { Document } from "mongoose";
import { IUser } from "./User";
import { IProduct } from "./Product";

export interface ICart extends Document {
  userId: IUser;
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
