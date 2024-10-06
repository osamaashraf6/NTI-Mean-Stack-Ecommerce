// All required import
import express from "express";
import {
  changeUserPasswordByUserHimSelf,
  changeUsersPasswordByManagerOnly,
  createOneUser,
  deleteOneUser,
  getAllUser,
  getOneUser,
  updateUserProfileByUserHimSelf,
  updateUsersProfileByManagerOnly,
} from "../controllers/users";
import {
  verifyAuthentication,
  allowedTo,
  verifyActivity,
} from "../middelwares/Authorize";
import { SetUserId } from "../middelwares/create_privatecrud_setids/User";
import {
  changeLoggedUserPasswordValidator,
  changeUserPasswordValidator,
  createUserValidator,
  deleteUserValidator,
  getUserValidator,
  updateLoggedUserValidator,
  updateUserValidator,
} from "../utils/subvalidators/users";
import {
  editFileWithBuffer,
  uploadUserFile,
} from "../utils/subuploadfiles/users";

// HTTP method and Endpoint and Permissions
const userRoute: express.Router = express.Router();
userRoute.use(verifyAuthentication, verifyActivity);
// TODO: User
userRoute.route("/getUserProfileByHimSelf").get(SetUserId, getOneUser);
userRoute
  .route("/updateUserProfileByHimSelf")
  .put(
    uploadUserFile,
    editFileWithBuffer,
    updateLoggedUserValidator,
    updateUserProfileByUserHimSelf
  );
userRoute
  .route("/changeUserPasswordByUserHimSelf")
  .put(changeLoggedUserPasswordValidator, changeUserPasswordByUserHimSelf);
userRoute
  .route("/deleteUserAccountByUserHimSelf")
  .delete(allowedTo("user"), SetUserId, deleteOneUser);

// General
userRoute
  .route("/")
  .post(allowedTo("manager"), createUserValidator, createOneUser)
  .get(allowedTo("manager"), getAllUser);
userRoute
  .route("/:id")
  .get(allowedTo("manager"), getUserValidator, getOneUser)
  .delete(allowedTo("manager"), deleteUserValidator, deleteOneUser);

// TODO: Manager
userRoute
  .route("/:id")
  .put(
    allowedTo("manager"),
    updateUserValidator,
    updateUsersProfileByManagerOnly
  );
userRoute
  .route("/:id/changeUsersPasswordByManagerOnly")
  .put(
    allowedTo("manager"),
    changeUserPasswordValidator,
    changeUsersPasswordByManagerOnly
  );

export default userRoute;

// ! TODO: HTTP Methods & Endpoints For users Route for frontend:
// General

// => {HTTP Method: "POST", Endpoint: "http://localhost:5000/api/v1/users/", Title: "create One User"}
// => {HTTP Method: "GET", Endpoint: "http://localhost:5000/api/v1/users/", Title: "get All User"}
// => {HTTP Method: "GET", Endpoint: "http://localhost:5000/api/v1/users/:id", Title: "get One User"}
// => {HTTP Method: "DELETE", Endpoint: "http://localhost:5000/api/v1/users/:id", Title: "delete One User"}

// Custom [//: Manager //: User]

// : Manager

// => {HTTP Method: "PUT", Endpoint: "http://localhost:5000/api/v1/users/:id", Title: "update Users Profile By Manager Only"}
// => {HTTP Method: "PUT", Endpoint: "http://localhost:5000/api/v1/users/:id/changeUsersPasswordByManagerOnly", Title: "change Users Password By Manager Only"}

// : User

// => {HTTP Method: "GET", Endpoint: "http://localhost:5000/api/v1/users/getUserProfileByHimSelf", Title: "get User Profile By Him Self"}
// => {HTTP Method: "PUT", Endpoint: "http://localhost:5000/api/v1/users/updateUserProfileByHimSelf", Title: "update User Profile By Him Self"}
// => {HTTP Method: "PUT", Endpoint: "http://localhost:5000/api/v1/users/changeUserPasswordByUserHimSelf", Title: "change User Password By User Him Self"}
// => {HTTP Method: "DELETE", Endpoint: "http://localhost:5000/api/v1/users/deleteUserAccountByUserHimSelf", Title: "delete User Account By User Him Self"}
