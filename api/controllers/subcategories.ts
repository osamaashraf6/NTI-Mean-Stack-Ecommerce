// All required import
import express from "express";
// import asyncHandler from "express-async-handler";
import { ISubCategory } from "../interfaces/SubCategory";
import SubCategory from "../models/SubCategory";
import {
  createOneHandler,
  deleteOneHandler,
  getAllHandler,
  getOneHandler,
  updateOneHandler,
} from "./refactorcrud";
import { IFilterData } from "../interfaces/FilterData";

// createOneSubCategory
export const createOneSubCategory = createOneHandler<ISubCategory>(SubCategory);
// getAllSubCategory

export const getAllSubCategory = getAllHandler<ISubCategory>(
  SubCategory,
  "SUbCategoryModel"
);

// getOneSubCategory

export const getOneSubCategory = getOneHandler<ISubCategory>(SubCategory);

// updateOneSubCategory

export const updateOneSubCategory = updateOneHandler<ISubCategory>(SubCategory);

// deleteOneSubCategory

export const deleteOneSubCategory = deleteOneHandler(SubCategory);

// filterSubCategory by filterData
export const filterSubCategory = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  let filterData: IFilterData = {};
  if (req.params.categoryId) {
    filterData.categoryId = req.params.categoryId;
  }
  req.filterData = filterData;
  next();
};

// export const getAllSubCategoryOfCategoryId = asyncHandler(
//   async (
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction
//   ) => {
//     const document: ISubCategory[] = await SubCategory.find({
//       categoryId: req.params.categoryId,
//     }).populate({ path: "categoryId", select: "name" });
//     if (!document) {
//       return next(new ApiError(404, "Document Not Found!"));
//     }
//     res.status(200).json(document);
//   }
// );
