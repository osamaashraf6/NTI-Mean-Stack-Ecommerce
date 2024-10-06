// All required import
import mongoose from "mongoose";
import { IOrder } from "../interfaces/Order";
// Order Schema
const OrderSchema: mongoose.Schema = new mongoose.Schema<IOrder>(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "UserModel" },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductModel",
        },
        price: { type: Number },
        quantity: { type: Number },
      },
    ],
    totalPrice: { type: Number },
    paymentMethod: { type: String, enum: ["cash", "card"], default: "cash" },
    deliverAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    paidAt: { type: Date },
    isPaid: { type: Boolean, default: false },
    taxPrice: { type: Number, default: 0 },
    address: [
      {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String },
      },
    ],
  },
  { timestamps: true }
);
// (pre&post) CRUD
OrderSchema.pre<IOrder>(/^find/, function (next) {
  this.populate({ path: "items.productId", select: "name coverimg" });
  this.populate({ path: "address._id", select: "street"});
  next();
});

export default mongoose.model<IOrder>("OrderModel", OrderSchema);
