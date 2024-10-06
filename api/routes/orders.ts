// All required import
import express from "express";
import {
  createOneOrderByUser,
  getAllOrder,
  getOneOrder,
  updateDeliveredOrder,
  updatePaidOrder,
} from "../controllers/orders";
import { filterOrders } from "../middelwares/create_privatecrud_setids/Order";
import {
  allowedTo,
  verifyActivity,
  verifyAuthentication,
} from "../middelwares/Authorize";
import {
  createOrderValidator,
  getOrderValidator,
} from "../utils/subvalidators/orders";
// HTTP Method and Endpoint and Permissions
const orderRoute: express.Router = express.Router();
orderRoute.use(verifyAuthentication, verifyActivity);

// General
// Private & Related
// Custom
orderRoute
  .route("/")
  .post(allowedTo("user"), createOrderValidator, createOneOrderByUser)
  .get(allowedTo("manager", "admin"), getAllOrder);
orderRoute
  .route("/getOrderPageByUserHimSelf")
  .get(allowedTo("user"), filterOrders, getAllOrder); 
orderRoute
  .route("/:id")
  .get(allowedTo("manager", "admin"), getOrderValidator, getOneOrder);
orderRoute
  .route("/:id/delivered")
  .put(allowedTo("manager", "admin"), updateDeliveredOrder);
orderRoute
  .route("/:id/paid")
  .put(allowedTo("manager", "admin"), updatePaidOrder);
export default orderRoute;
// !: HTTP Methods & Endpoints For coupons Route for frontend:
// General
// Private & Related
// Custom
