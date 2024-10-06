// All required import
import express from "express";
// SetUserIdProductId
export const setUserIdProductId = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!req.body.userId) {
    req.body.userId = req.user?._id;
  }
  if (!req.body.productId) {
    req.body.productId = req.params.productId;
  }
  next();
};

// FilterReviews
export const filterReviews = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  let filterData: any = {};
  if (req.params.productId) {
    filterData.productId = req.params.productId;
  }
  if (req.user?._id && !req.params.productId) {
    filterData.userId = req.user._id;
  }
  req.filterData = filterData;
  next();
};
