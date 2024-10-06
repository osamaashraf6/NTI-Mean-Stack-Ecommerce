import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middelwares/SupValidator";
import Review from "../../models/Review";

export const createReviewValidator: RequestHandler[] = [
  check("comment")
    .notEmpty()
    .withMessage("Review comment required")
    .isLength({ min: 10, max: 500 })
    .withMessage("invalid comment length"),
  check("rate")
    .notEmpty()
    .withMessage("product rate required")
    .isFloat({ min: 1, max: 5 })
    .withMessage("invalid rate"),
  check("productId")
    .notEmpty()
    .withMessage("product required")
    .isMongoId()
    .withMessage("invalid product id")
    .custom(async (val: string, { req }) => {
      const review = await Review.findOne({
        userId: req.user?._id,
        productId: val,
      });
      if (review) {
        throw new Error("you created review before");
      }
      return true;
    }),
  check("userId")
    .notEmpty()
    .withMessage("user required")
    .isMongoId()
    .withMessage("invalid user id"),

  validatorMiddleware,
];

export const getReviewValidator: RequestHandler[] = [
  check("id").isMongoId().withMessage("invalid mongo id"),
  validatorMiddleware,
];

export const updateReviewValidator: RequestHandler[] = [
  check("id")
    .isMongoId()
    .withMessage("invalid mongo id")
    .custom(async (val: string, { req }) => {
      const review = await Review.findById(val);
      if (review?.userId!._id.toString() !== req.user._id.toString()) {
        throw new Error("you can only update your review");
      }
      return true;
    }),
  check("comment")
    .optional()
    .isLength({ min: 10, max: 500 })
    .withMessage("invalid comment length"),
  check("rate")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("invalid rate"),
  validatorMiddleware,
];

export const deleteReviewValidator: RequestHandler[] = [
  check("id")
    .isMongoId()
    .withMessage("invalid mongo id")
    .custom(async (val: string, { req }) => {
      console.log("User ID from req.user:", req.user._id);
      if (req.user.role === "user") {
        const review = await Review.findById(val);
        console.log("User ID from the review:", review?.userId!._id);
        if (review?.userId!._id!.toString() !== req.user._id.toString()) {
          throw new Error("you can only delete your review");
        }
      }
      return true;
    }),
  validatorMiddleware,
];
