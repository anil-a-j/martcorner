import React, { useState, useEffect } from "react";
import "./LoadingWatch.scss";

const LoadingWatch = () => {
  return (
    <div className="loading">
      <div className="clock">
        <div className="millisecond"></div>
        <div className="round"></div>
        <div className="second"></div>
      </div>
    </div>
  );
};

export default LoadingWatch;
