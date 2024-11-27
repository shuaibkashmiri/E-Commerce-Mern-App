import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0 text-center">Admin Panel</h4>
        </div>
        <div className="list-group list-group-flush">
          <NavLink
            to="/dashboard/admin/create-category"
            className={({ isActive }) =>
              `list-group-item list-group-item-action ${
                isActive ? "bg-dark text-white" : ""
              }`
            }
          >
            <i className="bi bi-folder-plus me-2"></i>
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className={({ isActive }) =>
              `list-group-item list-group-item-action ${
                isActive ? "bg-dark text-white" : ""
              }`
            }
          >
            <i className="bi bi-box-seam me-2"></i>
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className={({ isActive }) =>
              `list-group-item list-group-item-action ${
                isActive ? "bg-dark text-white" : ""
              }`
            }
          >
            <i className="bi bi-boxes me-2"></i>
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className={({ isActive }) =>
              `list-group-item list-group-item-action ${
                isActive ? "bg-dark text-white" : ""
              }`
            }
          >
            <i className="bi bi-cart-check me-2"></i>
            Orders
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
