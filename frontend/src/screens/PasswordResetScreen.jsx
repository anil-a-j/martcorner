import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  securityCodeCheck,
  createNewPassword,
  clearSecurityCodeCheck,
  clearCreateNewPassword,
  selectMisc,
} from "../redux/misc/miscSlice";
import LoadingWatch from "../components/LoadingWatch/LoadingWatch";

const PasswordResetScreen = () => {
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const { securitycode } = useParams();
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    securityCodeCheckFulfilled,
    securityCodeCheckPending,
    securityCodeCheckRejected,
    createNewPasswordFulfilled,
    createNewPasswordRejected,
  } = useSelector(selectMisc);

  const updatePassword = (e) => {
    e.preventDefault();
    if (!password || !passwordAgain) {
      toast.error("All fields are required!");
      return false;
    }
    if (password !== passwordAgain) {
      toast.error("Both fileds should be same!");
      return false;
    }
    if (password.length < 8) {
      toast.error("Password length has to be minimum 8 characters");
      return false;
    }
    dispatch(createNewPassword({ password, securitycode }));
  };

  useEffect(() => {
    !securitycode
      ? navigate("/")
      : dispatch(securityCodeCheck({ securitycode }));
    return () => {
      dispatch(clearSecurityCodeCheck());
    };
  }, [securitycode]);

  useEffect(() => {
    if (createNewPasswordFulfilled) navigate("/login");
    if (createNewPasswordRejected) toast.error(createNewPasswordRejected);
    return () => {
      dispatch(clearCreateNewPassword());
    };
  }, [createNewPasswordFulfilled, createNewPasswordRejected]);

  return !securityCodeCheckPending ? (
    <div className="container mt-5 pt-5">
      {securityCodeCheckRejected && (
        <p className="text-center fw-bold ">{securityCodeCheckRejected}</p>
      )}
      {securityCodeCheckFulfilled && (
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form className="form-box shadow-sm" onSubmit={updatePassword}>
              <h4 className="fw-bold">New password</h4>
              <input
                type="password"
                className="mb-2"
                placeholder="Type your new password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                className="mb-2"
                placeholder="Re-type password"
                onChange={(e) => setPasswordAgain(e.target.value)}
              />
              <button type="submit" className="ms-auto d-block">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  ) : (
    <LoadingWatch />
  );
};

export default PasswordResetScreen;
