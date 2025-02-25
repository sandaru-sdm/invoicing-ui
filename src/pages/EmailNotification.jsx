import React from "react";

function EmailNotification() {
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center min-vh-100 text-center">
      <div className="h1 font-monospace mb-3">
        We sent you a password reset email.
      </div>
      <div className="h3 font-monospace">
        Please check your inbox.
      </div>
    </div>
  );
}

export default EmailNotification;
