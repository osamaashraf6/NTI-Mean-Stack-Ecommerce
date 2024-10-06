// All required import
import express from "express";
import {
  createOneProduct,
  deleteOneProduct,
  getAllProdcuts,
  getAllTest,
  getOneProduct,
  updateOneProduct,
} from "../controllers/products";
import {
  createOneProductValidator,
  deleteOneProductValidator,
  getOneProductValidator,
  updateOneProductValidator,
} from "../utils/subvalidators/products";
import {
  editFileWithBuffer,
  uploadProductsFile,
} from "../utils/subuploadfiles/products";
import {
  allowedTo,
  verifyActivity,
  verifyAuthentication,
} from "../middelwares/Authorize";
import reviewRoute from "./reviews";
// HTTP method and Endpoint and Permissions

const productRoute: express.Router = express.Router();
productRoute.use("/:productId/reviews", reviewRoute);
productRoute
  .route("/")
  .get(getAllProdcuts)
  .post(
    verifyAuthentication,
    verifyActivity,
    allowedTo("manager", "admin"),
    uploadProductsFile,
    editFileWithBuffer,
    createOneProductValidator,
    createOneProduct
  );
productRoute.route("/colorPurple").get(getAllTest);

productRoute
  .route("/:id")
  .get(getOneProductValidator, getOneProduct)
  .put(
    verifyAuthentication,
    verifyActivity,
    allowedTo("manager", "admin"),
    updateOneProductValidator,
    updateOneProduct
  )
  .delete(
    verifyAuthentication,
    verifyActivity,
    allowedTo("manager", "admin"),
    deleteOneProductValidator,
    deleteOneProduct
  );
export default productRoute;

// !: HTTP Methods & Endpoints For products Route for frontend:
// General

// => {HTTP Method: "POST", Endpoint: "http://localhost:5000/api/v1/products/", Title: "create One Product"}
// => {HTTP Method: "GET", Endpoint: "http://localhost:5000/api/v1/products/", Title: "get All Product"}
// => {HTTP Method: "GET", Endpoint: "http://localhost:5000/api/v1/products/:id", Title: "get One Product"}
// => {HTTP Method: "PUT", Endpoint: "http://localhost:5000/api/v1/products/:id", Title: "update One Product"}
// => {HTTP Method: "DELETE", Endpoint: "http://localhost:5000/api/v1/products/:id", Title: "delete One Product"}
