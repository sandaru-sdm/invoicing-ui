import React from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./style/dashboard.css";
import Header from "../components/Header/Header";
import Sidebar from "../components/SideBar/SideBar";
import Footer from "../components/Footer";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <h1 className="h2">Dashboard</h1>
            <canvas id="myChart" width="900" height="380"></canvas>
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
