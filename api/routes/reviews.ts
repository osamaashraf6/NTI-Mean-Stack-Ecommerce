// All required import
import express from "express";
import {
  createOneReview,
  deleteOneReview,
  getAllReview,
  getOneReview,
  updateOneReview,
} from "../controllers/reviews";
import {
  filterReviews,
  setUserIdProductId,
} from "../middelwares/create_privatecrud_setids/Review";
import {
  allowedTo,
  verifyActivity,
  verifyAuthentication,
} from "../middelwares/Authorize";
import {
  createReviewValidator,
  deleteReviewValidator,
  getReviewValidator,
  updateReviewValidator,
} from "../utils/subvalidators/reviews";
// HTTP Method and Endpoint and Permissions
const reviewRoute: express.Router = express.Router({ mergeParams: true });
// General
reviewRoute
  .route("/")
  .get(filterReviews, getAllReview)
  .post(
    verifyAuthentication,
    verifyActivity,
    allowedTo("user"),
    setUserIdProductId,
    createReviewValidator,
    createOneReview
  );

reviewRoute
  .route("/userReviews")
  .get(
    verifyAuthentication,
    verifyActivity,
    allowedTo("user"),
    filterReviews,
    getAllReview
  );
reviewRoute
  .route("/:id")
  .get(getReviewValidator, getOneReview)
  .put(
    verifyAuthentication,
    verifyActivity,
    allowedTo("user"),
    updateReviewValidator,
    updateOneReview
  )
  .delete(
    verifyAuthentication,
    verifyActivity,
    allowedTo("user"),
    deleteReviewValidator,
    deleteOneReview
  );
// Related
export default reviewRoute;
// !: HTTP Methods & Endpoints For categories Route for frontend:
// General

// => {HTTP Method: "POST", Endpoint: "http://localhost:5000/api/v1/reviews/", Title: "create One Review"}
// => {HTTP Method: "GET", Endpoint: "http://localhost:5000/api/v1/reviews/", Title: "get All Review"}
// => {HTTP Method: "GET", Endpoint: "http://localhost:5000/api/v1/reviews/:id", Title: "get One Review"}
// => {HTTP Method: "PUT", Endpoint: "http://localhost:5000/api/v1/reviews/:id", Title: "update One Review"}
// => {HTTP Method: "DELETE", Endpoint: "http://localhost:5000/api/v1/reviews/:id", Title: "delete One Review"}

// Private or Related

// => {HTTP Method: "POST", Endpoint: "http://localhost:5000/api/v1/reviews/:productId/reviews/", Title: "create One Review Of User"}
// => {HTTP Method: "GET", Endpoint: "http://localhost:5000/api/v1/reviews/:productId/reviews/", Title: "get All Review Of User"}
// => {HTTP Method: "GET", Endpoint:"http://localhost:5000/api/v1/reviews/:productId/reviews/:id", Title: "get One Review Of User"}
// => {HTTP Method: "PUT", Endpoint: "http://localhost:5000/api/v1/reviews/:productId/reviews/:id", Title: "update One Review Of User"}
// => {HTTP Method: "DELETE", Endpoint: "http://localhost:5000/api/v1/reviews/:productId/reviews/:id", Title: "delete One Review Of User"}
// => {HTTP Method: "GET", Endpoint: "http://localhost:5000/api/v1/reviews/userReviews", Title: "delete All User Reviews"}
