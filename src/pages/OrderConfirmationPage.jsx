import axios from "axios";
import React, { useState, useEffect } from "react";

const OrderConfirmationPage = () => {

  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  

  if (showAnimation) {
    return (
      <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <div className="mb-4">
            <div
              className="spinner-grow text-success"
              style={{ width: "4rem", height: "4rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          <h3 className="text-primary mb-2">Processing Your Order...</h3>
          <p className="text-muted">
            Please wait while we confirm your purchase
          </p>
        </div>
      </div>
    );
  }

  return (
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
                      {/* <strong>{orderDetails.orderDate}</strong> */}
                      <strong>12-02-2002</strong>
                      
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
  );
};

export default OrderConfirmationPage;
