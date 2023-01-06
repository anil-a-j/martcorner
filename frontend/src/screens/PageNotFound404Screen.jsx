import React from "react";
import page404 from "../assets/page404.svg";

const PageNotFound404Screen = () => {
  return (
    <div
      className="page-not-found d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <img src={page404} alt="Page not found!" width="350" />
    </div>
  );
};

export default PageNotFound404Screen;
