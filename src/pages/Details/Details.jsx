import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header.jsx";
import Sidebar from "../../components/SideBar.jsx";
import Footer from "../../components/Footer.jsx";
import Breadcrumbs from "../../components/Breadcrumbs.jsx";
import DataTableComponent from "./DetailTable.jsx";

const Details = () => {
  const location = useLocation(); // Get current path

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row mt-5">
          <Sidebar />
          <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-3">
            
            {/* Breadcrumbs Component */}
            <Breadcrumbs 
              title="Details"
              breadcrumbs={[
                { label: "Home", path: "/dashboard" },
                { label: "Details", path: location.pathname, active: true }
              ]}
            />

            <div className="d-flex justify-content-center align-content-center">
              <a href="/add-detail" className="btn btn-primary col-4 mb-5">
                Add Detail
              </a>
            </div>

            <DataTableComponent />

            <div className="container mt-5 d-flex justify-content-center">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;