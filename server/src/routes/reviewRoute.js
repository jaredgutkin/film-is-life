import express from "express";
import { body } from "express-validator";
import reviewController from "../controllers/reviewController.js";
import tokenMiddleware from "../middleware/token.js";
import requestHandler from "../handlers/requestHandler.js";

const router = express.Router({ mergeParams: true });

router.get(
    "/",
    tokenMiddleware.auth,
    reviewController.getReviewsOfUser
);

router.post(
    "/",
    tokenMiddleware.auth,
    body("mediaId")
        .exists().withMessage("Media ID is required.")
        .isLength({ min:1 }).withMessage("Media ID cannot be empty."),
    body("content")
        .exists().withMessage("Content is required.")
        .isLength({ min:1 }).withMessage("content cannot be empty"),
    body("mediaType")
        .exists().withMessage("media type is required!")
        .custom(type => ["movie", "tv"].includes(type)).withMessage("Media Type is invalid"),
    body("mediaTitle")
        .exists().withMessage("Title is required."),
    body("mediaPoster")
        .exists().withMessage("Poster is required"),
    requestHandler.validate,
    reviewController.create
);

router.delete(
    "/:reviewId",
    tokenMiddleware.auth,
    reviewController.remove
);

export default router;