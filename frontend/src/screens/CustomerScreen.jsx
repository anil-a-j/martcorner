import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCustomer } from "../redux/customer/customerSlice";

const CustomerScreen = () => {
  const navigate = useNavigate();
  const { customerInfoFulfilled } = useSelector(selectCustomer);
  useEffect(() => {
    if (!customerInfoFulfilled) {
      navigate("/");
    }
  }, [customerInfoFulfilled, navigate]);

  return (
    <div className="d-flex settings container mt-5 py-5">
      <div className="w-100 pt-3 position-relative">
        <Outlet />
      </div>
    </div>
  );
};

export default CustomerScreen;
