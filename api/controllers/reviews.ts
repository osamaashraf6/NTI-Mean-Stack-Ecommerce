// All required import
import { IReview } from "../interfaces/Review";
import Review from "../models/Review";
import {
  createOneHandler,
  deleteOneHandler,
  getAllHandler,
  getOneHandler,
  updateOneHandler,
} from "./refactorcrud";

// general | custom CRUD

// createOneReview
export const createOneReview = createOneHandler<IReview>(Review);
// getAllReview
export const getAllReview = getAllHandler<IReview>(Review, "ReviewModel");
// getOneReview
export const getOneReview = getOneHandler<IReview>(Review);
// updateOneReview
export const updateOneReview = updateOneHandler<IReview>(Review);
// deleteOneReview
export const deleteOneReview = deleteOneHandler<IReview>(Review);
