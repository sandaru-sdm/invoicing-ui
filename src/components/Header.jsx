import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark" style={{ boxShadow: "none" }}>
      <div className="container-fluid">
        <a className="navbar-banner fs-5 text-decoration-none text-white" href="/dashboard">
          Simple Idea
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mx-auto mb-2 mb-md-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/dashboard">
                Home
              </a>
            </li>
          </ul>
          <button className="btn btn-outline-danger" type="button" onClick={handleLogout}>
            Log-out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;