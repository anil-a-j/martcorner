import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  resetDeleteValues,
  selectProduct,
} from "../../../redux/product/productSlice";

const DeleteShopProductPopup = ({ deleteId, switchDeletePopup }) => {
  const dispatch = useDispatch();

  const { deleteProductFulfilled } = useSelector(selectProduct);

  useEffect(() => {
    deleteProductFulfilled && switchDeletePopup();

    return () => {
      dispatch(resetDeleteValues());
    };
  }, [deleteProductFulfilled]);

  return (
    <div className="popup-window popup-small">
      <div className="content d-flex flex-column align-items-center justify-content-center">
        <h6 className="mb-2">Are you sure?</h6>
        <div className="d-flex w-100 justify-content-evenly mt-2">
          <button
            type="button"
            className="delete"
            onClick={() => dispatch(deleteProduct(deleteId))}
            // data-id={deleteId}
          >
            Yes
          </button>
          <button
            type="button"
            className="close"
            onClick={() => {
              switchDeletePopup();
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteShopProductPopup;
