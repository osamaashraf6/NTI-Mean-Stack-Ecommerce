import { Document } from "mongoose";

export interface ICoupon extends Document {
  name: string;
  discount: number;
  expireTime: Date;
}
