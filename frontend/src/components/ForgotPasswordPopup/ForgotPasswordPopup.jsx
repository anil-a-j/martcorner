import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail } from "../../utilities/validate/validate";
import { toast } from "react-toastify";
import {
  clearPasswordReset,
  passwordReset,
  selectMisc,
} from "../../redux/misc/miscSlice";

const ForgotPasswordPopup = ({ switchForgotPopup }) => {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const dispatch = useDispatch();

  const { passwordResetFulfilled, passwordResetRejected } =
    useSelector(selectMisc);

  const forgotPassword = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email field has to be filled!");
      return false;
    }

    if (!userType) {
      toast.error("Choose type of account!");
      return false;
    }

    if (validateEmail(email) !== true) {
      toast.error("Please check your email!");
      return false;
    }

    dispatch(passwordReset({ email, userType }));
  };

  useEffect(() => {
    passwordResetFulfilled && toast.info(passwordResetFulfilled.status);
    passwordResetRejected && toast.error(passwordResetRejected);
    return () => {
      dispatch(clearPasswordReset());
    };
  }, [passwordResetFulfilled, passwordResetRejected]);
  return (
    <div className="popup-window popup-small">
      <div className="content px-4 d-flex flex-column align-items-center justify-content-center">
        <form className="w-100 text-center" onSubmit={forgotPassword}>
          <h6 className="mb-2 fw-bold">Enter your email?</h6>
          <small className="info">
            We'll send a link to your email if you have an account
          </small>
          <input
            type="text"
            className="my-2"
            placeholder="your email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="d-flex justify-content-between px-4">
            <label className="radio">
              <input
                type="radio"
                name="type"
                onChange={() => setUserType("customer")}
              />
              <i className="radio ms-2">Customer</i>
            </label>
            <label className="radio">
              <input
                type="radio"
                name="type"
                onChange={(e) => setUserType("shop")}
              />
              <i className="ms-2">Shop</i>
            </label>
          </div>
          <div className="d-flex w-100 justify-content-evenly mt-3">
            <button type="submit">Send</button>
            <button
              type="button"
              className="close"
              onClick={() => {
                switchForgotPopup();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPopup;
