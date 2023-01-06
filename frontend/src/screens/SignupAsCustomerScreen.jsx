import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signupAsCustomer,
  selectCustomer,
  resetValuesCustomer,
} from "../redux/customer/customerSlice";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../utilities/validate/validate";
import { toast } from "react-toastify";

const SignupAsCustomerScreen = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { customerInfoFulfilled, customerInfoRejected } =
    useSelector(selectCustomer);

  let navigate = useNavigate();

  const submitSignup = (e) => {
    e.preventDefault();
    if (!fullname || !email || !password) {
      toast.error("All fields are required!");
      return false;
    }
    if (!validateEmail(email)) {
      toast.error("Please check your email!");
      return false;
    }
    if (password.length < 8) {
      toast.error("Password length has to be minimum 8 characters");
      return false;
    }
    dispatch(signupAsCustomer({ fullname, email, password }));
  };

  useEffect(() => {
    dispatch(resetValuesCustomer());
    customerInfoFulfilled && navigate("/");
    customerInfoRejected && toast.error(customerInfoRejected);
  }, [customerInfoFulfilled, customerInfoRejected, navigate]);

  return (
    <div className="container mt-5 pt-5">
      <div className="row my-4">
        <div className="col-12 offset-sm-2 col-sm-8 offset-md-3 col-md-6 offset-lg-4 col-lg-4">
          <div className="form-box shadow-sm">
            <h3 className="text-start text-title pb-2">Sign Up</h3>
            <form className="d-flex flex-column" onSubmit={submitSignup}>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="mb-4"
              />

              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <small className="mb-4 info">Minimum 8 characters</small>
              <input
                type="text"
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Full Name"
                className="mb-4"
              />
              <div className="align-items-center d-flex my-4">
                <input type="checkbox" className="checkbox" />
                <label className="ms-2">
                  I Agree <span className="link">Terms and Conditions</span>
                </label>
              </div>
              <button className="shadow-sm w-100" type="submit">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupAsCustomerScreen;
