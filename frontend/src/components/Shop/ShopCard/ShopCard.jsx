import React, { memo, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import RatingStars from "../../RaingStars/RatingStars";
import { selectCustomer } from "../../../redux/customer/customerSlice";
import {
  selectMisc,
  addToFavoriteShop,
  removeFromFavoriteShop,
} from "../../../redux/misc/miscSlice";
import noimage from "../../../assets/noimage.png";

const ShopCard = ({ shop, createAccountMessage }) => {
  const [favorite, setFavorite] = useState(false);
  const localChange = useRef(false);

  const {
    _id,
    shopId,
    shopName,
    storeType,
    aboutShop,
    rating,
    shopBanner,
    shopLogo,
    favCustomers,
  } = shop;

  const dispatch = useDispatch();

  const { customerInfoFulfilled } = useSelector(selectCustomer);

  const { addToFavoriteShopFulfilled, removeFromFavoriteShopFulfilled } =
    useSelector(selectMisc);

  const addToFavorite = (e) => {
    e.preventDefault();
    dispatch(addToFavoriteShop({ id: _id }));
  };

  const removeFromFavorite = (e) => {
    e.preventDefault();
    dispatch(removeFromFavoriteShop({ id: _id }));
  };

  useEffect(() => {
    if (addToFavoriteShopFulfilled.shop_id === _id) {
      localChange.current = true;
      setFavorite(true);
    }
  }, [addToFavoriteShopFulfilled]);

  useEffect(() => {
    if (removeFromFavoriteShopFulfilled.shop_id === _id) {
      localChange.current = true;
      setFavorite(false);
    }
  }, [removeFromFavoriteShopFulfilled]);

  return (
    <Link target="_blank" to={`/${shopId}`}>
      <div className="c-card shadow-sm m-2">
        <div className="c-images d-flex">
          <img src={shopBanner ? shopBanner : noimage} />
          <div className="c-logo-bg shadow-sm">
            <div className="c-logo">
              <img src={shopLogo ? shopLogo : noimage} />
            </div>
          </div>
        </div>

        <div className="c-details p-2 text-center">
          <small className="p-0 ">{shopName}</small>
          <div className="my-2 c-category">
            <p className="mb-0">{storeType.store}</p>
          </div>
          <div className="d-flex justify-content-around">
            <RatingStars rating={rating} />
            <p className="m-0">
              {rating ? parseFloat(rating.toFixed(1)) : "0"}
            </p>
          </div>

          <div className="c-shop-description text-start limit-text limit-4l">
            <p>{aboutShop}</p>
          </div>
          {!customerInfoFulfilled && (
            <button
              className="w-100 mt-1 c-add"
              onClick={createAccountMessage ? createAccountMessage : ""}
            >
              Add to favorite
            </button>
          )}
          {customerInfoFulfilled.id && !localChange.current && (
            <>
              {favCustomers.length === 0 ? (
                <button
                  className="w-100 mt-1 c-add ad1"
                  onClick={addToFavorite}
                >
                  Add to favorite
                </button>
              ) : (
                <button
                  className="w-100 mt-1 c-favorite ad2"
                  onClick={removeFromFavorite}
                >
                  Favorite
                </button>
              )}
            </>
          )}
          {localChange.current && (
            <>
              {favorite ? (
                <button
                  className="w-100 mt-1 c-favorite ad3"
                  onClick={removeFromFavorite}
                >
                  Favorite
                </button>
              ) : (
                <button
                  className="w-100 mt-1 c-add ad4"
                  onClick={addToFavorite}
                >
                  Add to favorite
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default memo(ShopCard);
