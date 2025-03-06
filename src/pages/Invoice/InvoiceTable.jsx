import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net";

const DataTableComponent = () => {
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    dataTableRef.current = $(tableRef.current).DataTable();

    return () => {
      if (dataTableRef.current) {
        dataTableRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found. Redirecting to login...");
        navigate("/login");
        return;
      }

      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
      try {
        const response = await fetch(`${apiBaseUrl}/test/api/invoices`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const invoices = await response.json();

        if (dataTableRef.current) {
          dataTableRef.current.clear();

          invoices.forEach((invoice) => {
            let invoiceTotalAmount = 0; 

            const invoiceDetails = invoice.invoiceItems
              .map((item) => {
                let totalAmount = item.rate * item.qty; 
                if (item.height && item.width) {
                  totalAmount = item.height * item.width * item.rate * item.qty; 
                }

                invoiceTotalAmount += totalAmount; 

                const height = item.height ? `${item.height}` : "N/A";
                const width = item.width ? `${item.width}` : "N/A";

                return `
                <tr>
                  <td>${item.serviceName}</td>
                  <td>${item.detailName}</td>
                  <td>${height}</td>
                  <td>${width}</td>
                  <td>${item.rate}</td>
                  <td>${item.qty}</td>
                  <td>${totalAmount}</td> <!-- Show the calculated total -->
                </tr>
              `;
              })
              .join("");

            dataTableRef.current.row.add([
              invoice.invoiceId,
              invoice.invoiceDate,
              invoice.customerName,
              `<table class="table table-bordered invoice-details">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Detail</th>
                    <th>Height</th>
                    <th>Width</th>
                    <th>Rate</th>
                    <th>Qty</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${invoiceDetails}
                </tbody>
              </table>`,
              invoiceTotalAmount,
              invoice.invoicePayment.payment,
              invoice.invoicePayment.balance,
            ]);
          });

          dataTableRef.current.draw();
        }
      } catch (error) {
        console.error("Error fetching invoice data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <table ref={tableRef} className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Invoice ID</th>
          <th>Date</th>
          <th>Customer</th>
          <th>Detail</th>
          <th>Total Amount</th>
          <th>Payment</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
};

export default DataTableComponent;