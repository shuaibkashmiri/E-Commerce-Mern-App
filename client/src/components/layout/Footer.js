import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer text-light p-3 ">
      <p className="text-center mt-3">
        <Link to={"/about"}>About</Link>
        <Link to={"/contact"}>Contact Us</Link>
        <Link to={"/policy"}>Privacy Policy</Link>
      </p>
      <div className="social-icons text-center">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn />
        </a>
      </div>

      <h6 className="text-center mt-4">
        All Rights Reserver &copy; Shoaib Mushtaq Bhat
      </h6>
    </div>
  );
};

export default Footer;
