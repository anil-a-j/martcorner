import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "../../MenuIcon/MenuIcon";
import "./SideNavbar.scss";
import { useSelector } from "react-redux";
import { selectCustomer } from "../../../redux/customer/customerSlice";
import { selectShop } from "../../../redux/shop/shopSlice";

const SideNavbar = () => {
  const [toggle, setToggle] = useState(false);
  const { customerInfoFulfilled } = useSelector(selectCustomer);
  const { shopInfoFulfilled } = useSelector(selectShop);

  return (
    <div
      className={`d-flex flex-column side-navbar ${
        toggle ? "transformed" : ""
      }`}
    >
      <div className="w-100 d-flex justify-content-end">
        <div
          className="click"
          onClick={(e) => {
            {
              e.stopPropagation();
              setToggle(!toggle);
            }
          }}
        >
          <MenuIcon toggle={toggle} />
        </div>
      </div>
      <ul>
        {shopInfoFulfilled && (
          <>
            <li>
              <Link target="_blank" to={`/${shopInfoFulfilled.shopId}`}>
                <p className="p-3">{shopInfoFulfilled.shopName}</p>
              </Link>
            </li>
            <hr />
          </>
        )}

        {shopInfoFulfilled && (
          <>
            <li>
              <Link to="addproducts">
                <p className="p-3">Add Products</p>
              </Link>
            </li>
            <hr />
          </>
        )}

        {shopInfoFulfilled && (
          <>
            <li>
              <Link to="viewshopproducts">
                <p className="p-3">View Products</p>
              </Link>
            </li>
            <hr />
          </>
        )}

        {shopInfoFulfilled && (
          <>
            <li>
              <Link to="editandviewshopdetails">
                <p className="p-3">View & Edit Account Details</p>
              </Link>
            </li>
            <hr />
          </>
        )}
        {shopInfoFulfilled && (
          <>
            <li>
              <Link to="billing">
                <p className="p-3">Billing</p>
              </Link>
            </li>
            <hr />
          </>
        )}
        {shopInfoFulfilled && (
          <>
            <li>
              <Link to="settings">
                <p className="p-3">Settings</p>
              </Link>
            </li>
            <hr />
          </>
        )}

        {customerInfoFulfilled && (
          <>
            <li>
              <Link to="editcustomerdetails">
                <p className="p-3">Edit Account</p>
              </Link>
            </li>
            <hr />
          </>
        )}
        {customerInfoFulfilled && (
          <>
            <li>
              <Link to="favoriteshops">
                <p className="p-3">Favorite Shops</p>
              </Link>
            </li>
            <hr />
          </>
        )}
      </ul>
    </div>
  );
};

export default SideNavbar;
