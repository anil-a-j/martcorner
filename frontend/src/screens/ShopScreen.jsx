import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectShop } from "../redux/shop/shopSlice";

const ShopScreen = () => {
  const navigate = useNavigate();
  const { shopInfoFulfilled } = useSelector(selectShop);
  useEffect(() => {
    if (!shopInfoFulfilled) {
      navigate("/");
    }
  }, [shopInfoFulfilled, navigate]);

  return (
    <div className="d-flex settings container mt-5 py-5">
      <div className="w-100 pt-3 position-relative">
        <Outlet />
      </div>
    </div>
  );
};

export default ShopScreen;
