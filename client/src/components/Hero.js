import React from "react";
import { Link } from "react-router-dom";
const Index = () => {
  return (
    <>
      <div className="hero-container">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1 className="heading">Adventure Awaits!</h1>
          <p>Elevate Your Outdoor Experience.</p>
          <Link to={"/categories"} className="hero-btn">
            Shop Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default Index;
