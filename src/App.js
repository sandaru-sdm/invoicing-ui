import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import EmailNotification from "./pages/EmailNotification";
import Dashboard from "./pages/Dashboard";
import CustomerRegister from "./pages/Customer/CustomerRegister";
import CustomerTable from "./components/Tables/CustomerTable";
import Customer from "./pages/Customer/Customer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/customer-register" element={<CustomerRegister />} />
        <Route path="/customer-table" element={<CustomerTable />} />
        <Route path="/email-notification" element={<EmailNotification />} />
      </Routes>
    </Router>
  );
}

export default App;
