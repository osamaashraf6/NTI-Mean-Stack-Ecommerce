// // All required import
import express from "express";
import asyncHandler from "express-async-handler";
import { ICategory } from "../interfaces/Category";
import Category from "../models/Category";

// createOneHandler
export const createOneHandler = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const category: ICategory = await Category.create(req.body);
    res.status(200).json(category);
  }
);

// getAllHandler
export const getAllHandler = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const categories: ICategory[] = await Category.find();
    res.status(200).json(categories);
  }
);

// getOneHandler
export const getOneHandler = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  }
);

// updateOneHandler
export const updateOneHandler = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(category);
  }
);

// deleteOneHandler
export const deleteOneHandler = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json("Category has been deleted successfully");
  }
);
