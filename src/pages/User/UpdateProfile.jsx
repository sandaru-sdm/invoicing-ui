import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";

function UpdateProfile() {
  const id = localStorage.getItem("id");
  const navigate = useNavigate();

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
    if (!token) {
      console.error("No token found. Redirecting to login...");
      navigate("/login");
    }
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

    if (!name.trim()) {
      setAlert({ type: "danger", message: "Name is required." });
      return;
    }
    if (!email.trim()) {
      setAlert({ type: "danger", message: "Email is required." });
      return;
    }

    const formattedRole = role.toUpperCase();

    try {
      const response = await axios.put(
        `${apiBaseUrl}/api/${id}`,
        { name, password, email, userRole: formattedRole },
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
        navigate("/profile");
      }, 2000);
    } catch (error) {
      setAlert({
        type: "danger",
        message:
          error.response?.data?.message ||
          "Failed to update user. Please try again.",
      });
      setTimeout(() => {
        navigate("/users");
      }, 2000);
    }
  };

  return (
    <div>
      <Header />
      <div
        className="d-flex justify-content-center align-items-center min-vh-100 mt-2"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="col-md-6">
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h4 className="card-title text-center">Update Profile</h4>
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
                    onChange={(e) => setEmail(e.target.value)}
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
                    disabled
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
  );
}

export default UpdateProfile;