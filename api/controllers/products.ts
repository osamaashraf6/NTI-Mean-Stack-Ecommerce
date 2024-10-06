// All required import
import asyncHandler from "express-async-handler";
import express from "express";
//
import { IProduct } from "../interfaces/Product";
import Product from "../models/Product";
import {
  createOneHandler,
  deleteOneHandler,
  getAllHandler,
  getOneHandler,
  updateOneHandler,
} from "./refactorcrud";

// createOneProduct
export const createOneProduct = createOneHandler<IProduct>(Product);
// getAllProdcuts
export const getAllProdcuts = getAllHandler<IProduct>(Product, "ProductModel");

// getOneProduct
export const getOneProduct = getOneHandler<IProduct>(Product, "reviews");

// updateOneProduct
export const updateOneProduct = updateOneHandler<IProduct>(Product);

// deleteOneProduct
export const deleteOneProduct = deleteOneHandler<IProduct>(Product);
// test All products
export const getAllTest = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const documents: any = await Product.find({ color: "purple" });
    res.status(200).json(documents);
  }
);
