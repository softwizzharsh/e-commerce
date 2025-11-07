import React, { useState, useContext  } from "react";
import { addToCartContext } from "../context/AddToCartContextProvider";
import axios from "axios";
import BACKEND_API from "../backendApi"
const CheckoutPage = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const { cartItems, calculateSavings, calculateTotal, userId } = useContext(addToCartContext);

  const [permanentAddress, setPermanentAddress] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
  });

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
  });

  const [sameAsPermanent, setSameAsPermanent] = useState(false);
 
  const [currentStep, setCurrentStep] = useState(1);

  const handlePermanentAddressChange = (e) => {
    const { name, value } = e.target;
    setPermanentAddress((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (sameAsPermanent) {
      setShippingAddress((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleShippingAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSameAsPermanentChange = (e) => {
    const checked = e.target.checked;
    setSameAsPermanent(checked);

    if (checked) {
      setShippingAddress({
        ...permanentAddress,
      });
    }
  };
  const totalAmount =  calculateTotal()+  (calculateTotal() < 1000 ? 100 : 0) - calculateSavings() + Math.round((calculateTotal() - calculateSavings()) * 0.18)
     
      

  const handleSubmit = async () => {
    if (userId) {
      try {
        const res = await axios.post(
          `${BACKEND_API}/api/orders/checkout`,
          {
            userId,
            permanentAddress,
            shippingAddress,
            cartItems,
            totalAmount,
          }
        );
       
        if (res.data.success) {
          const options = {
            key: "rzp_test_99IwqPHWTFKkXS",
            amount: totalAmount * 100,
            currency: "INR",
            name: "Lolypop",
            description: "Order Payment",
            handler: async function (response) {
              try {
                const paymentRes = await fetch(
                  `${BACKEND_API}/api/orders/${res.data.order._id}`,
                  {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      paymentId: response.razorpay_payment_id,
                      paymentStatus: "Paid",
                    }),
                  }
                );
                if (paymentRes.ok) {
                  setCurrentStep(3)
                  alert("Payment Successful!");
                  setShowAnimation(true)
                } else {
                  alert("Payment captured but failed to update order.");
                  setShowAnimation(false)
                }
              } catch (error) {
                alert("Something went wrong while updating payment.");
                setShowAnimation(false)
                console.error(error);
              }
            },
            prefill: {
              name: "admin",
              email: "user@example.com",
              contact: "9999999999",
            },
            theme: {
              color: "#3399cc",
            },
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
        } 
        else {
          alert("Failed to create order. Try again.");
          
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Plz login your Account !");
    }
  };

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
  ];

  if (showAnimation) {
   
   return(
     <div className="container mt-4 mb-5">
      {/* Success Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 bg-success text-white shadow-lg">
            <div className="card-body p-5 text-center">
              <div className="mb-3">
                <i className="fas fa-check-circle fa-4x"></i>
              </div>
              <h1 className="display-6 mb-3">Order Confirmed!</h1>
              <p className="lead mb-4">
                Thank you for your purchase. Your order has been successfully
                placed and is being processed.
              </p>
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="row text-center">
                    <div className="col-md-4 mb-2">
                      <h6 className="mb-1">Order ID</h6>
                      {/* <strong>{orderDetails.orderId}</strong> */}
                      <strong>12543643</strong>
                    </div>
                    <div className="col-md-4 mb-2">
                      <h6 className="mb-1">Order Date</h6>
                      {/* <strong>{new Date()}</strong> */}
                      {/* <strong>12-02-2002</strong> */}
                      
                    </div>
                    <div className="col-md-4 mb-2">
                      <h6 className="mb-1">Total Amount</h6>
                      {/* <strong>₹{finalTotal.toLocaleString()}</strong> */}
                      <strong>₹{300}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  )
  }
    
  return (
    <div className="container mt-4 mb-5">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex align-items-center">
            <i className="fas fa-shopping-bag fa-2x text-primary me-3"></i>
            <div>
              <h2 className="mb-0">Checkout</h2>
              <small className="text-muted">Complete your purchase</small>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="progress mb-3" style={{ height: "8px" }}>
            <div
              className="progress-bar bg-primary"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
          <div className="d-flex justify-content-between">
            <small
              className={`text-${
                currentStep >= 1 ? "primary fw-bold" : "muted"
              }`}
            >
              <i className="fas fa-map-marker-alt me-1"></i>Address
            </small>
            <small
              className={`text-${
                currentStep >= 2 ? "primary fw-bold" : "muted"
              }`}
            >
              <i className="fas fa-credit-card me-1"></i>Payment
            </small>
            <small
              className={`text-${
                currentStep >= 3 ? "primary fw-bold" : "muted"
              }`}
            >
              <i className="fas fa-check-circle me-1"></i>Confirm
            </small>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-lg-8">
            {/* Permanent Address Form */}
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                  <i className="fas fa-home me-2"></i>
                  Permanent Address
                </h5>
              </div>
              <div className="card-body p-4">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-user me-1 text-primary"></i>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="fullName"
                      value={permanentAddress.fullName}
                      onChange={handlePermanentAddressChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-envelope me-1 text-primary"></i>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={permanentAddress.email}
                      onChange={handlePermanentAddressChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-phone me-1 text-primary"></i>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={permanentAddress.phone}
                      onChange={handlePermanentAddressChange}
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-globe me-1 text-primary"></i>
                      Country *
                    </label>
                    <select
                      className="form-select"
                      name="country"
                      value={permanentAddress.country}
                      onChange={handlePermanentAddressChange}
                      required
                    >
                      <option value="India">India</option>
                      {/* <option value="USA">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="Canada">Canada</option> */}
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <i className="fas fa-map-marker-alt me-1 text-primary"></i>
                    Street Address *
                  </label>
                  <textarea
                    className="form-control"
                    name="address"
                    rows="3"
                    value={permanentAddress.address}
                    onChange={handlePermanentAddressChange}
                    placeholder="House/Flat No., Street Name, Area"
                    required
                  ></textarea>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-city me-1 text-primary"></i>
                      City *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={permanentAddress.city}
                      onChange={handlePermanentAddressChange}
                      placeholder="City"
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-map me-1 text-primary"></i>
                      State *
                    </label>
                    <select
                      className="form-select"
                      name="state"
                      value={permanentAddress.state}
                      onChange={handlePermanentAddressChange}
                      required
                    >
                      <option value="">Select State</option>
                      {indianStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-mail-bulk me-1 text-primary"></i>
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="zipCode"
                      value={permanentAddress.zipCode}
                      onChange={handlePermanentAddressChange}
                      placeholder="XXXXXX"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address Form */}
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="fas fa-shipping-fast me-2"></i>
                  Shipping Address
                </h5>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="sameAsPermanent"
                    checked={sameAsPermanent}
                    onChange={handleSameAsPermanentChange}
                  />
                  <label
                    className="form-check-label text-white"
                    htmlFor="sameAsPermanent"
                  >
                    Same as permanent
                  </label>
                </div>
              </div>
              <div className="card-body p-4">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-user me-1 text-success"></i>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="fullName"
                      value={shippingAddress.fullName}
                      onChange={handleShippingAddressChange}
                      placeholder="Recipient's full name"
                      disabled={sameAsPermanent}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-phone me-1 text-success"></i>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={shippingAddress.phone}
                      onChange={handleShippingAddressChange}
                      placeholder="+91 XXXXX XXXXX"
                      disabled={sameAsPermanent}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <i className="fas fa-map-marker-alt me-1 text-success"></i>
                    Shipping Address *
                  </label>
                  <textarea
                    className="form-control"
                    name="address"
                    rows="3"
                    value={shippingAddress.address}
                    onChange={handleShippingAddressChange}
                    placeholder="Delivery address"
                    disabled={sameAsPermanent}
                    required
                  ></textarea>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-city me-1 text-success"></i>
                      City *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleShippingAddressChange}
                      placeholder="City"
                      disabled={sameAsPermanent}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-map me-1 text-success"></i>
                      State *
                    </label>
                    <select
                      className="form-select"
                      name="state"
                      value={shippingAddress.state}
                      onChange={handleShippingAddressChange}
                      disabled={sameAsPermanent}
                      required
                    >
                      <option value="">Select State</option>
                      {indianStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-mail-bulk me-1 text-success"></i>
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="zipCode"
                      value={shippingAddress.zipCode}
                      onChange={handleShippingAddressChange}
                      placeholder="XXXXXX"
                      disabled={sameAsPermanent}
                      required
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="fas fa-globe me-1 text-success"></i>
                      Country *
                    </label>
                    <select
                      className="form-select"
                      name="country"
                      value={shippingAddress.country}
                      onChange={handleShippingAddressChange}
                      disabled={sameAsPermanent}
                      required
                    >
                      <option value="India">India</option>
                      {/* <option value="USA">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="Canada">Canada</option> */}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            {/* <div className="card shadow-sm border-0 mb-4">
              <div className="card-header bg-warning text-dark">
                <h5 className="mb-0">
                  <i className="fas fa-credit-card me-2"></i>
                  Payment Method
                </h5>
              </div>
              <div className="card-body p-4">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="form-check p-3 border rounded">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="card"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label
                        className="form-check-label fw-semibold"
                        htmlFor="card"
                      >
                        <i className="fas fa-credit-card me-2 text-primary"></i>
                        Credit/Debit Card
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form-check p-3 border rounded">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="upi"
                        value="upi"
                        checked={paymentMethod === "upi"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label
                        className="form-check-label fw-semibold"
                        htmlFor="upi"
                      >
                        <i className="fas fa-mobile-alt me-2 text-success"></i>
                        UPI Payment
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form-check p-3 border rounded">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="netbanking"
                        value="netbanking"
                        checked={paymentMethod === "netbanking"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label
                        className="form-check-label fw-semibold"
                        htmlFor="netbanking"
                      >
                        <i className="fas fa-university me-2 text-info"></i>
                        Net Banking
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form-check p-3 border rounded">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="cod"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label
                        className="form-check-label fw-semibold"
                        htmlFor="cod"
                      >
                        <i className="fas fa-money-bill-wave me-2 text-warning"></i>
                        Cash on Delivery
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          {/* Order Summary Sidebar */}
          <div className="col-lg-4">
            <div
              className="card shadow-sm border-0 sticky-top"
              style={{ top: "20px" }}
            >
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                  <i className="fas fa-receipt me-2"></i>
                  Order Summary
                </h5>
              </div>
              <div className="card-body">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom"
                  >
                    <div className="flex-grow-1">
                      <h6 className="mb-1 fw-semibold">
                        {item.productId.productname}
                      </h6>
                      <small className="text-muted">Qty: {item.quantity}</small>
                    </div>
                    <div className="text-end">
                      {/* <span className="fw-bold">₹{(parseInt(item.productId.mrp) * item.quantity).toLocaleString()}</span> */}
                      <span className="fw-bold">
                        ₹{" "}
                        {Math.round(
                          item?.productId.mrp *
                            (1 - item.productId.discount / 100)
                        )}
                      </span>
                    </div>
                  </div>
                ))}

                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>₹{calculateTotal().toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                   ₹{calculateTotal() > 1000 ? "free" : 100}
                 
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Discount:</span>
                  <span className="text-success">
                    -₹{calculateSavings().toLocaleString()}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>GST (18%):</span>
                  <span>
                    ₹
                    {Math.round(
                      (calculateTotal() - calculateSavings()) * 0.18
                    ).toLocaleString()}
                  </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <strong className="fs-5">Total:</strong>
                  <strong className="text-primary fs-5">₹{totalAmount}</strong>
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={handleSubmit}
                  >
                    <i className="fas fa-shopping-bag me-2"></i>
                    Place Order
                  </button>
                  <button type="button" className="btn btn-outline-secondary">
                    <i className="fas fa-arrow-left me-2"></i>
                    Back to Cart
                  </button>
                </div>

                <div className="mt-3">
                  <div className="alert alert-success p-2">
                    <small>
                      <i className="fas fa-shield-alt me-1"></i>
                      100% Secure & Encrypted Payment
                    </small>
                  </div>
                  <div className="text-center">
                    <small className="text-muted">
                      <i className="fas fa-truck me-1"></i>
                      Estimated delivery: 3-5 business days
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


};

export default CheckoutPage;
