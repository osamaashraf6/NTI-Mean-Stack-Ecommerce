// All required import
import { Router } from "express";
import {
  createOneHandler,
  getAllHandler,
  getOneHandler,
  updateOneHandler,
  deleteOneHandler,
} from "../controllers/subcategories";
// HTTP method and Endpoint and Permissions
const subCategoryRoute: Router = Router();

subCategoryRoute.route("/").post(createOneHandler).get(getAllHandler);

subCategoryRoute
  .route("/:id")
  .get(getOneHandler)
  .put(updateOneHandler)
  .delete(deleteOneHandler);

export default subCategoryRoute;
