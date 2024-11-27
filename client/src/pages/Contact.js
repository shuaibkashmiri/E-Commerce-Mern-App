import React from "react";
import Layout from "../components/layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout>
      <div className="container my-5">
        <div className="row align-items-center">
          {/* Image Section */}
          <div className="col-md-6">
            <img
              src="/images/contactus.jpeg"
              alt="Contact Us"
              className="img-fluid rounded shadow"
            />
          </div>

          {/* Contact Details Section */}
          <div className="col-md-6">
            <h2 className="bg-success text-white p-3 text-center rounded">
              Contact Us
            </h2>
            <p className="text-muted mt-4">
              Have a query or need more information about our products? Feel
              free to reach out to us anytime! We are available 24/7.
            </p>
            <ul className="list-unstyled mt-4">
              <li className="mb-3">
                <BiMailSend className="text-primary me-2" />
                <span className="text-dark">help@adventureoutfits.com</span>
              </li>
              <li className="mb-3">
                <BiPhoneCall className="text-success me-2" />
                <span className="text-dark">012-56544356</span>
              </li>
              <li>
                <BiSupport className="text-info me-2" />
                <span className="text-dark">1800-0000-0000 (toll-free)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
