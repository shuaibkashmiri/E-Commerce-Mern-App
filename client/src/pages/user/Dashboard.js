import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title="User Dashboard">
      <div className="container my-4">
        <div className="row">
          {/* User Menu Section */}
          <div className="col-md-3">
            <UserMenu />
          </div>

          {/* User Information Section */}
          <div className="col-md-9">
            <div className="card shadow-sm p-4">
              <h2 className="text-center mb-4">User Information</h2>
              <div className="mb-3">
                <h4>
                  <strong>Name:</strong> {auth?.user?.name || "N/A"}
                </h4>
              </div>
              <div className="mb-3">
                <h4>
                  <strong>Email:</strong> {auth?.user?.email || "N/A"}
                </h4>
              </div>
              <div className="mb-3">
                <h4>
                  <strong>Address:</strong> {auth?.user?.address || "N/A"}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
