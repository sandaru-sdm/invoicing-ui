import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import EmailNotification from "./pages/EmailNotification";
import Dashboard from "./pages/Dashboard";
import CustomerRegister from "./pages/Customer/CustomerRegister";
import Customer from "./pages/Customer/Customer";
import CustomerUpdate from "./pages/Customer/CustomerUpdate";
import PaymentType from "./pages/PaymentType/PaymentTypes";
import AddPaymentType from "./pages/PaymentType/AddPaymentType";
import UpdatePaymentType from "./pages/PaymentType/UpdatePaymentType";
import Details from "./pages/Details/Details";
import AddDetail from "./pages/Details/AddDetail";
import UpdateDetail from "./pages/Details/UpdateDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/email-notification" element={<EmailNotification />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/customer" element={<Customer />} />
        <Route path="/customer-register" element={<CustomerRegister />} />
        <Route path="/update-customer/:id" element={<CustomerUpdate />} />

        <Route path="/payment-type" element={<PaymentType />} />
        <Route path="/add-payment-type" element={<AddPaymentType />} />
        <Route path="/update-payment-type/:id" element={<UpdatePaymentType />} />      

        <Route path="/details" element={<Details />} />
        <Route path="/add-detail" element={<AddDetail />} />
        <Route path="/update-detail/:id" element={<UpdateDetail />} />    

      </Routes>
    </Router>
  );
}

export default App;
