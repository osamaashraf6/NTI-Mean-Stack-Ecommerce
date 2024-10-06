import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middelwares/SupValidator";
import Coupon from "../../models/Coupon";

// createCouponValidator
export const createCouponValidator: RequestHandler[] = [
  check("name")
    .notEmpty()
    .withMessage("coupon name required")
    .isLength({ min: 2, max: 50 })
    .withMessage("name length must be between 2 & 50")
    .custom(async (val: string) => {
      const coupon = await Coupon.findOne({ name: val });
      if (coupon) {
        throw new Error("coupon is already exist");
      }
      return true;
    }),
  check("discount")
    .notEmpty()
    .withMessage("discount is required")
    .isNumeric()
    .custom((val: number) => {
      if (val <= 0 || val > 100) {
        throw new Error("invalid discount");
      }
      return true;
    }),
  check("expireTime")
    .notEmpty()
    .withMessage("expire time is required")
    .isDate()
    .withMessage("invalid Date"),
  validatorMiddleware,
];
// getCouponValidator
export const getCouponValidator: RequestHandler[] = [
  check("id").isMongoId().withMessage("invalid mongo id"),
  validatorMiddleware,
];
// updateCouponValidator
export const updateCouponValidator: RequestHandler[] = [
  check("id").isMongoId().withMessage("invalid mongo id"),
  check("name")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("name length must be between 2 & 50"),
  check("discount")
    .optional()
    .isNumeric()
    .custom((val: number) => {
      if (val <= 0 || val > 100) {
        throw new Error("invalid discount");
      }
      return true;
    }),
  check("expireTime").optional().isDate().withMessage("invalid Date"),
  validatorMiddleware,
];
// deleteCouponValidator
export const deleteCouponValidator: RequestHandler[] = [
  check("id").isMongoId().withMessage("invalid mongo id"),
  validatorMiddleware,
];
