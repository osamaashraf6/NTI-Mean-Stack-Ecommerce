// All required import
import express from "express";

// SetUserId
export const SetUserId = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.user._id) {
    req.params.id = req.user._id.toString();
  }

  next();
};

// getAll => FilterData
// getOne => SetIds
// deleteOne => SetIds