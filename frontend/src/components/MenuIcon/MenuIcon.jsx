import React, { useState } from "react";
import "./MenuIcon.scss";

const MenuIcon = ({ toggle }) => {
  return (
    <div className={`menu-bar ${toggle ? "close" : "open"}`}>
      <div className="bar bar1"></div>
      <div className="bar bar2"></div>
      <div className="bar bar3"></div>
    </div>
  );
};

export default MenuIcon;
