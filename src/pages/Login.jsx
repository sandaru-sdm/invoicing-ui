import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "admin-lte/dist/css/adminlte.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "admin-lte/dist/js/adminlte.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    try {
      const response = await axios.post(apiBaseUrl + "/api/auth/authenticate", {
        email,
        password,
      });

      console.log("API Response:", response.data);

      if (!response.data || !response.data.token) {
        throw new Error("Invalid API response");
      }

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.userRole);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);

      let errorMessage = "An error occurred. Please try again.";

      if (err.response) {
        if (typeof err.response.data === "string") {
          // Plain text error message from backend
          errorMessage = err.response.data;
        } else if (err.response.data?.message) {
          // JSON error message
          errorMessage = err.response.data.message;
        }
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex container justify-content-center align-items-center min-vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{ minWidth: "350px", maxWidth: "400px" }}
      >
        <h2 className="text-center">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-3">
          <a href="/forgot-password">Forgot Password?</a>
        </p>
      </div>
    </div>
  );
}

export default Login;