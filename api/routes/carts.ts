// All required import
import express from "express";
import {
  applyCouponAtCart,
  clearUserCart,
  createOneProductAtCart,
  deleteOneProductFromCart,
  getUserCart,
  updateOneProductQuantity,
} from "../controllers/carts";
import {
  allowedTo,
  verifyActivity,
  verifyAuthentication,
} from "../middelwares/Authorize";
import {
  addProductToCartValidator,
  removeProductFromCartValidator,
  updateProductQuantityValidator,
} from "../utils/subvalidators/carts";
// HTTP Method and Endpoint and Permissions
const cartRoute: express.Router = express.Router();
cartRoute.use(verifyAuthentication, verifyActivity, allowedTo("user"));

// 1.General
// 2.Private
// 3.Custom
cartRoute
  .route("/")
  .post(addProductToCartValidator, createOneProductAtCart)
  .get(getUserCart)
  .delete(clearUserCart);
cartRoute.route("/applyCoupon").put(applyCouponAtCart);
cartRoute
  .route("/:itemId")
  .put(updateProductQuantityValidator, updateOneProductQuantity)
  .delete(removeProductFromCartValidator, deleteOneProductFromCart);

export default cartRoute;
// !: HTTP Methods & Endpoints For categories Route for frontend:

// 1.General
// 2.Private Or Related
// 3.Custom
