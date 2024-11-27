import React from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Admin Dashboard"}>
      <div className="container-fluid py-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <AdminMenu />
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <div className="card shadow border-0">
              <div className="card-header bg-dark text-white">
                <h4 className="mb-0 text-center">Admin Dashboard</h4>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <h5>
                    <i className="bi bi-person-circle me-2"></i>
                    Admin Name:{" "}
                    <span className="fw-bold">{auth?.user?.name}</span>
                  </h5>
                </div>
                <div className="mb-3">
                  <h5>
                    <i className="bi bi-envelope me-2"></i>
                    Admin Email:{" "}
                    <span className="fw-bold">{auth?.user?.email}</span>
                  </h5>
                </div>
                <div className="mb-3">
                  <h5>
                    <i className="bi bi-telephone me-2"></i>
                    Admin Contact:{" "}
                    <span className="fw-bold">{auth?.user?.phone}</span>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
