import React, { useState, useEffect } from "react";
import "./BottomNavbar.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCustomer } from "../../../redux/customer/customerSlice";
import { selectShop } from "../../../redux/shop/shopSlice";

const BottomNavbar = () => {
  const [locked, setLocked] = useState("");

  const { customerInfoFulfilled } = useSelector(selectCustomer);
  const { shopInfoFulfilled } = useSelector(selectShop);

  useEffect(() => {
    if (customerInfoFulfilled || shopInfoFulfilled) {
      // someone logged in
      setLocked(true);
    } else {
      // no one logged in
      setLocked(false);
    }
  }, [customerInfoFulfilled, shopInfoFulfilled]);

  return (
    <ul className="bottom-navbar p-0 justify-content-around align-items-center">
      <li className="search">
        <Link to="/search">Search</Link>
      </li>
      {!locked && (
        <li className="sign-up">
          <Link to="/signup">Signup</Link>
        </li>
      )}
      {!locked && (
        <li className="add-shop">
          <Link to="/addshop">Add Shop</Link>
        </li>
      )}
    </ul>
  );
};

export default BottomNavbar;
