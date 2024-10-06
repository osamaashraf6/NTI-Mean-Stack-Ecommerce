// All required import
import mongoose, { Schema } from "mongoose";
import { ISubCategory } from "../interfaces/SubCategory";
// SubCategory Schema
const SubCategorySchema: mongoose.Schema = new mongoose.Schema<ISubCategory>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    img: { type: String },
    categoryId: { type: mongoose.Schema.ObjectId, ref: "CategoryModel" },
  },
  { timestamps: true }
);

SubCategorySchema.pre<ISubCategory>(/^find/, function (next) {
  this.populate({ path: "categoryId", select: "name img" });
  next();
});

export default mongoose.model<ISubCategory>(
  "SubCategoryModel",
  SubCategorySchema
);
