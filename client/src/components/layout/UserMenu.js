import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="card shadow-sm p-3">
      <div className="text-center mb-3">
        {/* Dark Background Heading */}
        <h4 className="bg-dark text-white p-2 rounded">Dashboard</h4>
      </div>
      <div className="list-group">
        <NavLink
          to="/dashboard/user/profile"
          className="list-group-item list-group-item-action"
          activeClassName="bg-dark text-white"
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className="list-group-item list-group-item-action"
          activeClassName="bg-dark text-white"
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
