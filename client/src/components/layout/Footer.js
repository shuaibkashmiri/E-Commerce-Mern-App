import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer text-light p-3 ">
      <p className="text-center mt-3">
        <Link to={"/about"}>About</Link>
        <Link to={"/contact"}>Contact Us</Link>
        <Link to={"/policy"}>Privacy Policy</Link>
      </p>
      <h6 className="text-center">
        All Rights Reserver &copy; Shoaib Mushtaq Bhat
      </h6>
    </div>
  );
};

export default Footer;
