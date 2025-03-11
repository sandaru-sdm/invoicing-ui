import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "./logo.jpg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function ViewInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("token");

  const [customerID, setCustomerID] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [payment, setPayment] = useState("");
  const [balance, setBalance] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [loading, setLoading] = useState({
    download: false,
    print: false,
    whatsapp: false,
    email: false,
  });

  useEffect(() => {
    if (!token) {
      console.error("No token found. Redirecting to login...");
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/test/api/invoices/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const invoice = response.data;
        setCustomerID(invoice.customerId);
        setCustomerName(invoice.customerName);
        setInvoiceId(invoice.invoiceId);
        setInvoiceDate(invoice.invoiceDate);
      } catch (error) {
        console.error("Failed to fetch invoice details.");
      }
    };

    if (id && token) fetchInvoice();
  }, [id, apiBaseUrl, token]);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!customerID) return;

      try {
        const response = await axios.get(
          `${apiBaseUrl}/test/api/customer/id/${customerID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const customer = response.data;
        setCustomerEmail(customer.email);
        setCustomerMobile(customer.mobile);
      } catch (error) {
        console.error("Failed to fetch customer details.");
      }
    };

    fetchCustomer();
  }, [customerID, apiBaseUrl, token]);

  useEffect(() => {
    const fetchInvoicePayment = async () => {
      if (!id) return;

      try {
        const response = await axios.get(
          `${apiBaseUrl}/test/api/invoices/payment/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const payment = response.data;
        setPayment(payment.payment);
        setBalance(payment.balance);
        setPaymentType(payment.paymentTypeName);
      } catch (error) {
        console.error("Failed to fetch payment details.");
      }
    };

    fetchInvoicePayment();
  }, [id, apiBaseUrl, token]);

  useEffect(() => {
    const fetchInvoiceItems = async () => {
      if (!id) return;

      try {
        const response = await axios.get(
          `${apiBaseUrl}/test/api/invoices/items/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setInvoiceItems(response.data);
      } catch (error) {
        console.error("Failed to fetch invoice items.");
      }
    };

    fetchInvoiceItems();
  }, [id, apiBaseUrl, token]);

  const totalAmount = invoiceItems.reduce(
    (sum, item) => sum + item.totalAmount,
    0
  );

  const handlePrint = () => {
    setLoading((prev) => ({ ...prev, print: true }));
    window.print();
    setLoading((prev) => ({ ...prev, print: false }));
  };

  const generatePDF = async () => {
    const invoiceElement = document.getElementById("invoice-section");
    if (!invoiceElement) return null;

    const canvas = await html2canvas(invoiceElement);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

    return pdf;
  };

  const handleDownload = async () => {
    setLoading((prev) => ({ ...prev, download: true }));

    const pdf = await generatePDF();
    if (pdf) {
      const today = new Date().toISOString().split("T")[0];
      pdf.save(
        `SimpleIdeaInvoices-${today}-${customerName}-invoice${invoiceId}.pdf`
      );
    }

    setLoading((prev) => ({ ...prev, download: false }));
  };

  const handleSendInvoiceViaEmail = async () => {
    console.log("Preparing to send invoice via email...");

    if (!customerEmail) {
      alert("Customer email is missing!");
      return;
    }

    setLoading((prev) => ({ ...prev, email: true }));

    try {
      const pdf = await generatePDF();
      if (!pdf) {
        alert("Failed to generate PDF.");
        return;
      }

      const pdfBlob = pdf.output("blob");

      const formData = new FormData();
      formData.append("email", customerEmail);
      formData.append("customerName", customerName);
      formData.append("invoiceFile", pdfBlob, `invoice_${invoiceId}.pdf`);

      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      await axios.post(
        `${apiBaseUrl}/test/api/invoices/send-invoice-pdf`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Invoice sent successfully!");
    } catch (error) {
      console.error("Failed to send email.", error);
      alert("Failed to send email.");
    } finally {
      setLoading((prev) => ({ ...prev, email: false }));
    }
  };

  return (
    <div>
      <section className="py-2 py-md-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-9 col-xl-8 col-xxl-7">
              <div id="invoice-section">
                <div className="row col-12">
                  <div className="col-8">
                    <img alt="Logo" src={logo} />
                  </div>
                  <div className="col-4">
                    <address className="">
                      Phone 1: (+94) 71 20 64 592
                      <br />
                      Phone 2: (+94) 72 80 69 999
                      <br />
                      Phone 3: (+94) 33 22 18 294
                      <br />
                      Email: simpleidea@gmail.com
                    </address>
                  </div>
                </div>

                <hr />

                <div className="col-12">
                  <h2 className="text-uppercase text-center m-0">Invoice</h2>
                </div>

                <div className="row mt-3">
                  <div className="col-md-6">
                    <h4>From</h4>
                    <address>
                      <strong>Simple Idea</strong>
                      <br />
                      131/1, Colombo - Kandy Road,
                      <br />
                      Western Province, 11856
                      <br />
                      Sri Lanka.
                      <br />
                      Phone: (+94) 71 20 64 592
                      <br />
                      Email: simpleidea@gmail.com
                    </address>
                  </div>
                  <div className="col-md-6 text-end">
                    <div className="row">
                      <div className="col-6"></div>
                      <div className="col-6 text-start">
                        <h4>Bill To</h4>
                        <strong>{customerName}</strong>
                        <br />
                        Phone: {customerMobile}
                        <br />
                        Email: {customerEmail}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 d-flex justify-content-between">
                    <div>
                      <h5>Invoice #</h5>
                      <p>{invoiceId}</p>
                    </div>
                    <div>
                      <h5>Invoice Date</h5>
                      <p>{invoiceDate}</p>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-12">
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col" className="text-uppercase">
                              Product
                            </th>
                            <th
                              scope="col"
                              className="text-uppercase text-center"
                            >
                              Height
                            </th>
                            <th
                              scope="col"
                              className="text-uppercase text-center"
                            >
                              Width
                            </th>
                            <th
                              scope="col"
                              className="text-uppercase text-center"
                            >
                              Rate
                            </th>
                            <th
                              scope="col"
                              className="text-uppercase text-center"
                            >
                              Qty
                            </th>
                            <th scope="col" className="text-uppercase text-end">
                              Amount (RS.)
                            </th>
                          </tr>
                        </thead>
                        <tbody className="table-group-divider">
                          {invoiceItems.map((item) => (
                            <tr key={item.id}>
                              <td>
                                {item.serviceName} ({item.detailName})
                              </td>
                              <td className="text-center">{item.height}</td>
                              <td className="text-center">{item.width}</td>
                              <td className="text-center">{item.rate}</td>
                              <td className="text-center">{item.qty}</td>
                              <td className="text-end">{item.totalAmount}</td>
                            </tr>
                          ))}
                          <tr>
                            <th
                              scope="row"
                              colSpan="5"
                              className="text-uppercase text-end"
                            >
                              Total
                            </th>
                            <td className="text-end">Rs. {totalAmount}</td>
                          </tr>
                          <tr>
                            <td className="text-end">Payment Type</td>
                            <td className="text-end fw-bold">{paymentType}</td>
                            <td colSpan="3" className="text-end">
                              Payment
                            </td>
                            <td className="text-end">Rs. {payment}</td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              colSpan="5"
                              className="text-uppercase text-end"
                            >
                              Balance
                            </th>
                            <td className="text-end fw-bold">Rs. {balance}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className=" col-3">
                  <a href="/dashboard" className="btn btn-secondary mx-1">
                    Dashboard
                  </a>
                </div>
                <div className="col-9 text-end">
                  <button
                    className="btn btn-primary mx-1"
                    onClick={handleDownload}
                    disabled={loading.download}
                  >
                    {loading.download ? "Downloading..." : "Download Invoice"}
                  </button>
                  <button
                    className="btn btn-danger mx-1"
                    onClick={handlePrint}
                    disabled={loading.print}
                  >
                    {loading.print ? "Printing..." : "Print Invoice"}
                  </button>
                  <button
                    className="btn btn-success mx-1"
                    onClick={handleSendInvoiceViaEmail}
                    disabled={loading.email}
                  >
                    {loading.email ? "Sending..." : "Send Via Email"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ViewInvoice;
