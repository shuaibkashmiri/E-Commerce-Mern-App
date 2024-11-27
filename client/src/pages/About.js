import React from "react";
import Layout from "../components/layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container my-5">
        <div className="row align-items-center">
          {/* Image Section */}
          <div className="col-md-6">
            <img
              src="/images/aboutus.jpg"
              alt="About Us"
              className="img-fluid rounded shadow"
            />
          </div>

          {/* Text Section */}
          <div className="col-md-6">
            <h2 className="mb-4">About Us</h2>
            <p className="text-muted">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              officiis obcaecati esse tempore unde ratione, eveniet mollitia,
              perferendis eius temporibus dicta blanditiis doloremque explicabo
              quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
              accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
              commodi illum quidem neque tempora nam.
            </p>
            <button className="btn btn-primary mt-3">Learn More</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
