// All required import
import mongoose from "mongoose";
import { ICategory } from "../interfaces/Category";
// Category Schema
const CategorySchema: mongoose.Schema = new mongoose.Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    img: { type: String },
  },
  { timestamps: true }
);
export default mongoose.model<ICategory>("CategoryModel", CategorySchema);
