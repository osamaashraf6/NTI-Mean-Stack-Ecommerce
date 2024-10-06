// All required import
import express from "express";
import {
  createOneFavouriteOfUser,
  deleteOneFavouriteOfUser,
  getAllFavouriteOfUser,
} from "../controllers/wishlists";
import {
  allowedTo,
  verifyActivity,
  verifyAuthentication,
} from "../middelwares/Authorize";
import {
  addToWishlistValidator,
  removeFromWishlistValidator,
} from "../utils/subvalidators/wishlists";

// HTTP Method and Endpoint and Permissions

const favouriteRoute: express.Router = express.Router();
favouriteRoute.use(verifyAuthentication, verifyActivity, allowedTo("user"));

// 1.General & 2.private("coll"{mergeParams, setIds for createOne, FilterData for getAll} with general)
// 2.private("doc")
favouriteRoute
  .route("/")
  .get(getAllFavouriteOfUser)
  .post(addToWishlistValidator, createOneFavouriteOfUser);
favouriteRoute
  .route("/:productId")
  .delete(removeFromWishlistValidator, deleteOneFavouriteOfUser);
// 3.Custom [// User  // Manager]

export default favouriteRoute;

// !: HTTP Methods & Endpoints For categories Route for frontend:
// General
// Private or Related

// => {HTTP Method: "POST", Endpoint: "http://localhost:5000/api/v1/favourites/", Title: "create One Favourite Of User"}
// => {HTTP Method: "GET", Endpoint: "http://localhost:5000/api/v1/favourites/", Title: "get All Favourite Of User"}
// => {HTTP Method: "DELETE", Endpoint: "http://localhost:5000/api/v1/favourites/:productId", Title: "delete One Favourite Of User"}

// Custom
