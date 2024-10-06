import mongoose from "mongoose";
import { ICategory } from "./Category";
import { ISubCategory } from "./SubCategory";

export interface IProduct extends mongoose.Document {
  name: string;
  desc: string;
  price: number;
  priceAfterDiscount: number;
  ratingAverage: number;
  ratingCount: number;
  quantity: number;
  sold: number;
  coverimg: string;
  imgs: string[];
  color: string[];
  size: string[];
  tags: string[];
  categoryId: ICategory;
  subcategoryId: ISubCategory;
}
