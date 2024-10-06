// import { updateOneAddressOfUser } from './../controllers/addresses';
// All required import
import express from "express";
import {
  createOneAddressOfUser,
  deleteOneAddressOfUser,
  getAllAddressOfUser,
} from "../controllers/addresses";
import {
  allowedTo,
  verifyActivity,
  verifyAuthentication,
} from "../middelwares/Authorize";
import {
  createAddressValidator,
  deleteAddressValidator,
} from "../utils/subvalidators/addresses";

// HTTP Method and Endpoint and Permissions

const addressRoute: express.Router = express.Router();
addressRoute.use(verifyAuthentication, verifyActivity, allowedTo("user"));
// 1.General & 2.private("coll"{mergeParams, setIds for createOne, FilterData for getAll} with general)
// 2.private("doc")
addressRoute
  .route("/")
  .get(getAllAddressOfUser)
  .post(createAddressValidator, createOneAddressOfUser);
addressRoute
  .route("/:addressId")
  .delete(deleteAddressValidator, deleteOneAddressOfUser);
  // .delete(updateOneAddressOfUser, updateOne);
  // .put();
// 3.Custom [// User  // Manager]

export default addressRoute;

// !: HTTP Methods & Endpoints For categories Route for frontend:
// General
// Private or Related

// => {HTTP Method: "POST", Endpoint: "http://localhost:5000/api/v1/addresses/", Title: "create One Address Of User"}
// => {HTTP Method: "GET", Endpoint: "http://localhost:5000/api/v1/addresses/", Title: "get All Address Of User"}
// => {HTTP Method: "DELETE", Endpoint: "http://localhost:5000/api/v1/addresses/:productId", Title: "delete One Address Of User"}

// Custom
