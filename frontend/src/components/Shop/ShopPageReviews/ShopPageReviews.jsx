import React, { memo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ShopPageReviews.scss";
import { selectCustomer } from "../../../redux/customer/customerSlice";
import {
  selectReview,
  addReview,
  getReviews,
  resetReviewValues,
} from "../../../redux/review/reviewSlice";
import RatingStars from "../../RaingStars/RatingStars";
import LoadingWatch from "../../LoadingWatch/LoadingWatch";
import ReviewPagination from "../../Pagination/ReviewPagination";
import { toast } from "react-toastify";

const ShopPageReviews = ({ changeShopRating, id }) => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  const { customerInfoFulfilled } = useSelector(selectCustomer);
  const {
    loadReviewsFulfilled,
    loadReviewsPending,
    loadReviewsRejected,
    addReviewFulfilled,
    addReviewRejected,
  } = useSelector(selectReview);

  const dispatch = useDispatch();

  const submitReview = (e) => {
    e.preventDefault();
    if (!customerInfoFulfilled) {
      toast.error("You have to have a customer account to post reviews");
      return false;
    }
    if (!rating || !review || !title) {
      toast.error("fill all the fields");
      return false;
    }
    if (rating < 0 || rating > 5) {
      toast.error("The rating must range from 0 to 5");
      return false;
    }

    dispatch(addReview({ title, rating, review, id }));
  };

  useEffect(() => {
    dispatch(getReviews({ pageSize: 5, page: 1, id }));
  }, []);

  useEffect(() => {
    if (addReviewFulfilled) {
      dispatch(getReviews({ pageSize: 5, page: 1, id }));
      changeShopRating({
        rating: addReviewFulfilled.currentRatings.rating,
        reviews: addReviewFulfilled.currentRatings.numReviews,
      });

      toast.success(addReviewFulfilled.status);
    }
    if (addReviewRejected) {
      toast.error(addReviewRejected);
    }

    return () => {
      dispatch(resetReviewValues());
    };
  }, [id, addReviewFulfilled, addReviewRejected]);

  return (
    <div className="shop-reviews">
      <h3>Reviews</h3>
      <form onSubmit={submitReview} className="mb-4 p-2 mb-4 shadow-sm">
        <div className="d-flex">
          <input
            type="text"
            placeholder="Title..."
            className="mb-3 w-75"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            min="0"
            placeholder="stars..."
            className="mb-3 ms-2 w-25"
            step=".01"
            max="5"
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <textarea
          placeholder="what do you think of us..."
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <button type="submit" className="submit d-block ms-auto mt-2">
          Send
        </button>
      </form>

      <hr />
      <div className="w-100">
        {!loadReviewsPending ? (
          loadReviewsFulfilled &&
          loadReviewsFulfilled.reviews.map(
            ({ title, review, rating, customer }, key) => {
              return (
                <div className="review" key={key}>
                  <div className="d-flex align-items-center justify-content-between">
                    <RatingStars rating={rating} />
                    <p className="small m-0 info">{customer.fullname}</p>
                  </div>
                  <h6 className="mt-2 m-0 fw-bold">{title}</h6>
                  <p>{review}</p>
                </div>
              );
            }
          )
        ) : (
          <LoadingWatch />
        )}
      </div>
      <ReviewPagination
        pages={loadReviewsFulfilled.pages}
        page={loadReviewsFulfilled.page}
        id={id}
      />
      {loadReviewsRejected && <p>{loadReviewsRejected}</p>}
    </div>
  );
};

export default memo(ShopPageReviews);
