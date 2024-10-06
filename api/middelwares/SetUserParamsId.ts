// All required import
import express from "express";
// SetUserParamsId Middleware
export const setUserParamsId = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.user._id) {
    req.params._id = req.user._id.toString();
  }
  next();
};
