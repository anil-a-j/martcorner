import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getShopPage, selectShop } from "../redux/shop/shopSlice";
import PageNotFound404Screen from "./PageNotFound404Screen";
import LoadingWatch from "../components/LoadingWatch/LoadingWatch";
import "./ShopPageScreen.scss";
import noimage from "../assets/noimage.png";
import RatingStars from "../components/RaingStars/RatingStars";
import ShopNavbar from "../components/Navbar/ShopNavbar/ShopNavbar";
import ShopPageProducts from "../components/Shop/ShopPageProducts/ShopPageProducts";
import ShopPageReviews from "../components/Shop/ShopPageReviews/ShopPageReviews";
import ShopPageAbout from "../components/Shop/ShopPageAbout/ShopPageAbout";

const ShopPageScreen = () => {
  const { shopId } = useParams();
  const dispatch = useDispatch();
  const [updatedRating, setUpdatedRating] = useState("");
  const { shopPageFulfilled, shopPagePending } = useSelector(selectShop);

  const changeShopRating = (newRating) => {
    setUpdatedRating(newRating);
  };

  useEffect(() => {
    dispatch(getShopPage({ shopId }));
  }, [shopId]);

  return !shopPagePending && shopPageFulfilled ? (
    <div className="shop-page">
      <div className="shop-banner">
        <img
          src={
            shopPageFulfilled.shop.shopBanner
              ? shopPageFulfilled.shop.shopBanner
              : noimage
          }
          alt="banner"
        />
      </div>
      <div className="shop-logo shadow">
        <img
          src={
            shopPageFulfilled.shop.shopLogo
              ? shopPageFulfilled.shop.shopLogo
              : noimage
          }
          alt="logo"
        />
      </div>

      <div className="shop-details d-flex align-items-end shadow-sm">
        <div className="shop-name container mb-4 p-4">
          <div className="row">
            <div className="col-lg-2 col-md-4">
              <div className="rating pt-4 text-center">
                <h2 className="m-0">
                  {updatedRating
                    ? parseFloat(updatedRating.rating).toFixed(1)
                    : parseFloat(shopPageFulfilled.shop.rating.toFixed(1))}
                </h2>
                <div className="d-flex justify-content-center">
                  <RatingStars
                    rating={
                      updatedRating
                        ? parseFloat(updatedRating.rating).toFixed(1)
                        : parseFloat(shopPageFulfilled.shop.rating.toFixed(1))
                    }
                    size={35}
                  />
                </div>
                <p className="fw-bold pt-1">
                  Reviews:
                  {updatedRating
                    ? updatedRating.reviews
                    : shopPageFulfilled.shop.numReviews}
                </p>
              </div>
            </div>
            <div className="col-lg-10 col-md-8">
              <div className="box mt-2 mt-md-0">
                <h3 className="fw-bold mt-2">
                  {shopPageFulfilled.shop.shopName}
                </h3>
                <small className="label">what we do</small>
                <p className="fw-bold mt-2 limit-text limit-8l">
                  {shopPageFulfilled.shop.aboutShop}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="stripe d-flex justify-content-end">
        <ShopNavbar />
      </div>
      <div className="shop-contents p-4">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<ShopPageProducts id={shopPageFulfilled.shop._id} />}
            />
            <Route
              path="products"
              element={<ShopPageProducts id={shopPageFulfilled.shop._id} />}
            />
            <Route
              path="reviews"
              element={
                <ShopPageReviews
                  id={shopPageFulfilled.shop._id}
                  changeShopRating={changeShopRating}
                />
              }
            />
            <Route
              path="aboutus"
              element={<ShopPageAbout shop={shopPageFulfilled.shop} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  ) : shopPagePending ? (
    <LoadingWatch />
  ) : (
    <PageNotFound404Screen />
  );
};

export default ShopPageScreen;
