import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net";

const DataTableComponent = () => {
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Initialize DataTables
    dataTableRef.current = $(tableRef.current).DataTable();

    return () => {
      // Destroy DataTables instance when component unmounts
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
        const response = await fetch(`${apiBaseUrl}/test/api/customer`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Unauthorized or invalid token.");
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        const data = await response.json();

        // Clear the existing table and populate it with new data
        if (dataTableRef.current) {
          dataTableRef.current.clear();
          dataTableRef.current.rows.add(
            data.map((customer) => [
              customer.id,
              customer.name,
              customer.email,
              customer.mobile,
              `<button class="btn btn-success btn-update col-12" data-id="${customer.id}">Update</button>`
            ])
          );
          dataTableRef.current.draw();
        }

        $(".btn-update").on("click", function () {
          const customerId = $(this).data("id");
          navigate(`/update-customer/${customerId}`);
        });

      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <table ref={tableRef} className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
};

export default DataTableComponent;