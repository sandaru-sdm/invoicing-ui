import React, { useState } from "react";
import axios from "axios";
import Header from "../../components/Header.jsx";
import Sidebar from "../../components/SideBar.jsx";
import Footer from "../../components/Footer.jsx";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs.jsx";
import { useLocation } from "react-router-dom";

const CustomerRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const navigate = useNavigate();
  const location = useLocation();

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found. Redirecting to login...");
    navigate("/login");
    return;
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidSriLankanMobile = (mobile) => {
    const slMobileRegex = /^(?:\+94|0)(7[01245678])[0-9]{7}$/;
    return slMobileRegex.test(mobile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setAlert({ type: "danger", message: "Name is required." });
      return;
    }
    if (!isValidEmail(email)) {
      setAlert({
        type: "danger",
        message: "Please enter a valid email address.",
      });
      return;
    }
    if (!isValidSriLankanMobile(mobile)) {
      setAlert({
        type: "danger",
        message: "Please enter a valid mobile number.",
      });
      return;
    }

    try {
      const response = await axios.post(
        `${apiBaseUrl}/test/api/customer/save`,
        { name, email, mobile },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const successMessage =
        response.data.message || "Customer registered successfully!";
      setAlert({ type: "success", message: successMessage });

      setTimeout(() => {
        navigate("/customer");
      }, 500);
    } catch (error) {
      let errorMessage = "Failed to register customer. Please try again.";
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      setAlert({ type: "danger", message: errorMessage });
    }
  };

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <div className="mt-5 pt-3 col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {/* Breadcrumbs Component */}
            <Breadcrumbs
              title="Customers"
              breadcrumbs={[
                { label: "Home", path: "/dashboard" },
                { label: "Customers", path: "/customer" },
                {
                  label: "Customer Register",
                  path: location.pathname,
                  active: true,
                },
              ]}
            />
          </div>

          <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="container mt-2 d-flex justify-content-center mb-5">
              <div className="col-md-6">
                <div className="card card-primary card-outline mb-4">
                  <div className="card-header">
                    <h4 className="card-title">Customer Registration</h4>
                  </div>
                  <div className="card-body">
                    {alert.message && (
                      <div className={`alert alert-${alert.type}`} role="alert">
                        {alert.message}
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input
                          className="form-control"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="mobile" className="form-label">
                          Mobile Number
                        </label>
                        <input
                          className="form-control"
                          id="mobile"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                        />
                      </div>

                      <div className="card-footer d-flex justify-content-center mt-2">
                        <button type="submit" className="btn btn-primary col-sm-12 mt-3">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegister;
