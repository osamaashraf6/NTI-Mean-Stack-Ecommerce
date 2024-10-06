// All required import

import { check } from "express-validator";
import validatorMiddleware from "../../middelwares/SupValidator";
import express from "express";
import Category from "../../models/Category";
import SubCategory from "../../models/SubCategory";
import { ISubCategory } from "../../interfaces/SubCategory";

// createOneCategoryValidator
export const createOneCategoryValidator: express.RequestHandler[] = [
  check("name")
    .notEmpty()
    .withMessage("Category Name Is Required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Category Name Must Be Between 3 And 50 Characters")
    .custom(async (val) => {
      const document = await Category.findOne({ name: val });
      if (document) {
        throw new Error("Category Name Already Existed");
      }
      return true;
    }),
  validatorMiddleware,
];
// getOneCategoryValidator
export const getOneCategoryValidator: express.RequestHandler[] = [
  check("id").isMongoId().withMessage("Invalid Mongo Id"),
  validatorMiddleware,
];
// updateOneCategoryValidator
export const updateOneCategoryValidator: express.RequestHandler[] = [
  check("id").isMongoId().withMessage("Invalid Mongo Id"),
  check("name")
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage("Category Name Must Be Between 3 And 50 Characters"),
  validatorMiddleware,
];
// deleteOneCategoryValidator
export const deleteOneCategoryValidator: express.RequestHandler[] = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Mongo Id")
    .custom(async (val: string) => {
      const documents: ISubCategory[] = await SubCategory.find({
        categoryId: val,
      });
      if (documents.length > 0) {
        const bulkOption = documents.map((document: ISubCategory) => ({
          deleteOne: { filter: { _id: document._id } },
        }));
        await SubCategory.bulkWrite(bulkOption);
      }
      return true;
    }),
  validatorMiddleware,
];
