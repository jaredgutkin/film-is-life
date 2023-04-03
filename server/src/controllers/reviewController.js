import responseHandler from "../handlers/responseHandler.js";
import reviewModel from "../models/reviewModel.js";

//Write a Review of a Movie
const create = async (req, res) => {
    try {
      const { movieId } = req.params;
  
      const review = new reviewModel({
        user: req.user.id,
        movieId,
        ...req.body
      });
  
      await review.save();
  
      responseHandler.created(res, {
        ...review._doc,
        id: review.id,
        user: req.user
      });
    } catch {
      responseHandler.error(res);
    }
  };

//Remove a Review of a Movie
  const remove = async (req, res) => {
    try {
      const { reviewId } = req.params;
  
      const review = await reviewModel.findOne({
        _id: reviewId,
        user: req.user.id
      });
  
      if (!review) return responseHandler.notfound(res);
  
      await review.remove();
  
      responseHandler.ok(res);
    } catch {
      responseHandler.error(res);
    }
  };

//Get reviews of other users  
  const getReviewsOfUser = async (req, res) => {
    try {
      const reviews = await reviewModel.find({
        user: req.user.id
      }).sort("-createdAt");
  
      responseHandler.ok(res, reviews);
    } catch {
      responseHandler.error(res);
    }
  };
  
  export default { create, remove, getReviewsOfUser };