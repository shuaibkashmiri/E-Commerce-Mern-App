import React from "react";
import Layout from "../components/layout/Layout";

const Policy = () => {
  return (
    <Layout>
      <div className="container my-5">
        <div className="row align-items-center">
          {/* Image Section */}
          <div className="col-md-6">
            <img
              src="/images/contactus.jpeg"
              alt="Privacy Policy"
              className="img-fluid rounded shadow"
            />
          </div>

          {/* Privacy Policy Section */}
          <div className="col-md-6">
            <h2 className="bg-primary text-white p-3 text-center rounded">
              Privacy Policy
            </h2>
            <div className="mt-4">
              <p>
                Your privacy is important to us. We are committed to protecting
                your personal data and ensuring transparency in how we handle
                your information.
              </p>
              <ul className="list-unstyled">
                <li className="mb-3">
                  1. We do not share your information without your consent.
                </li>
                <li className="mb-3">
                  2. Your data is securely stored and processed.
                </li>
                <li className="mb-3">
                  3. We use your data to provide a better experience.
                </li>
                <li className="mb-3">
                  4. You can request access to or deletion of your data at any
                  time.
                </li>
                <li className="mb-3">
                  5. Our policies comply with legal standards and best
                  practices.
                </li>
                <li className="mb-3">
                  6. Cookies are used to enhance your browsing experience.
                </li>
                <li className="mb-3">
                  7. For questions, contact us at privacy@company.com.
                </li>
              </ul>
              <p>
                Please reach out to us for any concerns or more details about
                our privacy policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
