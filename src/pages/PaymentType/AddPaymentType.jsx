import React, { useState } from "react";
import axios from "axios";
import Header from "../../components/Header.jsx";
import Sidebar from "../../components/SideBar.jsx";
import Footer from "../../components/Footer.jsx";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs.jsx";
import { useLocation } from "react-router-dom";

const AddPaymentType = () => {
  const [name, setName] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setAlert({ type: "danger", message: "Payment Type Name is required." });
      return;
    }

    try {
      const response = await axios.post(
        `${apiBaseUrl}/test/api/payment-type/save`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const successMessage =
        response.data.message || "Payment Type Saved successfully!";
      setAlert({ type: "success", message: successMessage });

      setTimeout(() => {
        navigate("/payment-type");
      }, 2000);
    } catch (error) {
      let errorMessage = "Failed to save paymnet type. Please try again.";
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
              title="Save Payment Type"
              breadcrumbs={[
                { label: "Home", path: "/dashboard" },
                { label: "Payment Types", path: "/payment-type" },
                {
                  label: "Save Payment Type",
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
                    <h4 className="card-title">Save Payment Types</h4>
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
                          Payment Type Name
                        </label>
                        <input
                          className="form-control"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
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

export default AddPaymentType;
