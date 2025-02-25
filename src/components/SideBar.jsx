import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Sidebar = () => {
  // const location = useLocation();

  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item fs-5 btn btn-outline-success m-2">
            <NavLink
              className="nav-link"
              to="/dashboard"
              activeClassName="active"
              style={({ isActive }) => ({
                color: isActive ? "green" : "",
              })}
            >
              Dashboard
            </NavLink>
          </li>

          <li className="nav-item fs-5 btn btn-outline-success m-2">
            <NavLink
              className="nav-link"
              to="/customer"
              activeClassName="active"
              style={({ isActive }) => ({
                color: isActive ? "green" : "",
              })}
            >
              Customers
            </NavLink>
          </li>     
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
