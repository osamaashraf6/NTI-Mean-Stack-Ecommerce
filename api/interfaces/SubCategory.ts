import { Document } from "mongoose";
import { ICategory } from "./Category";

export interface ISubCategory extends Document {
  name: string;
  img: string;
  category: ICategory;
}
