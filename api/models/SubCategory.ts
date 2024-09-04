// All required import
import mongoose, { Schema } from "mongoose";
import { ISubCategory } from "../interfaces/SubCategory";
// SubCategory Schema
const SubCategorySchema = new mongoose.Schema<ISubCategory>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    img: { type: String },
    category: { type: Schema.ObjectId, ref: "CategoryModel" },
  },
  { timestamps: true }
);

export default mongoose.model<ISubCategory>("SubCategoryModel", SubCategorySchema);
