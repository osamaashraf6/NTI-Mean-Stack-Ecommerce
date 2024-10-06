import { Document } from "mongoose";
import { IProduct } from "./Product";

// TODO: Famous types used in interface: (  number, boolean, string, undefined, Date | number,
// TCustomType, IExportedInterface,
// userId: IUser,
// string[], number[], {}[] => {but this object make it below using interface and assign it here to be IAddress[]  or take it from another interface like IProduct[]},  )

// TODO: Famous types used in Schema: (  Number, Boolean, String, Date, address: [{...}], String & enum: ["", ""], userId: {type: Schema.Types}  )
// !   : Related properties: for type: String=> {required: true, trim: true, default: ""}  || for type: Number => {required: true, min: 1, max: 100, default: 5}
export interface IUser extends Document {
  name: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  address: IAddress[];
  profileImg: string;
  active: boolean;
  role: TRole;
  resetCode: string | undefined;
  resetCodeVerify: boolean | undefined;
  resetCodeExpireTime: Date | number | undefined;
  passwordChangedAt: Date | number;
  wishlist: IProduct[];
}
type TRole = "manager" | "admin" | "user";
export interface IAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
}
