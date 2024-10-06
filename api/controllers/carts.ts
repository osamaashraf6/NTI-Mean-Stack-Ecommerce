// All required import
import express from "express";
import asyncHandler from "express-async-handler";
import Cart from "../models/Cart";
import ApiError from "../utils/ApiError";
import { ICart, IItems } from "../interfaces/Cart";
import Coupon from "../models/Coupon";
import Product from "../models/Product";
// | 1.general | 2.private("coll" with general)("doc") | 3.custom | 4.(pre&post) |   CRUD

// createOneProductAtCart
export const createOneProductAtCart = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    // 1. check if the incoming productId is existed in the ProductModel
    const product = await Product.findOne({ _id: req.body.productId });
    if (!product) {
      return next(new ApiError(404, "Product Not Found!"));
    }
    // 2. check if the user has cart or not
    let cart: any = await Cart.findOne({ userId: req.user?._id });
    // 3. if not, create one and add the data from req at it
    if (!cart) {
      cart = await Cart.create({
        userId: req.user?._id,
        items: [{ productId: product._id, price: product.price }],
      });
    } else {
      // 4. if has cart, loop through cart.items by {findIndex or filter} to check if the productId exists or not
      const productIndex: number = cart.items.findIndex(
        (item: IItems) =>
          item.productId._id!.toString() === req.body.productId
      );
      if (productIndex > -1) {
        // 5. if exists, increment the quantity of that product
        cart.items[productIndex].quantity += 1;
      } else {
        // 5. if not exists, push the data from req at cart.items
        cart.items.push({ productId: product._id, price: product.price });
      }
    }
    // 5. call the calcTotalPriceAtCart method & the save the cart & res
    calcTotalPriceAtCart(cart);
    await cart.save();
    res.status(200).json({ length: cart.items.length, data: cart });
  }
);
// getUserCart
export const getUserCart = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const taxPrice: number = 100;
    const document = await Cart.findOne({
      userId: req?.user._id,
    });
    if (!document) {
      return next(new ApiError(404, "You Don't Have Cart !"));
    }
    res
      .status(200)
      .json({ length: document.items.length, data: document, taxPrice });
  }
);
// updateOneProductQuantity
export const updateOneProductQuantity = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    // 1. find the cart of that user
    const cart: any = await Cart.findOne({ userId: req.user?._id });
    // 2. if has cart, loop through cart.items by {findIndex or filter} to check if the itemId exists or not
    const productIndex: number = cart.items.findIndex(
      (item: IItems) => item._id!.toString() === req.params.itemId.toString()
    );
    if (productIndex > -1) {
      // 2. if product exist, update the quantity by the data from the req
      cart.items[productIndex].quantity = req.body.quantity;
    } else {
      // 3. if not exist, throw error to APiError
      return next(new ApiError(404, "Product Not Found !"));
    }
    // 4. call the calcTotalPriceAtCart method & the save the cart & res
    calcTotalPriceAtCart(cart);
    await cart.save();
    res.status(200).json({ length: cart.items.length, data: cart });
  }
);
// clearUserCart
export const clearUserCart = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const document = await Cart.findOneAndDelete({ userId: req?.user._id });
    if (!document) {
      return next(new ApiError(404, "You Don't Have Cart !"));
    }
    res.status(200).json("Cart Has Been Cleared !");
  }
);
// deleteOneProductFromCart by $pull as it is like embedded document
export const deleteOneProductFromCart = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const cart: any = await Cart.findOneAndUpdate(
      { userId: req?.user._id },
      {
        $pull: { items: { _id: req.params.itemId } },
      },
      { new: true }
    );
    // 4. call the calcTotalPriceAtCart method & the save the cart & res
    calcTotalPriceAtCart(cart);
    await cart.save();
    res.status(200).json({ length: cart.items.length, data: cart });
  }
);

// applyCouponAtCart
export const applyCouponAtCart = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    // 1. find the incoming coupon & check it
    const coupon = await Coupon.findOne({
      name: req.body.name,
      expireTime: { $gt: Date.now() },
    });
    if (!coupon) {
      return next(new ApiError(404, "Your Coupon Is Invalid Or Not Found !"));
    }
    // 2. if the coupon is valid, find the cart of that user & calc the totalPriceAfterDiscount by totalPrice and coupon.discount
    const cart: any = await Cart.findOne({ userId: req.user._id });
    const totalPrice: number = cart.totalPrice;
    const totalPriceAfterDiscount =
      totalPrice - totalPrice * (coupon.discount / 100);
    cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
    cart.save();
    res.status(200).json({ length: cart.items.length, data: cart });
  }
);
// calcTotalPriceAtCart like Sum
export const calcTotalPriceAtCart = (cart: ICart) => {
  let totalPrice = 0;
  cart.items.forEach((item: IItems) => {
    totalPrice += item.price * item.quantity;
  });
  cart.totalPrice = totalPrice;
  cart.totalPriceAfterDiscount = undefined;
};
