import AsyncHandler from "express-async-handler";
import Shop from "../models/shopModel.js";
import Feedback from "../models/feedbackModel.js";
import { feedbackMail } from "../utils/sendMail.js";
import mongoose from "mongoose";

// @desc get reviews of a shop
// @route POST /api/review/add
// @access private
const addReview = AsyncHandler(async (req, res) => {
  const { title, rating, review, id } = req.body;

  const shop = await Shop.findById(id);

  if (shop) {
    const reviewExists = shop.reviews.find(
      (review) => review.customer.toString() === req.customer._id.toString()
    );

    if (reviewExists) {
      res.status(400);
      throw new Error("You already reviewd!");
    }

    const newReview = {
      title,
      rating: Number(rating),
      review,
      customer: req.customer._id,
    };

    shop.reviews.push(newReview);

    shop.numReviews = shop.reviews.length;

    shop.rating =
      shop.reviews.reduce((acc, review) => review.rating + acc, 0) /
      shop.numReviews;

    const updatedShop = await shop.save();

    const currentRatings = {
      numReviews: updatedShop.numReviews,
      rating: updatedShop.rating,
    };

    res.status(201).json({ status: "Review Added!", currentRatings });
  } else {
    res.status(404);
    throw new Error("Shop not found!");
  }
});

// @desc get reviews of a shop
// @route POST /api/review/shop
// @access public
const getReviews = AsyncHandler(async (req, res) => {
  const { id } = req.query;

  const page = Number(req.query.page) || 1;
  const pagesize = Number(req.query.pagesize) || 15;

  // aggregate is pipleline function so it has to be in right order to get right result
  const reviews = await Shop.aggregate([
    { $match: { _id: { $eq: mongoose.Types.ObjectId(id) } } },
    {
      $addFields: {
        reviewLength: {
          $cond: {
            if: { $isArray: "$reviews" },
            then: { $size: "$reviews" },
            else: null,
          },
        },
      },
    },
    { $unwind: "$reviews" },
    { $project: { reviews: 1, reviewLength: 1 } },
    {
      $lookup: {
        // "from" has to be as it is recoderd in database not like export name
        from: "customers",
        localField: "reviews.customer",
        foreignField: "_id",
        as: "reviews.customer",
      },
    },
    { $unwind: "$reviews.customer" },
    { $addFields: { "reviews.customer": "$reviews.customer.fullname" } },
    { $sort: { "reviews.createdAt": -1 } },
    { $skip: pagesize * (page - 1) },
    { $limit: pagesize },
  ]);

  const count = reviews[0]?.reviewLength;

  if (reviews) {
    res.status(200).json({
      reviews: reviews,
      page,
      pages: Math.ceil(count / pagesize),
    });
  } else {
    res.status(404);
    throw new Error("No reviews!");
  }
});

// @desc add feedback from site visitors
// @route POST /api/review/feedback/add
// @access public
const addFeedback = AsyncHandler(async (req, res) => {
  const { email, customerName, feedback } = req.body;

  const feedbackExists = await Feedback.find({
    email,
  });

  if (feedbackExists.length !== 0) {
    res.status(400);
    throw new Error("We have already received your feedback. Thank you!");
  }

  const feedbackAdded = await Feedback.create({
    email,
    customerName,
    feedback,
  });

  const status = await feedbackMail(
    `Feedback from ${email} - ${customerName}`,
    feedback
  );

  if (feedbackAdded && status.code === 200) {
    res.status(200).json({ status: "Thank you for your feedback!" });
  } else {
    res.status(400);
    throw new Error("Invalid Data!");
  }
});

export { addReview, getReviews, addFeedback };
