// All required import
import mongoose from "mongoose";
import { ICart } from "../interfaces/Cart";
// Cart Schema
const CartSchema: mongoose.Schema = new mongoose.Schema<ICart>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductModel",
        },
        price: { type: Number },
        quantity: { type: Number, default: 1 },
      },
    ],
    totalPrice: { type: Number },
    totalPriceAfterDiscount: { type: Number },
  },
  { timestamps: true }
);
// (pre&post) CRUD
CartSchema.pre<ICart>(/^find/, function (next) {
  this.populate({ path: "items.productId", select: "name coverimg" });
  next();
});

export default mongoose.model<ICart>("CartModel", CartSchema);
