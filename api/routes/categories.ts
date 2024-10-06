// All required import
import { Router } from "express";
import {
  createOneCategory,
  getAllCategory,
  getOneCategory,
  updateOneCategory,
  deleteOneCategory,
} from "../controllers/categories";
import {
  createOneCategoryValidator,
  deleteOneCategoryValidator,
  getOneCategoryValidator,
  updateOneCategoryValidator,
} from "../utils/subvalidators/categories";
import {
  uploadCategoryFile,
  editFileWithBuffer,
} from "../utils/subuploadfiles/categories";
import subCategoryRoute from "./subcategories";
import {
  allowedTo,
  verifyActivity,
  verifyAuthentication,
} from "../middelwares/Authorize";
// HTTP method and Endpoint and Permissions
const categoryRoute: Router = Router();
categoryRoute.use("/:categoryId/subcategories", subCategoryRoute);
categoryRoute
  .route("/")
  .post(
    verifyAuthentication,
    verifyActivity,
    allowedTo("manager", "admin"),
    uploadCategoryFile,
    editFileWithBuffer,
    createOneCategoryValidator,
    createOneCategory
  )
  .get(getAllCategory);

categoryRoute
  .route("/:id")
  .get(getOneCategoryValidator, getOneCategory)
  .put(
    verifyAuthentication,
    verifyActivity,
    allowedTo("manager", "admin"),
    updateOneCategoryValidator,
    updateOneCategory
  )
  .delete(
    verifyAuthentication,
    verifyActivity,
    allowedTo("manager", "admin"),
    deleteOneCategoryValidator,
    deleteOneCategory
  );

export default categoryRoute;

// !: HTTP Methods & Endpoints For categories Route for frontend:
// General

// => {HTTP Method: "POST", Endpoint: "http://localhost:5000/api/v1/categories/", Title: "create One Category"}
// => {HTTP Method: "GET", Endpoint: "http://localhost:5000/api/v1/categories/", Title: "get All Category"}
// => {HTTP Method: "GET", Endpoint: "http://localhost:5000/api/v1/categories/:id", Title: "get One Category"}
// => {HTTP Method: "PUT", Endpoint: "http://localhost:5000/api/v1/categories/:id", Title: "update One Category"}
// => {HTTP Method: "DELETE", Endpoint: "http://localhost:5000/api/v1/categories/:id", Title: "delete One Category"}
