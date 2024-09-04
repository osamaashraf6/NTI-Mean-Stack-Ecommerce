import asyncHandler from "express-async-handler";
// // All required import
import express from "express";
import { ISubCategory } from "../interfaces/SubCategory";
import SubCategory from "../models/SubCategory";

// createOneHandler
export const createOneHandler = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const subCategory: ISubCategory = await SubCategory.create(req.body);
    res.status(200).json(subCategory);
  }
);
// getAllHandler

export const getAllHandler = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const subCategories: ISubCategory[] = await SubCategory.find();
    res.status(200).json(subCategories);
  }
);
// getOneHandler

export const getOneHandler = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const subCategory = await SubCategory.findById(req.params.id);
    res.status(200).json(subCategory);
  }
);
// updateOneHandler

export const updateOneHandler = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const subCategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(subCategory);
  }
);
// deleteOneHandler

export const deleteOneHandler = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    await SubCategory.findByIdAndDelete(req.params.id);
    res.status(200).json("subCategory has been deleted successfully");
  }
);
