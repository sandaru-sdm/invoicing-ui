import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./style/dashboard.css";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
// import Footer from "../components/Footer";
import Widgets from "./Dashboard/Widgets";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); 

    if (!token) {
      console.error("No token found. Redirecting to login...");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 mt-5">
            <h1 className="h2 mt-4 mb-4">Dashboard</h1>
            <Widgets/>
            {/* <Footer /> */}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
