import express from "express";
import { body } from "express-validator";
import favoriteController from "../controllers/favoriteController";
import userController from "../controllers/userController";
import requestHandler from "../handlers/requestHandler.js";
import userModel from "../models/userModel.js";
import tokenMiddleware from "../middleware/token.js";

const router = express.Router();

//SIGN UP - create a user profile/login
router.post(
    "/signup",
    body("username")
        .exists().withMessage("Username is required.")
        .isLength({ min: 8 }).withMessage("Username must be a minimum of 8 characters")
        .custom(async value => {
            const user = await userModel.findOne({ username: value });
            if (user) return Promise.reject("That username already is in use.")
        }),
    body("password")
        .exists().withMessage("Password is required.")
        .isLength({ min: 8 }).withMessage("Password must be a minimum of 8 characters"),
    body("confirmPassword")
        .exists().withMessage("Confirm Password is required.")
        .isLength({ min: 8 }).withMessage("Confirm Password must be a minimum of 8 characters")
        .custom(async value => {
            if (value !== requestHandler.body.password) throw new Error("Passwords don't match!");
            return true;
        }),
    body("displayName")
        .exists().withMessage("Display Name is required.")
        .isLength({ min: 8 }).withMessage("Display Name must be a minimum of 8 characters"),
    requestHandler.validate,
    userController.signup
);

//SIGN IN - log into profile
router.post(
    "/signin",
    body("username")
        .exists().withMessage("Username is required.")
        .isLength({ min: 8 }).withMessage("Username must be a minimum of 8 characters"),
    body("password")
        .exists().withMessage("Password is required.")
        .isLength({ min: 8 }).withMessage("Password must be a minimum of 8 characters"),
    requestHandler.validate,
    userController.signin
);

//UPDATE your password
router.put(
    "/update-password",
    tokenMiddleware.auth,
    body("password")
      .exists().withMessage("password is required")
      .isLength({ min: 8 }).withMessage("password minimum 8 characters"),
    body("newPassword")
      .exists().withMessage("newPassword is required")
      .isLength({ min: 8 }).withMessage("newPassword minimum 8 characters"),
    body("confirmNewPassword")
      .exists().withMessage("confirmNewPassword is required")
      .isLength({ min: 8 }).withMessage("confirmNewPassword minimum 8 characters")
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) throw new Error("confirmNewPassword not match");
        return true;
      }),
    requestHandler.validate,
    userController.updatePassword
);

//Get Information of Profile
router.get(
    "/info",
    tokenMiddleware.auth,
    userController.getInfo
);

//Get Favorites of User
router.get(
    "/favorites",
    tokenMiddleware.auth,
    favoriteController.getFavoritesOfUser
);

//Add favorites to list
router.post(
    "/favorites",
    tokenMiddleware.auth,
    body("mediaType")
      .exists().withMessage("mediaType is required")
      .custom(type => ["movie", "tv"].includes(type)).withMessage("mediaType invalid"),
    body("mediaId")
      .exists().withMessage("mediaId is required")
      .isLength({ min: 1 }).withMessage("mediaId can not be empty"),
    body("mediaTitle")
      .exists().withMessage("mediaTitle is required"),
    body("mediaPoster")
      .exists().withMessage("mediaPoster is required"),
    body("mediaRate")
      .exists().withMessage("mediaRate is required"),
    requestHandler.validate,
    favoriteController.addFavorite
);

//Delete from Favorites list
router.delete(
    "/favorites/:favoritesId",
    tokenMiddleware.auth,
    favoriteController.removeFavorite
);

export default router;