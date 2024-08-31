import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-screen flex-center">
      <div className="container">
        <div className="loader">
          <div className="crystal"></div>
          <div className="crystal"></div>
          <div className="crystal"></div>
          <div className="crystal"></div>
          <div className="crystal"></div>
          <div className="crystal"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
