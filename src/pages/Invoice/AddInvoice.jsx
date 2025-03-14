import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import Header from "../../components/Header.jsx";
import Sidebar from "../../components/SideBar.jsx";
import Footer from "../../components/Footer.jsx";
import Breadcrumbs from "../../components/Breadcrumbs.jsx";

const AddInvoice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const token = localStorage.getItem("token");

  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);
  const [details, setDetails] = useState([]);
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState(null);
  const [qty, setQty] = useState(1);
  const [rate, setRate] = useState(0);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [items, setItems] = useState([]);
  const [payment, setPayment] = useState(0);
  const [balance, setBalance] = useState(0);

  const [alert, setAlert] = useState({ type: "", message: "", show: false });

  const axiosConfig = useMemo(() => {
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  }, [token]);

  useEffect(() => {
    if (!token) {
      console.error("No token found. Redirecting to login...");
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [customerRes, serviceRes, detailRes, paymentTypeRes] = await Promise.all([
          axios.get(`${apiBaseUrl}/test/api/customer`, axiosConfig),
          axios.get(`${apiBaseUrl}/test/api/service`, axiosConfig),
          axios.get(`${apiBaseUrl}/test/api/detail`, axiosConfig),
          axios.get(`${apiBaseUrl}/test/api/payment-type`, axiosConfig),
        ]);

        setCustomers(customerRes.data);
        setServices(serviceRes.data);
        setDetails(detailRes.data);
        setPaymentTypes(paymentTypeRes.data);
      } catch (error) {
        console.error("Error fetching data:", error.response?.status, error.response?.data);
        setAlert({
          type: "danger",
          message: "Failed to load data. Please try again.",
          show: true,
        });
  
      }
    };

    fetchData();
  }, [apiBaseUrl, axiosConfig, navigate, token]);

  const addItem = () => {
    if (!selectedService || !selectedDetail || qty <= 0 || rate <= 0) {
      setAlert({
        type: "danger",
        message: "Please enter valid service, detail, quantity, and rate.",
        show: true,
      });
      setTimeout(() => setAlert({ ...alert, show: false }), 2000);
      return;
    }

    const newItem = {
      serviceId: selectedService.value,
      detailId: selectedDetail.value,
      qty,
      rate,
      height,
      width,
    };

    setItems([...items, newItem]);
    setSelectedService(null);
    setSelectedDetail(null);
    setQty(1);
    setRate(0);
    setHeight(0);
    setWidth(0);

    setAlert({
      type: "success",
      message: "Item added successfully.",
      show: true,
    });
    setTimeout(() => setAlert({ ...alert, show: false }), 2000);
  };

  const calculateTotal = (item) => {
    return item.width > 0 && item.height > 0
      ? item.width * item.height * item.qty * item.rate
      : item.qty * item.rate;
  };

  const grandTotal = items.reduce((sum, item) => sum + calculateTotal(item), 0);

  useEffect(() => {
    setBalance(payment - grandTotal);
  }, [grandTotal, payment]);

  const createInvoice = async () => {
    if (!selectedCustomer || items.length === 0) {
      setAlert({
        type: "danger",
        message: "Please select a customer and add at least one item.",
        show: true,
      });
      setTimeout(() => setAlert({ ...alert, show: false }), 2000);
      return;
    }
  
    const calculatedBalance = payment - grandTotal;
  
    const invoiceData = {
      customerId: selectedCustomer.value,
      invoiceItems: items,
      paymentTypeId: selectedPaymentType?.value,
      paymentAmount: payment,
      balance: calculatedBalance,
    };
  
    try {
      const response = await axios.post(
        `${apiBaseUrl}/test/api/invoices`,
        invoiceData,
        axiosConfig
      );
  
      const invoiceId = response.data;
      setAlert({
        type: "success",
        message: "Invoice created successfully!",
        show: true,
      });
  
      setTimeout(() => {
        setAlert({ ...alert, show: false });
  
        window.open(`/view-invoice/${invoiceId}`, "_blank");

        navigate("/invoice");
      }, 1000);
    } catch (error) {
      console.error("Error creating invoice:", error.response?.status, error.response?.data);
      setAlert({
        type: "danger",
        message: "Failed to create invoice. Please check the console for details.",
        show: true,
      });
      setTimeout(() => setAlert({ ...alert, show: false }), 2000);
    }
  };

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row mt-5">
          <Sidebar />
          <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-3">
            <Breadcrumbs
              title="Create Invoice"
              breadcrumbs={[
                { label: "Home", path: "/dashboard" },
                { label: "Invoice", path: "/invoice" },
                { label: "Create Invoice", path: location.pathname, active: true },
              ]}
            />

            {/* Bootstrap Alert */}
            {alert.show && (
              <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                {alert.message}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                  onClick={() => setAlert({ ...alert, show: false })}
                ></button>
              </div>
            )}

            <div className="card card-primary card-outline mb-4">
              <div className="card-header">
                <h4 className="card-title">Create Invoice</h4>
              </div>
              <div className="card-body">
                {/* Customer Selection */}
                <div className="mb-3">
                  <label>Customer</label>
                  <Select
                    options={customers.map((c) => ({ value: c.id, label: c.name }))}
                    value={selectedCustomer}
                    onChange={setSelectedCustomer}
                  />
                </div>

                {/* Service Selection */}
                <div className="mb-3">
                  <label>Service</label>
                  <Select
                    options={services.map((s) => ({ value: s.id, label: s.name }))}
                    value={selectedService}
                    onChange={setSelectedService}
                  />
                </div>

                {/* Detail Selection */}
                <div className="mb-3">
                  <label>Detail</label>
                  <Select
                    options={details.map((d) => ({ value: d.id, label: d.name }))}
                    value={selectedDetail}
                    onChange={setSelectedDetail}
                  />
                </div>

                {/* Quantity & Rate */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label>Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Rate (Rs.)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={rate}
                      onChange={(e) => setRate(Number(e.target.value))}
                    />
                  </div>
                </div>

                {/* Height & Width */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label>Height</label>
                    <input
                      type="number"
                      className="form-control"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Width</label>
                    <input
                      type="number"
                      className="form-control"
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                    />
                  </div>
                </div>

                {/* Add Item Button */}
                <div className="d-flex justify-content-center">
                  <button className="btn btn-secondary mb-3" style={{ width: '200px' }} onClick={addItem}>
                    Add Item
                  </button>
                </div>

                {/* Items Table */}
                <table className="table table-bordered mb-4">
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Detail</th>
                      <th>Quantity</th>
                      <th>Rate (Rs.)</th>
                      <th>Height</th>
                      <th>Width</th>
                      <th>Total (Rs.)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td>{services.find(s => s.id === item.serviceId)?.name || "Unknown"}</td>
                        <td>{details.find(d => d.id === item.detailId)?.name || "Unknown"}</td>
                        <td>{item.qty}</td>
                        <td>{item.rate}</td>
                        <td>{item.height}</td>
                        <td>{item.width}</td>
                        <td>{calculateTotal(item).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Grand Total */}
                <div className="d-flex justify-content-between fw-bold mb-3">
                  <span>Grand Total (Rs.):</span>
                  <span>{grandTotal.toFixed(2)}</span>
                </div>

                {/* Payment Type and Amount */}
                <div className="mb-3">
                  <label>Payment Type</label>
                  <Select
                    options={paymentTypes.map((pt) => ({ value: pt.id, label: pt.name }))}
                    value={selectedPaymentType}
                    onChange={setSelectedPaymentType}
                  />
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label>Payment (Rs.)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={payment}
                      onChange={(e) => setPayment(Number(e.target.value))}
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Balance (Rs.)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={balance.toFixed(2)}
                      readOnly
                    />
                  </div>
                </div>

                {/* Create Invoice Button */}
                <div className="d-flex justify-content-center">
                  <button className="btn btn-primary mb-3" style={{ width: '200px', fontSize: '16px' }} onClick={createInvoice}>
                    Create Invoice
                  </button>
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

export default AddInvoice;