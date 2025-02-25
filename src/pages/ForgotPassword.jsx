import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false); // New state for loading
    const navigate = useNavigate();
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Disable button
        

        try {
            const response = await axios.post(apiBaseUrl+"/api/forgot-password", { email });
            setMessage(response.data);
            setTimeout(() => navigate("/email-notification"), 2000); // Redirect after delay
        } catch (error) {
            setMessage("Error sending reset link.");
        } finally {
            setLoading(false); // Re-enable button after request completes
        }
    };

    return (
        <div className="d-flex container justify-content-center align-items-center min-vh-100">
            <div className="card p-4 shadow-lg">
                <h2 className="text-center">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            disabled={loading} // Disable input while loading
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Sending..." : "Submit"}
                    </button>
                </form>
                {message && <div className="alert alert-info mt-3">{message}</div>}
            </div>
        </div>
    );
}

export default ForgotPassword;
