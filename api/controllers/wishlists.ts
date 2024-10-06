// All required import
import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import ApiError from "../utils/ApiError";

// | 1.general | 2.private("coll" with general)(doc) | 3.custom{like updateuser} | 4.(pre&post) |   CRUD

// createOneFavouriteOfUser
export const createOneFavouriteOfUser = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const document = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { wishlist: req.body.productId } },
      { new: true }
    );
    if (!document) {
      next(new ApiError(404, "Document Not Found !"));
    }
    res
      .status(200)
      .json({ length: document?.wishlist.length, data: document?.wishlist });
  }
);
// getAllFavouriteOfUser
export const getAllFavouriteOfUser = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const documents = await User.findById(req?.user._id).populate("wishlist");
    if (!documents) {
      next(new ApiError(404, "Document Not Found !"));
    }
    res
      .status(200)
      .json({ length: documents?.wishlist.length, data: documents?.wishlist });
  }
);

// getOneFavouriteOfUser
export const getOneFavouriteOfUser = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {}
);

// updateOneFavouriteOfUser
export const updateOneFavouriteOfUser = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {}
);

// deleteOneFavouriteOfUser
export const deleteOneFavouriteOfUser = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const document = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { wishlist: req.params.productId } },
      { new: true }
    );
    if (!document) {
      next(new ApiError(404, "Document Not Found !"));
    }
    res.status(200).json("Product Has Been Deleted From Your Favourite !");
  }
);
