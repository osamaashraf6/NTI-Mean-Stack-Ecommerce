// All required import
import mongoose from "mongoose";
import { IUser } from "../interfaces/User";
import bcrypt from "bcryptjs";
import Product from "./Product";

// UserSchema
const UserSchema: mongoose.Schema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    phone: { type: String },
    address: [
      {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        postalCode: { type: String, trim: true },
      },
    ],
    profileImg: { type: String },

    active: { type: Boolean, default: true },
    role: { type: String, enum: ["manager, admin", "user"], default: "user" },
    resetCode: { type: String },
    resetCodeVerify: { type: Boolean },
    resetCodeExpireTime: { type: Date },
    passwordChangedAt: { type: Date },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductModel" }],
  },
  { timestamps: true }
);

// (pre&post) CRUD
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 13);
  next();
});
export default mongoose.model<IUser>("UserModel", UserSchema);
