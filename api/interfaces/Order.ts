import { Document } from "mongoose";
import { IAddress, IUser } from "./User";
import { IItems } from "./Cart";

export interface IOrder extends Document {
  userId: IUser;
  items: IItems;
  totalPrice: number;
  paymentMethod: TPaymentMethod;
  deliverAt: Date | number;
  isDelivered: boolean;
  paidAt: Date | number;
  isPaid: boolean;
  taxPrice: number;
  address: IAddress;
}

type TPaymentMethod = "cash" | "card";
