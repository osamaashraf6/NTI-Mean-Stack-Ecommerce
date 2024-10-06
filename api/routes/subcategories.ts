// All required import
import { Router } from "express";
import {
  createOneSubCategory,
  getAllSubCategory,
  getOneSubCategory,
  updateOneSubCategory,
  deleteOneSubCategory,
  filterSubCategory,
} from "../controllers/subcategories";
import {
  createOneSubCategoryValidator,
  deleteOneSubCategoryValidator,
  getOneSubCategoryValidator,
  updateOneSubCategoryValidator,
} from "../utils/subvalidators/subcategories";
import { SetCategoryId } from "../middelwares/create_privatecrud_setids/SubCategory";
import {
  allowedTo,
  verifyActivity,
  verifyAuthentication,
} from "../middelwares/Authorize";
import productRoute from "./products";
// HTTP method and Endpoint and Permissions //General then //Related (By private CRUD:@second"firstway=>if use this you will need to custom route and controller", "secondway=>you will benefit from //General{mergeParams, setIds for createOne, filterData for getAll}")
const subCategoryRoute: Router = Router({ mergeParams: true });

subCategoryRoute
  .route("/")
  .post(
    verifyAuthentication,
    verifyActivity,
    allowedTo("manager", "admin"),
    createOneSubCategoryValidator,
    SetCategoryId,
    createOneSubCategory
  )
  .get(filterSubCategory, getAllSubCategory);

subCategoryRoute
  .route("/:id")
  .get(getOneSubCategoryValidator, getOneSubCategory)
  .put(
    verifyAuthentication,
    verifyActivity,
    allowedTo("manager", "admin"),
    updateOneSubCategoryValidator,
    updateOneSubCategory
  )
  .delete(
    verifyAuthentication,
    verifyActivity,
    allowedTo("manager", "admin"),
    deleteOneSubCategoryValidator,
    deleteOneSubCategory
  );

export default subCategoryRoute;

// !: HTTP Methods & Endpoints For categories Route for frontend:
// General

// => {HTTP Method: "POST", Endpoint: "http://localhost:5000/api/v1/subcategories/", Title: "create One SubCategory"}
// => {HTTP Method: "GET", Endpoint: "http://localhost:5000/api/v1/subcategories/", Title: "get All SubCategory"}
// => {HTTP Method: "GET", Endpoint: "http://localhost:5000/api/v1/subcategories/:id", Title: "get One SubCategory"}
// => {HTTP Method: "PUT", Endpoint: "http://localhost:5000/api/v1/subcategories/:id", Title: "update One SubCategory"}
// => {HTTP Method: "DELETE", Endpoint: "http://localhost:5000/api/v1/subcategories/:id", Title: "delete One SubCategory"}

// Private or Related

// => {HTTP Method: "POST", Endpoint: "http://localhost:5000/api/v1/categories/:categoryId/subcategories/", Title: "create One SubCategory Of Category"}
// => {HTTP Method: "GET", Endpoint: "http://localhost:5000/api/v1/categories/:categoryId/subcategories/", Title: "get All SubCategory Of Category"}
// => {HTTP Method: "GET", Endpoint:"http://localhost:5000/api/v1/categories/:categoryId/subcategories/:id", Title: "get One SubCategory Of Category"}
// => {HTTP Method: "PUT", Endpoint: "http://localhost:5000/api/v1/categories/:categoryId/subcategories/:id", Title: "update One SubCategory Of Category"}
// => {HTTP Method: "DELETE", Endpoint: "http://localhost:5000/api/v1/categories/:categoryId/subcategories/:id", Title: "delete One SubCategory Of Category"}
