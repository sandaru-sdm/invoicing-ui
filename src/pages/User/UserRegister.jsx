import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header.jsx";
import Sidebar from "../../components/SideBar.jsx";
import Footer from "../../components/Footer.jsx";
import Breadcrumbs from "../../components/Breadcrumbs.jsx";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [submit, setSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

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
        setEmail(user.email);
        setPassword(user.password);
        setRole(user.role);
      } catch (error) {
        setAlert({
          type: "danger",
          message:
            error.response?.data?.message || "Failed to fetch user details.",
        });
      }
    };

    if (id && token) fetchUser();
  }, [id, apiBaseUrl, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);

    if (!name.trim() || !email.trim()) {
      setAlert({ type: "danger", message: "Name and Email are required." });
      return;
    }

    try {
      const response = await axios.put(
        `${apiBaseUrl}/api/${id}`,
        { name, email, role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setAlert({
        type: "success",
        message: response.data.message || "User updated successfully!",
      });

      setTimeout(() => {
        navigate("/users");
      }, 2000);
    } catch (error) {
      setAlert({
        type: "danger",
        message: error.response?.data?.message || "Failed to update user.",
      });
    }
  };

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <div className="mt-5 pt-3 col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Breadcrumbs
              title="Update User"
              breadcrumbs={[
                { label: "Home", path: "/dashboard" },
                { label: "Users", path: "/users" },
                { label: "Update User", path: location.pathname, active: true },
              ]}
            />
          </div>

          <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="container mt-2 d-flex justify-content-center mb-5">
              <div className="col-md-6">
                <div className="card card-primary card-outline mb-4">
                  <div className="card-header">
                    <h4 className="card-title">Update User</h4>
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
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value={email}
                          disabled
                        />
                      </div>

                      <div className="mb-3 position-relative">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <div className="input-group">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <i
                              className={`bi ${
                                showPassword ? "bi-eye-slash" : "bi-eye"
                              }`}
                            ></i>
                          </button>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="role" className="form-label">
                          Role
                        </label>
                        <select
                          className="form-control"
                          id="role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <option value="USER">User</option>
                          <option value="ADMIN">Admin</option>
                        </select>
                      </div>

                      <div className="card-footer d-flex justify-content-center mt-2">
                        <button
                          type="submit"
                          className="btn btn-primary col-sm-12 mt-3"
                          disabled={submit}
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

export default UpdateUser;
