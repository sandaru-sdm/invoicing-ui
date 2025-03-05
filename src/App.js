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
import Services from "./pages/Service/Services";
import AddService from "./pages/Service/AddService";
import UpdateService from "./pages/Service/UpdateService";
import UserRegister from "./pages/User/UserRegister";
import Users from "./pages/User/Users";
import UpdateUser from "./pages/User/UpdateUser";
import Profile from "./pages/User/Profile";
import UpdateProfile from "./pages/User/UpdateProfile";

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

        <Route path="/services" element={<Services />} />
        <Route path="/add-service" element={<AddService />} />
        <Route path="/update-service/:id" element={<UpdateService />} />   

        <Route path="/users" element={<Users />} />
        <Route path="/add-user" element={<UserRegister />} />
        <Route path="/update-user/:id" element={<UpdateUser />} />  

        <Route path="/profile" element={<Profile />} />
        <Route path="/update-profile" element={<UpdateProfile />} />

      </Routes>
    </Router>
  );
}

export default App;
