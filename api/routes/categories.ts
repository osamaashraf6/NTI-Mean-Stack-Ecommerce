// All required import
import { Router } from "express";
import {
  createOneHandler,
  getAllHandler,
  getOneHandler,
  updateOneHandler,
  deleteOneHandler,
} from "../controllers/categories";
// HTTP method and Endpoint and Permissions
const categoryRoute: Router = Router();

categoryRoute.route("/").post(createOneHandler).get(getAllHandler);

categoryRoute
  .route("/:id")
  .get(getOneHandler)
  .put(updateOneHandler)
  .delete(deleteOneHandler);

export default categoryRoute;
