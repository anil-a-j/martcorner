import React, { useEffect } from "react";
import { twoSliderY } from "../../../utilities/twoSlider/twoSlider";

const ViewProductPopup = ({ data, switchProductPopup }) => {
  const {
    _id,
    productImages,
    productName,
    productShop,
    productId,
    productPrice,
    productDiscount,
    productAvailable,
    productStock,
    productUnit,
    productNewPrice,
    rating,
    productDescription,
  } = data;

  return (
    <div className="popup-window popup-large">
      <div className="content view-product d-flex flex-column align-items-center justify-content-center">
        <div className="container-fluid">
          <div className="w-100 mb-2 d-flex justify-content-between align-items-center">
            <h2 className="limit-text limit-1l">{productName}</h2>
            <button
              type="button"
              className="close px-2"
              onClick={switchProductPopup}
            >
              close
            </button>
          </div>
          <div className="row">
            <div className="col-md-6 images">
              <img
                src={productImages[0]}
                alt="image"
                loading="lazy"
                className="d-block mx-auto"
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
                <div className="img-btns position-absolute d-flex flex-column justify-content-center align-items-center">
                  <span
                    className={"img-btn my-1 d-block rounded-circle active"}
                    onClick={(e) => twoSliderY(e)}
                  ></span>
                  <span
                    className={"img-btn my-1 d-block rounded-circle"}
                    onClick={(e) => twoSliderY(e)}
                  ></span>
                </div>
              )}
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <small className="p-0">{productShop.shopName}</small>
                </div>
                <div className="col-md-12 mb-3">
                  {productAvailable ? (
                    <p className="small label d-inline-block mb-1">
                      In stock {productStock}&nbsp;{productUnit}
                    </p>
                  ) : (
                    <p className="small error d-inline-block mb-1">
                      Out of stock
                    </p>
                  )}
                </div>
                <div className="col-md-12 text-end mb-3">
                  <p className="my-1 limit-text limit-8l">
                    {productDescription}
                  </p>
                </div>
                <div className="col-md-12 d-flex justify-content-center">
                  <h4 className={productAvailable ? "" : "text-disabled"}>
                    {productDiscount ? (
                      <strike className="text-disabled">
                        Rs.{productPrice}
                      </strike>
                    ) : (
                      <>Rs.{productPrice}</>
                    )}
                  </h4>
                  {productNewPrice ? (
                    <h4
                      className={
                        productAvailable
                          ? "text-new-price ms-auto"
                          : "text-disabled"
                      }
                    >
                      Rs.
                      {productNewPrice / productNewPrice == 1
                        ? productNewPrice
                        : (Math.round(productNewPrice * 100) / 100).toFixed(2)}
                    </h4>
                  ) : (
                    ""
                  )}
                  {productDiscount && (
                    <h4
                      className={
                        productAvailable ? "p-discount ms-1" : "text-disabled"
                      }
                    >
                      | {productDiscount}% OFF
                    </h4>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductPopup;
