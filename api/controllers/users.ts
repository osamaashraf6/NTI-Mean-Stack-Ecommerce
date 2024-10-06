// All required import
import express from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { IUser } from "../interfaces/User";
import User from "../models/User";
import {
  createOneHandler,
  deleteOneHandler,
  getAllHandler,
  getOneHandler,
} from "./refactorcrud";
import { CreateSignToken } from "../utils/Token";

// createOneUser
export const createOneUser = createOneHandler<IUser>(User);

// getAllUser
export const getAllUser = getAllHandler<IUser>(User, "UserModel");

// getOneUser
export const getOneUser = getOneHandler<IUser>(User);

// deleteOneUser
export const deleteOneUser = deleteOneHandler<IUser>(User);

// TODO: Manager
// updateUsersProfileByManagerOnly
export const updateUsersProfileByManagerOnly = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const document = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        phone: req.body.phone,
        profileImg: req.body.profileImg,
        active: req.body.active,
        role: req.body.role,
      },
      { new: true }
    );
    res.status(200).json({ data: document });
  }
);
// changeUsersPasswordByManagerOnly
export const changeUsersPasswordByManagerOnly = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    await User.findByIdAndUpdate(
      req.params.id,
      {
        password: await bcrypt.hash(req.body.password, 13),
        passwordChangedAt: Date.now(),
      },
      { new: true }
    );
    res.status(200).json({ message: "Password Has Been Changed By Manager !" });
  }
);

// TODO: User
// updateUserProfileByUserHimSelf
export const updateUserProfileByUserHimSelf = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const document = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name,
        phone: req.body.phone,
        profileImg: req.body.profileImg,
      },
      { new: true }
    );
    res.status(200).json({ data: document });
  }
);
// changeUserPasswordByUserHimSelf
export const changeUserPasswordByUserHimSelf = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const document = await User.findByIdAndUpdate(
      req.user._id,
      {
        password: await bcrypt.hash(req.body.password, 13),
        passwordChangedAt: Date.now(),
      },
      { new: true }
    );
    const token = CreateSignToken(document?._id, document?.role!);
    res
      .status(200)
      .json({ token, message: "Password Has Been Changed By User !" });
  }
);
