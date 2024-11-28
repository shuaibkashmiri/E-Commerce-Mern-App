import React, { useState } from "react";
import Layout from "./../../components/layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Forgot Password - Ecommerce APP"}>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="card shadow-sm p-4"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h4 className="text-center mb-4">Reset Your Password</h4>
          <form onSubmit={handleSubmit}>
            {/* Email input */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Security question input */}
            <div className="mb-3">
              <label htmlFor="answer" className="form-label">
                Favorite Sport Name
              </label>
              <input
                type="text"
                id="answer"
                className="form-control"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter your favorite sport name"
                required
              />
            </div>

            {/* New password input */}
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                required
              />
            </div>

            {/* Submit button */}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
