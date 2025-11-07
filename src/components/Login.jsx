import React, { useState } from "react";
import { AuthContext } from "../context/AuthProviderContext";
import { useContext } from "react";
import { Link , useNavigate } from "react-router-dom";
export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showAlert, setShowAlert] = useState({ show: false, message: "", type: "" });
  const {setIsLogin  } =  useContext(AuthContext)
  const navigate  =  useNavigate()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        setShowAlert({ show: true, message: data.message, type: "success" });
        localStorage.setItem("token", data.token);
        localStorage.setItem("userID", data.user._id);
        setTimeout(() => {
          setShowAlert({ show: false, message: "", type: "" });
          setIsLogin(true)
          navigate("/")
        }, 2000);
      } else {
        setShowAlert({ show: true, message: data.message, type: "danger" });
      }
    } catch (error) {
      console.error("Error:", error);
      setShowAlert({ show: true, message: "Server error", type: "danger" });
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
        {/* Alert */}
        {showAlert.show && (
          <div className={`alert alert-${showAlert.type} text-center`} role="alert">
            {showAlert.message}
          </div>
        )}

        {/* Email */}
        <div className="mb-3">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Email"
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Password"
          />
        </div>

        <button className="btn btn-primary w-100" onClick={handleSubmit}>
          Login
        </button>

        <p className="text-center mt-3">
          Don't have an account? <Link to="/sign">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

