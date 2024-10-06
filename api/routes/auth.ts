// All required import
import express from "express";
import {
  forgetPassword,
  limitRequest,
  login,
  register,
  resetPassword,
  verifyResetCode,
} from "../controllers/auth";
import {
  forgetPasswordValidator,
  loginValidator,
  registerValidaor,
  resetPasswordValidator,
} from "../utils/subvalidators/auth";

// HTTP method and Endpoint and Permissions
const authRoute: express.Router = express.Router();

authRoute.route("/register").post(registerValidaor, register);
authRoute.route("/login").post(limitRequest, loginValidator, login);
// authRoute.route("logout").post();
authRoute
  .route("/forgetPassword")
  .post(forgetPasswordValidator, forgetPassword);
authRoute.route("/verifyResetCode").post(verifyResetCode);
authRoute.route("/resetPassword").post(resetPasswordValidator, resetPassword);

export default authRoute;

// !: HTTP Methods & Endpoints For auth Route for frontend:
// General

// => {HTTP Method: "POST", Endpoint: "http://localhost:5000/api/v1/auth/register", Title: "register"}
// => {HTTP Method: "POST", Endpoint: "http://localhost:5000/api/v1/auth/login", Title: "login"}
// => {HTTP Method: "POST", Endpoint: "http://localhost:5000/api/v1/auth/logout", Title: "logout"}
// => {HTTP Method: "POST", Endpoint: "http://localhost:5000/api/v1/auth/forgetPassword", Title: "forgetPassword"}
// => {HTTP Method: "POST", Endpoint: "http://localhost:5000/api/v1/auth/verifyResetCode", Title: "verifyResetCode"}
// => {HTTP Method: "POST", Endpoint: "http://localhost:5000/api/v1/auth/resetPassword", Title: "resetPassword"}
