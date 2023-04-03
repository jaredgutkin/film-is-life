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
);

//Delete from Favorites list
router.delete(
    "/favorites/:favoritesId",
    tokenMiddleware.auth,
    favoriteController.removeFavorite
);

export default router;