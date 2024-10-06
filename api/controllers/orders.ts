// All required import
import express from "express";
import asyncHandler from "express-async-handler";
import { getAllHandler, getOneHandler } from "./refactorcrud";
import { IOrder } from "../interfaces/Order";
import Order from "../models/Order";
import Cart from "../models/Cart";
import { IItems } from "../interfaces/Cart";
import Product from "../models/Product";

// | 1.general | 2.private("coll" with general)("doc") | 3.custom | 4.(pre&post&statics&virtuals) |   CRUD

// createOneOrderByUser
export const createOneOrderByUser = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    // 1. find cart for cart.items
    const cart: any = await Cart.findOne({ userId: req.user?._id });
    // 2. add the data at Order.create()
    const taxPrice: number = 100;
    const order: any = await Order.create({
      userId: req.user?._id,
      items: cart.items,
      totalPrice: cart.totalPriceAfterDiscount
        ? cart.totalPriceAfterDiscount
        : cart.totalPrice,
      taxPrice,
      address: req.body.address,
    });
    // 3. use bulkOption to update the quantity and sold at ProductModel for that product because it was deleted from the cart as it was purchased
    const bulkOption = cart.items.map((item: IItems) => ({
      updateOne: {
        filter: { _id: item.productId },
        update: { $inc: { quantity: -item.quantity, sold: item.quantity } },
      },
    }));
    await Product.bulkWrite(bulkOption);
    // 4. delete the cart & res
    await Cart.deleteOne({ userId: req.user?._id });
    res.status(200).json({ data: order });
  }
);
// getAllOrder
export const getAllOrder = getAllHandler<IOrder>(Order, "OrderModel");
// getOneOrder
export const getOneOrder = getOneHandler<IOrder>(Order);
// updateDeliveredOrder
export const updateDeliveredOrder = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const order: any = await Order.findByIdAndUpdate(
      req.params.id,
      {
        isDelivered: true,
        deliverAt: Date.now(),
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Your Order Has Been Delivered", data: order });
  }
);
// updatePaidOrder
export const updatePaidOrder = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const order: any = await Order.findByIdAndUpdate(
      req.params.id,
      {
        isPaid: true,
        paidAt: Date.now(),
      },
      { new: true }
    );
    res.status(200).json({ message: "Your Order Has Been Paid", data: order });
  }
);
