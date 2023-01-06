import React from "react";

const ShopPageAbout = ({ shop }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-6 col-md-3">
          <div className="box align-items-start">
            <small className="label w-100">Phone</small>
            <p className="fw-bold mt-2">{shop.phone}</p>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <div className="box align-items-start">
            <small className="label w-100">Email</small>
            <p className="fw-bold mt-2">{shop.email}</p>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <div className="box align-items-start">
            <small className="label w-100">Shop Type</small>
            <p className="fw-bold mt-2">{shop.storeType.store}</p>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <div className="box align-items-start">
            <small className="label w-100">Location</small>
            <p className="fw-bold mt-2">
              {shop.place},{shop.district.district},{shop.state.state}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPageAbout;
