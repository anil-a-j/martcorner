import React, { useEffect, useState } from "react";
import {
  checkProductId,
  selectProduct,
  resetValues,
  editProduct,
} from "../../../redux/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectMisc } from "../../../redux/misc/miscSlice";
import { toast } from "react-toastify";

const EditShopProductModal = ({ data, switchEditPopup }) => {
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productUnit, setProductUnit] = useState("");
  const [productDiscount, setProductDiscount] = useState("");
  const [productAvailable, setProductAvailable] = useState("");
  const [productImage1, setProductImage1] = useState("");
  const [productImage2, setProductImage2] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [deleteImage2, setDeleteImage2] = useState(false);

  const {
    idStatusFulfilled,
    idStatusRejected,
    editProductStatusFulfilled,
    editProductStatusRejected,
  } = useSelector(selectProduct);

  const { productCategoriesFulfilled, productCategoriesRejected } =
    useSelector(selectMisc);

  const dispatch = useDispatch();
  const units = ["PS", "LT", "ML", "KG", "MG"];
  const availability = [
    { option: "Yes", val: true },
    { option: "No", val: false },
  ];

  const editShopProduct = (e) => {
    e.preventDefault();
    if (productPrice) {
      if (!Number(productPrice)) {
        toast.error("Product price should be in number format");
        return false;
      }
    }

    if (productStock) {
      if (!Number(productStock)) {
        toast.error("Product stock should be in number format");
        return false;
      }
    }

    if (productDiscount !== "") {
      if (typeof productDiscount === String) {
        toast.error("Product discount should be in number format!");
        return false;
      }
    }

    dispatch(
      editProduct({
        id: data._id,
        productName,
        productPrice,
        productStock,
        productUnit,
        productDiscount,
        productAvailable,
        productImage1,
        productImage2,
        productDescription,
        deleteImage2,
      })
    );
  };

  useEffect(() => {
    productCategoriesRejected && toast.error(productCategoriesRejected);
    if (editProductStatusFulfilled) {
      toast.info(editProductStatusFulfilled.status);
      switchEditPopup();
    }
    editProductStatusRejected && toast.error(editProductStatusRejected);

    return () => {
      dispatch(resetValues());
    };
  }, [
    dispatch,
    productCategoriesRejected,
    editProductStatusRejected,
    editProductStatusFulfilled,
  ]);

  return (
    <div className="popup-window popup-large">
      <form onSubmit={editShopProduct}>
        <div className="content d-flex flex-column justify-content-evenly">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h3>Edit the product</h3>
              <button
                type="button"
                className="close px-2"
                onClick={switchEditPopup}
              >
                close
              </button>
            </div>

            <div className="row">
              <div className="col-md-4">
                <small className="d-inline-block label cover-down-10">
                  Product Name
                </small>
                <input
                  type="text"
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder={data.productName}
                />
              </div>
              <div className="col-md-4">
                <small className="d-inline-block label cover-down-10">
                  Product Id (optional)
                </small>
                <input
                  type="text"
                  onChange={(e) => setProductId(e.target.value)}
                  onBlur={(e) =>
                    e.target.value !== "" &&
                    dispatch(checkProductId(e.target.value))
                  }
                  placeholder={data.productId}
                />
                {idStatusFulfilled && (
                  <small className="d-inline-block cover-down=10 info">
                    {idStatusFulfilled}
                  </small>
                )}
                {idStatusRejected && (
                  <small className="d-inline-block cover-down=10 error">
                    {idStatusRejected}
                  </small>
                )}
              </div>
              <div className="col-md-4">
                <small className="d-inline-block label cover-down-10">
                  Product Price
                </small>
                <input
                  type="number"
                  min="0"
                  placeholder={data.productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <small className="d-inline-block label cover-down-10">
                  Product Discount(optional)
                </small>
                <input
                  className="d-block"
                  onChange={(e) => setProductDiscount(e.target.value)}
                  type="Number"
                  min="0"
                  placeholder={data.productDiscount}
                />
              </div>
              <div className="col-md-4">
                <small className="d-inline-block label cover-down-10">
                  Is Availability
                </small>
                <select
                  className="flex-shrink-1 no-focus-border"
                  onChange={(e) => {
                    setProductAvailable(e.target.value);
                  }}
                  defaultValue={data.productAvailable}
                >
                  <option disabled hidden>
                    {data.productAvailable === true ? "Yes" : "No"}
                  </option>
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
                <small className="d-inline-block label cover-down-10">
                  Product Stock
                </small>
                <div className="d-flex input-combined">
                  <input
                    type="number"
                    min="0"
                    placeholder={data.productStock}
                    className="no-focus-border"
                    onChange={(e) => setProductStock(e.target.value)}
                  />
                  <select
                    className="flex-shrink-1 no-focus-border"
                    onChange={(e) => setProductUnit(e.target.value)}
                    defaultValue={data.productUnit}
                  >
                    <option hidden disabled>
                      {data.productUnit}
                    </option>
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
                <small className="d-inline-block label cover-down-10">
                  Product Description
                </small>
                <textarea
                  className="flex-shrink-1 no-focus-border"
                  onChange={(e) => {
                    setProductDescription(e.target.value);
                  }}
                  placeholder={data.productDescription}
                ></textarea>
              </div>
              <div className="col-md-4">
                <small className="d-inline-block cover-down-10 label">
                  Product Image 1
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
                      width="90"
                      height="100"
                    />
                  )}
                  {data.productImages[0] && (
                    <img
                      src={data.productImages[0]}
                      className="temp-image"
                      width="90"
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
                      width="90"
                      height="100"
                    />
                  )}
                  {data.productImages[1] && !deleteImage2 && (
                    <>
                      <img
                        src={data.productImages[1]}
                        className="temp-image"
                        width="90"
                        height="100"
                      />
                      <input
                        type="checkbox"
                        title="Delete second image"
                        className="delete-image"
                        onChange={() => {
                          setDeleteImage2(true);
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="w-100 d-flex justify-content-center mt-5 px-2">
              <button type="submit" className="px-4">
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditShopProductModal;
