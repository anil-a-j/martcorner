import React from "react";
import { Link } from "react-router-dom";
import "./ShopNavbar.scss";

const ShopNavbar = () => {
  return (
    <ul className="shop-navbar">
      <li>
        <Link to={"products"}>
          <p>Products</p>
        </Link>
      </li>
      <li>
        <Link to={"reviews"}>
          <p>Reviews</p>
        </Link>
      </li>
      <li>
        <Link to={"aboutus"}>
          <p>About us</p>
        </Link>
      </li>
    </ul>
  );
};

export default ShopNavbar;
