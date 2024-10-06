import { Document } from "mongoose";
import { IUser } from "./User";
import { IProduct } from "./Product";

export interface IReview extends Document {
  userId: IUser;
  productId: IProduct;
  comment: string;
  rate: number;
}
