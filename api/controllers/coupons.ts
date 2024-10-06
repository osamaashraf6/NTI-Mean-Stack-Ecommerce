// All required import
import { ICoupon } from "../interfaces/Coupon";
import Coupon from "../models/Coupon";
import {
  createOneHandler,
  deleteOneHandler,
  getAllHandler,
  getOneHandler,
  updateOneHandler,
} from "./refactorcrud";

// createOneCoupon
export const createOneCoupon = createOneHandler<ICoupon>(Coupon);
// getAllCoupons
export const getAllCoupons = getAllHandler<ICoupon>(Coupon, "CouponModel");

// getOneCoupon
export const getOneCoupon = getOneHandler<ICoupon>(Coupon);

// updateOneCoupon
export const updateOneCoupon = updateOneHandler<ICoupon>(Coupon);

// deleteOneCoupon
export const deleteOneCoupon = deleteOneHandler<ICoupon>(Coupon);
