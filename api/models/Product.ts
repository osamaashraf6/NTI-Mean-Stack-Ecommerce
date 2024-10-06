// All required import
import mongoose from "mongoose";
import Category from "./Category";
import SubCategory from "./SubCategory";
import { IProduct } from "../interfaces/Product";
// ProductSchema
const ProductSchema: mongoose.Schema = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    desc: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 1, max: 400 },
    priceAfterDiscount: { type: Number },
    ratingAverage: { type: Number },
    ratingCount: { type: Number },
    quantity: { type: Number, required: true, default: 0 },
    sold: { type: Number, required: true, default: 0 },
    coverimg: { type: String },
    imgs: [String],
    color: [String],
    size: [String],
    tags: [String],
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: Category },
    subcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: SubCategory,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
ProductSchema.virtual("reviews", {
  ref: "ReviewModel",
  localField: "_id",
  foreignField: "productId",
});

// (pre&post) CRUD for populate()
ProductSchema.pre<IProduct>(/^find/, function (next) {
  this.populate({ path: "categoryId", select: "name" });
  this.populate({ path: "subcategoryId", select: "name" });
  next();
});
// * (pre&post) CRUD for imgUrl()
// const imageUrl = (document: IProduct) => {
//   if (document.coverimg) {
//     document.coverimg = `${process.env.BASE_URL}/products/${document.coverimg}`;
//   }
//   if (document.imgs) {
//     document.imgs = document.imgs.map(
//       (img) => `${process.env.BASE_URL}/products/${img}`
//     );
//   }
// };

// ProductSchema.post<IProduct>("init", (document: IProduct) => {
//   imageUrl(document);
// });
// ProductSchema.post<IProduct>("save", (document: IProduct) => {
//   imageUrl(document);
// });
export default mongoose.model<IProduct>("ProductModel", ProductSchema);
