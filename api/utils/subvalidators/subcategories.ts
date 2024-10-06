// All required import

import { check } from "express-validator";
import validatorMiddleware from "../../middelwares/SupValidator";
import express from "express";
import SubCategory from "../../models/SubCategory";
import Category from "../../models/Category";
import Product from "../../models/Product";
import { IProduct } from "../../interfaces/Product";

// createOneSubCategoryValidator
export const createOneSubCategoryValidator: express.RequestHandler[] = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory Name Is Required")
    .isLength({ min: 3, max: 50 })
    .withMessage("SubCategory Name Must Be Between 3 And 50 Characters")
    .custom(async (val) => {
      const document = await SubCategory.findOne({ name: val });
      if (document) {
        throw new Error("SubCategory Name Already Existed");
      }
      return true;
    }),
  check("categoryId")
    .notEmpty()
    .withMessage("Category Id Is Required")
    .isMongoId()
    .withMessage("Invalid Mongo Id")
    .custom(async (val: string) => {
      const document = await Category.findById(val);
      if (!document) {
        throw new Error("Invalid Category Id");
      }
    }),
  validatorMiddleware,
];
// getOneSubCategoryValidator
export const getOneSubCategoryValidator: express.RequestHandler[] = [
  check("id").isMongoId().withMessage("Invalid Mongo Id"),
  validatorMiddleware,
];
// updateOneSubCategoryValidator
export const updateOneSubCategoryValidator: express.RequestHandler[] = [
  check("id").isMongoId().withMessage("Invalid Mongo Id"),
  check("name")
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage("SubCategory Name Must Be Between 3 And 50 Characters"),
  check("categoryId").isMongoId().withMessage("Invalid Mongo Id"),
  validatorMiddleware,
];
// deleteOneSubCategoryValidator
export const deleteOneSubCategoryValidator: express.RequestHandler[] = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Mongo Id")
    .custom(async (val: string) => {
      const documents: IProduct[] = await Product.find({ subcategoryId: val });
      if (documents.length > 0) {
        const bulkOption = documents.map((document: IProduct) => ({
          deleteOne: { filter: { _id: document._id } },
        }));
        await Product.bulkWrite(bulkOption);
      }
      return true;
    }),
  validatorMiddleware,
];
