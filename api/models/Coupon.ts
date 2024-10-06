// All required import
import mongoose from "mongoose";
import { ICoupon } from "../interfaces/Coupon";
// Coupon Schema
const CouponSchema: mongoose.Schema = new mongoose.Schema<ICoupon>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    discount: { type: Number, required: true, min: 1, max: 100 },
    expireTime: { type: Date, required: true },
  },
  { timestamps: true }
);
// (pre&post) CRUD

export default mongoose.model<ICoupon>("CouponModel", CouponSchema);
