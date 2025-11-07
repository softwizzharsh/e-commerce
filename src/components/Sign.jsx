import React, { useState } from "react";
import { Link } from "react-router-dom";
import {BACKEND_API} from "../backendApi"
export default function Sign() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch(`${BACKEND_API}/api/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (data.success) {
          setShowAlert({ show: true, message: data.message, type: "success" });

          setTimeout(() => {
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
              agreeToTerms: false,
            });
            setShowAlert({ show: false, message: "", type: "success" });
          }, 3000);
        } else {
          setShowAlert({ show: true, message: data.message, type: "danger" });
        }
      } catch (error) {
        console.error("Error:", error);
        setShowAlert({ show: true, message: "Server error", type: "danger" });
      }
    } else {
      setErrors(newErrors);
      setShowAlert({
        show: true,
        message: "Please fix the errors below and try again.",
        type: "danger",
      });
    }
  };

  return (
    <>
      <div className="signup-container">
        <div className="signup-card">
          {/* Header */}
          <div className="signup-header">
            <div className="signup-icon">
              <i className="fas fa-user-plus"></i>
            </div>
            <h2 className="mb-0">Create Account</h2>
            <p className="mb-0 opacity-75">Join us and start your journey</p>
          </div>

          {/* Body */}
          <div className="signup-body">
            {/* Alert */}
            {showAlert.show && (
              <div
                className={`alert alert-${showAlert.type} alert-dismissible fade show`}
                role="alert"
              >
                <i
                  className={`fas ${
                    showAlert.type === "success"
                      ? "fa-check-circle"
                      : "fa-exclamation-triangle"
                  } me-2`}
                ></i>
                {showAlert.message}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() =>
                    setShowAlert({ show: false, message: "", type: "success" })
                  }
                ></button>
              </div>
            )}

            {/* Name Fields */}
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="position-relative">
                  {/* <i className="fas fa-user input-group-text"></i> */}
                  <input
                    type="text"
                    className={`form-control ${
                      errors.firstName ? "is-invalid" : ""
                    }`}
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                  />
                  {errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="position-relative">
                  {/* <i className="fas fa-user input-group-text"></i> */}
                  <input
                    type="text"
                    className={`form-control ${
                      errors.lastName ? "is-invalid" : ""
                    }`}
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                  />
                  {errors.lastName && (
                    <div className="invalid-feedback">{errors.lastName}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="mb-3">
              <div className="position-relative">
                {/* <i className="fas fa-envelope input-group-text"></i> */}
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <div className="position-relative">
                {/* <i className="fas fa-lock input-group-text"></i> */}
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4">
              <div className="position-relative">
                {/* <i className="fas fa-lock input-group-text"></i> */}
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`form-control ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <i
                    className={`fas ${
                      showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
                {errors.confirmPassword && (
                  <div className="invalid-feedback">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="custom-checkbox">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className={errors.agreeToTerms ? "is-invalid" : ""}
              />
              <div>
                <label>
                  I agree to the{" "}
                  <a href="#" target="_blank">
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" target="_blank">
                    Privacy Policy
                  </a>
                </label>
                {errors.agreeToTerms && (
                  <div className="invalid-feedback">{errors.agreeToTerms}</div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              className="btn btn-primary w-100 mb-3"
              onClick={handleSubmit}
            >
              Create Account
            </button>

            {/* Sign In Link */}
            <div className="signin-link">
              Already have an account? <Link to="/login">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
