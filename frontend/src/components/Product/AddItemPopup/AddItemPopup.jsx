import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeAddItemPopup, selectCart } from "../../../redux/cart/cartSlice";
import "./AddItemPopup.scss";

const AddItemPopup = () => {
  const dispatch = useDispatch();

  const {
    currentItemToList: {
      _id,
      productImage,
      productName,
      productShop,
      productPrice,
      productStock,
      productUnit,
    },
  } = useSelector(selectCart);

  return (
    <div className="popup-window popup-medium add-item-popup">
      <div className="content d-flex flex-column justify-content-around p-4">
        <div className="d-flex justify-content-around align-items-center mb-2">
          <h4 className="text-start me-4">Add Item to the list</h4>
          <button
            type="button"
            className="close px-2"
            onClick={() => dispatch(closeAddItemPopup())}
          >
            close
          </button>
          <hr />
        </div>

        <div className="container text-center">
          <div className="d-flex justify-content-between mb-4">
            <img src={productImage} className="list-item-image rounded" />
            <h5 className="my-2 fw-bold text-end">
              {productName} <br />{" "}
              <small className="p-0">{productShop.shopName}</small>
            </h5>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="fwt-bold text-center">
              <small className="info">
                In Stock: {productStock} {productUnit}
              </small>
            </h6>
            <h4>
              Rs.{productPrice} / {productUnit}
            </h4>
          </div>

          <input
            type="number"
            step="1"
            min="1"
            className="my-2 w-50"
            onChange={() => {}}
            placeholder="quantity..."
          />
        </div>
        <div className="w-100 justify-content-center d-flex">
          <button className="add">Add to the cart</button>
        </div>
      </div>
    </div>
  );
};

export default AddItemPopup;
