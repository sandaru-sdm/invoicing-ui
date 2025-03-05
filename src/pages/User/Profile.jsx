import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const id = localStorage.getItem("id");
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

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
        console.log(user);
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
      } catch (error) {
        console.log(error);
      }
    };

    if (id && token) fetchUser();
  }, [id, apiBaseUrl, token]);

  return (
    <div>
      <Header />
      <div
        className="d-flex justify-content-center align-items-center min-vh-100"
        style={{ backgroundColor: "#9de2ff" }}
      >
        <div className="col-md-9 col-lg-7 col-xl-6">
          <div className="card" style={{ borderRadius: "15px" }}>
            <div className="card-body p-4">
              <div className="d-flex">
                <div className="flex-shrink-0">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    alt="Profile"
                    className="img-fluid"
                    style={{ width: "180px", borderRadius: "10px" }}
                  />
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className="mb-1">{name}</h5>
                  <p className="mb-2 pb-1">{email}</p>
                  <div className="d-flex justify-content-start rounded-3 p-2 mb-2 bg-body-tertiary">
                    <div>
                      <p className="small text-muted mb-1">ID</p>
                      <p className="mb-0">{id}</p>
                    </div>
                    <div className="px-3">
                      <p className="small text-muted mb-1">Role</p>
                      <p className="mb-0">{role}</p>
                    </div>
                  </div>
                  <div className="d-flex pt-1">
                    <a
                      type="button"
                      className="btn btn-primary flex-grow-1"
                      href="/update-profile"
                    >
                      Update
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
