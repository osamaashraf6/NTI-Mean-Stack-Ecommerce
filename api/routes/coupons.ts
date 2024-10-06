// All required import
import express from "express";
import {
  createOneCoupon,
  deleteOneCoupon,
  getAllCoupons,
  getOneCoupon,
  updateOneCoupon,
} from "../controllers/coupons";
import {
  allowedTo,
  verifyActivity,
  verifyAuthentication,
} from "../middelwares/Authorize";
import {
  createCouponValidator,
  deleteCouponValidator,
  getCouponValidator,
  updateCouponValidator,
} from "../utils/subvalidators/coupons";

// HTTP method and Endpoint and Permissions

const couponRoute: express.Router = express.Router();
couponRoute.use(verifyAuthentication, verifyActivity, allowedTo("manager", "admin"));

couponRoute
  .route("/")
  .get(getAllCoupons)
  .post(createCouponValidator, createOneCoupon);
couponRoute
  .route("/:id")
  .get(getCouponValidator, getOneCoupon)
  .put(updateCouponValidator, updateOneCoupon)
  .delete(deleteCouponValidator, deleteOneCoupon);

export default couponRoute;

// !: HTTP Methods & Endpoints For coupons Route for frontend:
// General

// => {HTTP Method: "POST", Endpoint: "http://localhost:5000/api/v1/coupons/", Title: "create One Coupon"}
// => {HTTP Method: "GET", Endpoint: "http://localhost:5000/api/v1/coupons/", Title: "get All Coupon"}
// => {HTTP Method: "GET", Endpoint: "http://localhost:5000/api/v1/coupons/:id", Title: "get One Coupon"}
// => {HTTP Method: "PUT", Endpoint: "http://localhost:5000/api/v1/coupons/:id", Title: "update One Coupon"}
// => {HTTP Method: "DELETE", Endpoint: "http://localhost:5000/api/v1/coupons/:id", Title: "delete One Coupon"}
