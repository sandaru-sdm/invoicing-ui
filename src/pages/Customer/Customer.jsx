import React from "react";
import Header from "../../components/Header/Header.jsx";
import Sidebar from "../../components/SideBar/SideBar.jsx";
import Footer from "../../components/Footer.jsx";
import DataTableComponent from "../../components/Tables/CustomerTable.jsx";

const Customer = () => {
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row mt-5">
          <Sidebar />
          <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-5">
            <div className=" d-flex justify-content-center align-content-center">
                <a href="/customer-register" className="btn btn-primary col-4 mb-5">Add Customer</a>
            </div>
            <DataTableComponent/>
           <div className="container mt-5 d-flex justify-content-center ">
                <Footer/>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Customer;
