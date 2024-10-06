// All required import
import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import ApiError from "../utils/ApiError";

// | 1.general | 2.private("coll" with general)(doc) | 3.custom{like updateuser} | 4.(pre&post) |   CRUD

// createOneFavouriteOfUser
export const createOneAddressOfUser = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const document = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { address: req.body.address } },
      { new: true }
    );
    if (!document) {
      next(new ApiError(404, "Document Not Found !"));
    }
    res
      .status(200)
      .json({ length: document?.address.length, data: document?.address });
  }
);
// getAllAddressOfUser
export const getAllAddressOfUser = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const documents = await User.findById(req?.user._id);
    if (!documents) {
      next(new ApiError(404, "Document Not Found !"));
    }
    res
      .status(200)
      .json({ length: documents?.address.length, data: documents?.address });
  }
);

// getOneAddressOfUser
export const getOneAddressOfUser = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {}
);

// updateOneAddressOfUser
// export const updateOneAddressOfUser = asyncHandler(
//   async (
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction
//   ): Promise<void> => {
//     const documnet = await User.findByIdAndUpdate(req.user?._id, {
//  { $addToSet: { address: { _id: req.params.addressId } } },
//     }, {new: true});
//   }
// );

// deleteOneAddressOfUser
export const deleteOneAddressOfUser = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const document = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { address: { _id: req.params.addressId } } },
      { new: true }
    );
    if (!document) {
      next(new ApiError(404, "Document Not Found !"));
    }
    console.log(req.user._id);
    res.status(200).json(" One Address Has Been Deleted From Your Addresses !");
  }
);
