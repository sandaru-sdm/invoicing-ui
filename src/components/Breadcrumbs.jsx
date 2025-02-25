import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ title, breadcrumbs }) => {
  return (
    <div className="row d-flex justify-content-between align-items-center">
      <div className="col-auto">
        <h3>{title}</h3>
      </div>
      <div className="col-auto">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-light p-3 rounded">
            {breadcrumbs.map((crumb, index) => (
              <li 
                key={index} 
                className={`breadcrumb-item ${crumb.active ? "active" : ""}`} 
                aria-current={crumb.active ? "page" : undefined}
              >
                {crumb.active ? (
                  crumb.label
                ) : (
                  <Link to={crumb.path}>{crumb.label}</Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumbs;