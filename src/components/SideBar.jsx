import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Sidebar = () => {
  const userRole = localStorage.getItem("role"); // Get the user role from localStorage

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
              style={({ isActive }) => ({
                color: isActive ? "green" : "",
              })}
            >
              Dashboard
            </NavLink>
          </li>

          {(userRole === "SUPER_ADMIN" || userRole === "ADMIN") && (
            <li className="nav-item fs-5 btn btn-outline-success m-2">
              <NavLink
                className="nav-link"
                to="/users"
                style={({ isActive }) => ({
                  color: isActive ? "green" : "",
                })}
              >
                Users
              </NavLink>
            </li>
          )}

          <li className="nav-item fs-5 btn btn-outline-success m-2">
            <NavLink
              className="nav-link"
              to="/customer"
              style={({ isActive }) => ({
                color: isActive ? "green" : "",
              })}
            >
              Customers
            </NavLink>
          </li>

          <li className="nav-item fs-5 btn btn-outline-success m-2">
            <NavLink
              className="nav-link"
              to="/payment-type"
              style={({ isActive }) => ({
                color: isActive ? "green" : "",
              })}
            >
              Payment Types
            </NavLink>
          </li>

          <li className="nav-item fs-5 btn btn-outline-success m-2">
            <NavLink
              className="nav-link"
              to="/services"
              style={({ isActive }) => ({
                color: isActive ? "green" : "",
              })}
            >
              Services
            </NavLink>
          </li>

          <li className="nav-item fs-5 btn btn-outline-success m-2">
            <NavLink
              className="nav-link"
              to="/details"
              style={({ isActive }) => ({
                color: isActive ? "green" : "",
              })}
            >
              Details
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;