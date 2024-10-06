// All required import
import express from "express";
import asyncHandler from "express-async-handler";

// SetCategoryId
export const SetCategoryId = asyncHandler(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.body.categoryId) {
      req.body.categoryId = req.params.categoryId;
    }
    next();
  }
);
