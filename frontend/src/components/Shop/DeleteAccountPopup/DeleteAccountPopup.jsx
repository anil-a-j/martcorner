import React, { useState } from "react";
import { deleteShopAccount } from "../../../redux/shop/shopSlice";

const DeleteAccountPopup = () => {
  const [deletePassword, setDeletePassword] = useState("");
  const [deletePopup, setDeletePopup] = useState(false);

  return (
    <div>
      {deletePopup && (
        <div className="popup-window popup-small popup-delete">
          <div className="content d-flex flex-column align-items-center justify-content-center">
            <h6 className="mb-2">Are you sure?</h6>
            <small>
              ("All data will be lost but transaction history. Enter password if
              you are willing to delete")
            </small>
            <input
              onChange={(e) => setDeletePassword(e.target.value)}
              type="password"
              placeholder="Enter your password..."
            />
            <div className="d-flex w-100 justify-content-evenly mt-2">
              <button
                type="button"
                className="delete"
                onClick={() =>
                  dispatch(deleteShopAccount({ password: deletePassword }))
                }
                // data-id={deleteId}
              >
                Yes
              </button>
              <button
                type="button"
                className="close"
                onClick={() => {
                  setDeletePopup(false);
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="d-flex my-2 justify-content-between align-items-center">
        <h5 className="mb-0">Delete Account ?</h5>
        <button
          type="button"
          className="delete"
          onClick={() => setDeletePopup(true)}
        >
          Delete
        </button>
      </div>
      <hr />
    </div>
  );
};

export default DeleteAccountPopup;
