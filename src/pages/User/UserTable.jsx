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
        const response = await fetch(`${apiBaseUrl}/api`, {
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

        // Clear and populate DataTable
        if (dataTableRef.current) {
          dataTableRef.current.clear();
          dataTableRef.current.rows.add(
            data.map((user) => [
              user.id,
              user.name,
              user.email,
              user.role,
              `<button class="btn btn-success btn-update col-12" data-id="${user.id}" 
                  ${user.role === "SUPER_ADMIN" ? "disabled" : ""}>
                  Update
                </button>`,
            ])
          );
          dataTableRef.current.draw();
        }

        // Attach click event to the update buttons
        $(".btn-update").off("click").on("click", function () {
          const userId = $(this).data("id");
          navigate(`/update-user/${userId}`);
        });
      } catch (error) {
        console.error("Error fetching User data:", error);
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
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
};

export default DataTableComponent;
