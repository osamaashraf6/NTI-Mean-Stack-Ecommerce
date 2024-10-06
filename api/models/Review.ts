// All required import
import mongoose from "mongoose";
import { IReview } from "../interfaces/Review";
import Product from "./Product";
// Review Schema
const ReviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "ProductModel" },
    comment: { type: String, trim: true },
    rate: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);
// (pre&post) CRUD
ReviewSchema.pre<IReview>(/^find/, function (next) {
  this.populate({ path: "userId", select: "name profileImg" });
  next();
});
ReviewSchema.pre<IReview>("find", function (next) {
  this.populate({ path: "productId", select: "name img" });
  next();
});

ReviewSchema.statics.calcRatingAndQuantity = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: "product",
        avgRating: { $avg: "$rate" },
        ratingQuantity: { $sum: 1 },
      },
    },
  ]);

  if (result.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingAverage: result[0].avgRating,
      ratingCount: result[0].ratingQuantity,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingAverage: 0,
      ratingCount: 0,
    });
  }
};

ReviewSchema.post<IReview>("save", async function () {
  await (this.constructor as any).calcRatingAndQuantity(this.productId);
});
// ReviewSchema.post<IReview>("findOneAndDelete", async function () {
//   await (this.constructor as any).calcRatingAndQuantity(this.productId);
// });

export default mongoose.model("ReviewModel", ReviewSchema);
