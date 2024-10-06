// All required import
import express from "express";
// FilterOrders
export const filterOrders = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  let filterData: any = {};
  if (req.user?._id && req.user?.role === "user") {
    filterData.userId = req.user._id;
  }
  req.filterData = filterData;
  next();
};
