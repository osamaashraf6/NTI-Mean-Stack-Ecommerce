import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middelwares/SupValidator";

export const createAddressValidator: RequestHandler[] = [
  check("address").notEmpty().withMessage("address required"),
  validatorMiddleware,
];

export const deleteAddressValidator: RequestHandler[] = [
  check("addressId").isMongoId().withMessage("invalid address id"),
  validatorMiddleware,
];
