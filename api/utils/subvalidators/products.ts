// All required import

import { check } from "express-validator";
import validatorMiddleware from "../../middelwares/SupValidator";
import express from "express";
import Product from "../../models/Product";

// createOneProductValidator
export const createOneProductValidator: express.RequestHandler[] = [
  check("name")
    .notEmpty()
    .withMessage("Product Name Is Required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Product Name Must Be Between 3 And 50 Characters")
    .custom(async (val) => {
      const document = await Product.findOne({ name: val });
      if (document) {
        throw new Error("Product Name Already Existed");
      }
      return true;
    }),
  validatorMiddleware,
];
// getOneProductValidator
export const getOneProductValidator: express.RequestHandler[] = [
  check("id").isMongoId().withMessage("Invalid Mongo Id"),
  validatorMiddleware,
];
// updateOneProductValidator
export const updateOneProductValidator: express.RequestHandler[] = [
  check("id").isMongoId().withMessage("Invalid Mongo Id"),
  check("name")
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage("Category Name Must Be Between 3 And 50 Characters"),
  validatorMiddleware,
];
// deleteOneProductValidator
export const deleteOneProductValidator: express.RequestHandler[] = [
  check("id").isMongoId().withMessage("Invalid Mongo Id"),
  validatorMiddleware,
];
