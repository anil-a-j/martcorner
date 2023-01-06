import React, { useState, useEffect } from "react";
import "./MainNavbar.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutAsCustomer,
  selectCustomer,
} from "../../../redux/customer/customerSlice";
import { logoutAsShop, selectShop } from "../../../redux/shop/shopSlice";
import logo from "../../../assets/logo&name.svg";
import { clearCustomerSearch } from "../../../redux/search/searchSlice";

const MainNavbar = () => {
  const [locked, setLocked] = useState("");
  const dispatch = useDispatch();

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
    <div className="d-flex navbar">
      <div className="brand">
        <img src={logo} />
      </div>
      <ul className="mb-0">
        <li className="search">
          <Link to="/search">Search</Link>
        </li>
        {!locked && (
          <li>
            <Link to="/login" onClick={() => dispatch(clearCustomerSearch())}>
              Login
            </Link>
          </li>
        )}
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

        {customerInfoFulfilled && (
          <li
            onClick={() => {
              dispatch(logoutAsCustomer());
              dispatch(clearCustomerSearch());
            }}
          >
            Logout
          </li>
        )}
        {shopInfoFulfilled && (
          <li onClick={() => dispatch(logoutAsShop())}>Logout</li>
        )}
      </ul>
    </div>
  );
};

export default MainNavbar;
