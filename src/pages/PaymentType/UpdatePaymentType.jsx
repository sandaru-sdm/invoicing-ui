import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header.jsx";
import Sidebar from "../../components/SideBar.jsx";
import Footer from "../../components/Footer.jsx";
import Breadcrumbs from "../../components/Breadcrumbs.jsx";

const UpdatePaymentType = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });

  const location = useLocation();

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("No token found. Redirecting to login...");
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchPaymentType = async () => {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/test/api/payment-type/id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const paymentType = response.data;
        console.log(paymentType);

        setName(paymentType.name);
      } catch (error) {
        console.error("Error fetching payment type:", error);
        setAlert({
          type: "error",
          message: "Failed to fetch payment type details.",
        });
      }
    };

    if (id && token) fetchPaymentType();
  }, [id, apiBaseUrl, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setAlert({ type: "danger", message: "Payment Type Name is required." });
      return;
    }

    try {
      const response = await axios.put(
        `${apiBaseUrl}/test/api/payment-type/`+ id,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const successMessage =
        response.data.message || "Payment Type updated successfully!";
      setAlert({ type: "success", message: successMessage });

      setTimeout(() => {
        navigate("/payment-type");
      }, 2000);
    } catch (error) {
      let errorMessage = "Failed to update Payment Type. Please try again.";
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
              title="Update Payment Type"
              breadcrumbs={[
                { label: "Home", path: "/dashboard" },
                { label: "Payment Types", path: "/payment-type" },
                {
                  label: "Update Payment Type",
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
                    <h4 className="card-title">Update Payment Type</h4>
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
                        <button
                          type="submit"
                          className="btn btn-primary col-sm-12 mt-3"
                        >
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

export default UpdatePaymentType;
