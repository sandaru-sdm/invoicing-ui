import React from "react";
import Header from "../../components/Header/Header.jsx";
import Sidebar from "../../components/SideBar/SideBar.jsx";
import Footer from "../../components/Footer.jsx";

const CustomerRegister = () => {
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="container mt-5 d-flex justify-content-center mb-5">
              <div className="col-md-6 mt-5">
                <div className="card card-primary card-outline mb-4">
                  <div className="card-header">
                    <div className="card-title">Customer Registration</div>
                  </div>
                  <form>
                    <div className="card-body">
                      <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">
                          Email address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                        <div id="emailHelp" className="form-text">
                          We'll never share your email with anyone else.
                        </div>
                      </div>
                      <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="exampleInputPassword1"
                        />
                      </div>
                      <div className="input-group mb-3">
                        <input
                          type="file"
                          className="form-control"
                          id="inputGroupFile02"
                        />
                        <label className="input-group-text" for="inputGroupFile02">
                          Upload
                        </label>
                      </div>
                      <div className="mb-3 form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="exampleCheck1"
                        />
                        <label className="form-check-label" for="exampleCheck1">
                          Check me out
                        </label>
                      </div>
                    </div>

                    <div className="card-footer">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
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

export default CustomerRegister;
