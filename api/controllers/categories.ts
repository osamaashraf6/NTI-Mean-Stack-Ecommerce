// // All required import
import { ICategory } from "../interfaces/Category";
import Category from "../models/Category";
import {
  createOneHandler,
  deleteOneHandler,
  getAllHandler,
  getOneHandler,
  updateOneHandler,
} from "./refactorcrud";

// createOneHandler
export const createOneCategory = createOneHandler<ICategory>(Category);
// getAllHandler
export const getAllCategory = getAllHandler<ICategory>(Category, "CategoryModel");

// getOneHandler
export const getOneCategory = getOneHandler<ICategory>(Category);

// updateOneHandler
export const updateOneCategory = updateOneHandler<ICategory>(Category);

// deleteOneHandler
export const deleteOneCategory = deleteOneHandler(Category);

// // createOneHandler
// export const createOneHandler = asyncHandler(
//   async (req: express.Request, res: express.Response) => {
//     const category: ICategory = await Category.create(req.body);
//     res.status(200).json(category);
//   }
// );

// // getAllHandler
// export const getAllHandler = asyncHandler(
//   async (req: express.Request, res: express.Response) => {
//     const categories: ICategory[] = await Category.find();
//     res.status(200).json(categories);
//   }
// );

// // getOneHandler
// export const getOneHandler = asyncHandler(
//   async (req: express.Request, res: express.Response) => {
//     const category: ICategory | null = await Category.findById(req.params.id);
//     res.status(200).json(category);
//   }
// );

// // updateOneHandler
// export const updateOneHandler = asyncHandler(
//   async (req: express.Request, res: express.Response) => {
//     const category: ICategory | null = await Category.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );
//     res.status(200).json(category);
//   }
// );

// // deleteOneHandler
// export const deleteOneHandler = asyncHandler(
//   async (req: express.Request, res: express.Response) => {
//     await Category.findByIdAndDelete(req.params.id);
//     res.status(200).json("Category has been deleted successfully");
//   }
// );
