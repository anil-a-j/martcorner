import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAsCustomer,
  selectCustomer,
  resetValuesCustomer,
} from "../redux/customer/customerSlice";
import {
  loginAsShop,
  selectShop,
  resetValuesShop,
} from "../redux/shop/shopSlice";
import { useNavigate } from "react-router-dom";
import ForgotPasswordPopup from "../components/ForgotPasswordPopup/ForgotPasswordPopup";
import { clearCredentials } from "../redux/misc/miscSlice";
import { validateEmail } from "../utilities/validate/validate";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [forgotPopup, setForgotPopup] = useState(false);
  const [forgetUser, setForgetUser] = useState(true);

  const dispatch = useDispatch();

  const { customerInfoFulfilled, customerInfoRejected } =
    useSelector(selectCustomer);

  const { shopInfoFulfilled, shopInfoRejected } = useSelector(selectShop);

  let navigate = useNavigate();

  const submitLogin = (e) => {
    e.preventDefault();
    if (!email || !password || !userType) {
      toast.error("All fields are required!");
      return false;
    }

    if (validateEmail(email) !== true) {
      toast.error("Please check your email!");
      return false;
    }

    dispatch(clearCredentials(forgetUser));
    userType === "customer"
      ? dispatch(loginAsCustomer({ email, password }))
      : dispatch(loginAsShop({ email, password }));
  };

  const switchForgotPopup = () => {
    setForgotPopup(!forgotPopup);
  };

  useEffect(() => {
    dispatch(resetValuesCustomer());
    dispatch(resetValuesShop());
    customerInfoFulfilled && navigate("/");
    shopInfoFulfilled && navigate(`/${shopInfoFulfilled.shopId}`);
    customerInfoRejected && toast.error(customerInfoRejected);
    shopInfoRejected && toast.error(shopInfoRejected);
  }, [
    customerInfoFulfilled,
    customerInfoRejected,
    shopInfoFulfilled,
    shopInfoRejected,
    navigate,
  ]);

  return (
    <div className="container mt-5 pt-5">
      <div className="row my-4">
        <div className="col-12 offset-sm-2 col-sm-8 offset-md-3 col-md-6 offset-lg-4 col-lg-4">
          <div className="form-box shadow-sm">
            <h3 className="text-title pb-2">Login</h3>
            <form className="d-flex flex-column" onSubmit={submitLogin}>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email id"
                className="mb-4"
              />

              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />

              <div className="d-flex justify-content-between mt-4">
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
              <div className="my-2 d-flex align-items-center justify-content-between">
                <div className="align-items-center d-flex">
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={() => {
                      setForgetUser(!forgetUser);
                    }}
                  />
                  <label className="ms-2">Remember Me</label>
                </div>
                <p className="link pt-3" onClick={switchForgotPopup}>
                  Forgot password?
                </p>
              </div>
              <button className="shadow-sm w-100" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
      {forgotPopup && (
        <ForgotPasswordPopup switchForgotPopup={switchForgotPopup} />
      )}
    </div>
  );
};

export default LoginScreen;
