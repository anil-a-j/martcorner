import React from "react";
import { twoSliderX } from "../../../utilities/twoSlider/twoSlider";
// import RatingStars from "../../RaingStars/RatingStars";

const ShopProductCard = ({
  product,
  editProductPopup,
  deleteProductPopup,
  viewProductPopup,
}) => {
  const {
    _id,
    productImages,
    productName,
    productId,
    productPrice,
    productShop,
    productDiscount,
    productAvailable,
    productStock,
    productUnit,
    productNewPrice,
    rating,
    productDescription,
  } = product;

  return (
    <div
      className="c-card shadow-sm m-2"
      onClick={() => {
        viewProductPopup(product);
      }}
    >
      <div className="c-images d-flex">
        <img
          src={productImages[0]}
          alt="image"
          loading="lazy"
          className="d-block mx-auto"
          style={{ transform: !productImages[1] ? "translateX(0%)" : "" }}
        />
        {productImages[1] && (
          <img
            src={productImages[1]}
            alt="image"
            loading="lazy"
            className="d-block mx-auto"
          />
        )}
        {productImages[1] && (
          <div className="img-btns position-absolute w-100 d-flex justify-content-center align-items-center">
            <span
              className={"img-btn mx-1 d-block rounded-circle active"}
              onClick={(e) => {
                e.stopPropagation();
                twoSliderX(e);
              }}
            ></span>
            <span
              className={"img-btn mx-1 d-block rounded-circle"}
              onClick={(e) => {
                e.stopPropagation();
                twoSliderX(e);
              }}
            ></span>
          </div>
        )}
      </div>
      <div className="c-details p-2">
        <div className="d-flex justify-content-between">
          <div className="me-2">
            <h5 className="m-0 limit-text limit-1l">{productName}</h5>
            <small className="p-0">{productShop.shopName}</small>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-baseline c-stock-discount">
          {productAvailable ? (
            <p className="small label d-inline-block mb-1">
              In stock {productStock}&nbsp;{productUnit}
            </p>
          ) : (
            <p className="small error d-inline-block mb-1">Not Available</p>
          )}
          {productDiscount && (
            <h6 className={productAvailable ? "c-discount" : "text-disabled"}>
              {productDiscount}% OFF
            </h6>
          )}
        </div>
        {/* <div className="w-100">
                    <RatingStars rating={rating} /> {rating}/5
                  </div> */}
        <div className="c-product-description">
          <p className="my-1 limit-text limit-4l">{productDescription}</p>
        </div>
        <div className="d-flex price justify-content-between my-2">
          <h4 className={productAvailable ? "" : "text-disabled"}>
            {productDiscount ? (
              <strike className="text-disabled me-1">Rs.{productPrice}</strike>
            ) : (
              <>Rs.{productPrice}</>
            )}
          </h4>
          {productNewPrice ? (
            <h4
              className={productAvailable ? "text-new-price" : "text-disabled"}
            >
              Rs.
              {productNewPrice / productNewPrice == 1
                ? productNewPrice
                : (Math.round(productNewPrice * 100) / 100).toFixed(2)}
            </h4>
          ) : (
            ""
          )}
        </div>
        <div className="d-flex">
          <button
            type="button"
            className="c-edit shadow w-100 me-1"
            onClick={(e) => {
              e.stopPropagation();
              editProductPopup({
                _id,
                productImages,
                productName,
                productId,
                productPrice,
                productDiscount,
                productAvailable,
                productStock,
                productUnit,
                productNewPrice,
                rating,
                productDescription,
              });
            }}
          >
            Edit
          </button>

          <button
            type="button"
            className="c-delete shadow w-100 ms-1"
            onClick={(e) => {
              e.stopPropagation();
              deleteProductPopup(_id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopProductCard;
