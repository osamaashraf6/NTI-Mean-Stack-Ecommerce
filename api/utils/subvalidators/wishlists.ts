import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middelwares/SupValidator";
import Product from "../../models/Product";

export const addToWishlistValidator: RequestHandler[] = [
  check("productId")
    .isMongoId()
    .withMessage("invalid product id")
    .custom(async (val: string) => {
      const product = await Product.findById(val);
      if (!product) {
        throw new Error("Product Not Found");
      }
      return true;
    }),
  validatorMiddleware,
];

export const removeFromWishlistValidator: RequestHandler[] = [
  check("productId").isMongoId().withMessage("invalid product id"),
  validatorMiddleware,
];
