import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const id = localStorage.getItem("id");

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/id/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const user = response.data;
        setName(user.name);
      } catch (error) {
        console.log(error);
      }
    };

    if (id && token) fetchUser();
  }, [id, apiBaseUrl, token]);

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark" style={{ boxShadow: "none" }}>
      <div className="container-fluid">
        <a className="navbar-banner fs-5 text-decoration-none text-white" href="/dashboard">
          Simple Idea
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mx-auto mb-2 mb-md-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/dashboard">Home</a>
            </li>
          </ul>

          {/* Profile Dropdown */}
          <div className="nav-item dropdown">
            <button className="btn btn-outline-success dropdown-toggle" type="button" onClick={toggleDropdown}>
              {name}
            </button>
            <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`} style={{ right: 0, left: "auto" }}>
              <li>
                <a className="dropdown-item" href="/profile">Profile</a>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;