import React from "react";
import { Link } from "react-router-dom";
const Index = () => {
  return (
    <>
      <div className="hero-container">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1 className="heading">Adventure Awaits!</h1>
          <p>Discover the perfect gear for your next adventure.</p>
          <Link to={"/categories"} className="hero-btn">
            Shop Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default Index;
