import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMisc } from "../redux/misc/miscSlice";
import {
  addProduct,
  checkProductId,
  selectProduct,
  resetValues,
} from "../redux/product/productSlice";
import "./AddProductScreen.scss";
import { toast } from "react-toastify";

const AddProductsScreen = () => {
  const [productImage1, setProductImage1] = useState("");
  const [productImage2, setProductImage2] = useState("");
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDiscount, setProductDiscount] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productUnit, setProductUnit] = useState("PS");
  const [productAvailable, setProductAvailable] = useState(true);
  const [productDescription, setProductDescription] = useState("");

  const dispatch = useDispatch();
  const { productCategoriesFulfilled, productCategoriesRejected } =
    useSelector(selectMisc);

  const { idStatusFulfilled, addProductStatusFulfilled, idStatusRejected } =
    useSelector(selectProduct);

  const units = ["PS", "LT", "ML", "KG", "MG"];
  const availability = [
    { option: "Yes", val: true },
    { option: "No", val: false },
  ];

  const submitProduct = (e) => {
    e.preventDefault();
    if (
      !productImage1 ||
      !productName ||
      !productPrice ||
      !productStock ||
      !productUnit ||
      !productAvailable
    ) {
      toast.error("* signed fields are mandatory!");
      return false;
    }
    if (!Number(productPrice) || !Number(productStock)) {
      toast.error("Product price and stock should be in number format");
      return false;
    }
    if (productDiscount !== "") {
      if (!Number(productDiscount)) {
        toast.error("Product discount should be in number format!");
        return false;
      }
    }
    dispatch(
      addProduct({
        productImage1,
        productImage2,
        productName,
        productId,
        productPrice,
        productDiscount,
        productStock,
        productUnit,
        productAvailable,
        productDescription,
      })
    );
  };

  useEffect(() => {
    if (addProductStatusFulfilled) {
      toast.success(addProductStatusFulfilled.status);
    }
    return () => {
      dispatch(resetValues());
    };
  }, [dispatch, addProductStatusFulfilled]);

  return (
    <div className="container-fluid add-product mt-5 pt-5">
      <div className="form-box shadow-sm">
        <h3>Add your Product</h3>
        <form onSubmit={submitProduct}>
          <div className="row">
            <div className="col-md-4">
              <small className="d-inline-block cover-down-10 label">
                Product Name *
              </small>
              <input
                className="d-block"
                onChange={(e) => setProductName(e.target.value)}
                type="text"
                placeholder="Product Name"
              />
            </div>
            <div className="col-md-4">
              <small className="d-inline-block cover-down-10 label">
                Product ID (optional) | if there is no id we will genereate.
              </small>
              <input
                className="d-block"
                onChange={(e) => setProductId(e.target.value)}
                onBlur={(e) =>
                  e.target.value !== "" &&
                  dispatch(checkProductId(e.target.value))
                }
                type="text"
                placeholder="Product Id"
              />
              {idStatusFulfilled && (
                <small className="d-inline-block cover-down-10 info">
                  {idStatusFulfilled}
                </small>
              )}
              {idStatusRejected && (
                <small className="d-inline-block cover-down-10 error">
                  {idStatusRejected}
                </small>
              )}
            </div>
            <div className="col-md-4">
              <small className="d-inline-block cover-down-10 label">
                Product Price *
              </small>
              <input
                className="d-block"
                onChange={(e) => setProductPrice(e.target.value)}
                type="number"
                min="0"
                placeholder="Product price"
              />
            </div>
            <div className="col-md-4">
              <small className="d-inline-block cover-down-10 label">
                Product Stock *
              </small>
              <div className="d-flex input-combined">
                <input
                  type="number"
                  min="0"
                  placeholder="Number"
                  className="no-focus-border"
                  onChange={(e) => setProductStock(e.target.value)}
                />
                <select
                  className="flex-shrink-1 no-focus-border"
                  onChange={(e) => {
                    setProductUnit(e.target.value);
                  }}
                >
                  {units &&
                    units.map((unit, id) => {
                      return (
                        <option key={id} value={unit}>
                          {unit}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <small className="d-inline-block cover-down-10 label">
                Product Discount ( Optional )
              </small>
              <input
                className="d-block"
                onChange={(e) => setProductDiscount(e.target.value)}
                type="Number"
                min="0"
                placeholder="Product discount"
              />
            </div>
            <div className="col-md-4">
              <small className="d-inline-block cover-down-10 label">
                Is Available? *
              </small>
              <select
                className="flex-shrink-1 no-focus-border"
                onChange={(e) => {
                  setProductAvailable(e.target.value);
                }}
              >
                {availability &&
                  availability.map(({ option, val }, id) => {
                    return (
                      <option key={id} value={val}>
                        {option}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-md-4">
              <small className="d-inline-block cover-down-10 label">
                Product Description
              </small>
              <textarea
                className="no-focus-border"
                onChange={(e) => {
                  setProductDescription(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="col-md-4">
              <small className="d-inline-block cover-down-10 label">
                Product Image 1 *
              </small>
              <div className="d-flex">
                <input
                  type="file"
                  className="d=block image-upload"
                  onChange={(e) => {
                    setProductImage1(e.target.files[0]);
                  }}
                  placeholder="image"
                />
                {productImage1 && (
                  <img
                    src={URL.createObjectURL(productImage1)}
                    className="temp-image"
                    width="100"
                    height="100"
                  />
                )}
              </div>
            </div>
            <div className="col-md-4">
              <small className="d-inline-block cover-down-10 label">
                Product Image 2
              </small>
              <div className="d-flex">
                <input
                  type="file"
                  className="d=block image-upload"
                  onChange={(e) => {
                    setProductImage2(e.target.files[0]);
                  }}
                  placeholder="image"
                />
                {productImage2 && (
                  <img
                    src={URL.createObjectURL(productImage2)}
                    className="temp-image"
                    width="100"
                    height="100"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="w-100 justify-content-end d-flex">
            <button className="mt-4 shadow-sm" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductsScreen;
