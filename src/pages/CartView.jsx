import React, { useState, useContext } from "react";
import { addToCartContext } from "../context/AddToCartContextProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import {BACKEND_API} from "../backendApi"
const CartView = () => {
  const [coupon, setCoupon] = useState("");
  const [message, setMessage] = useState("");
  const {
    discount,
    setDiscount,
    removeFromCart,
    cartItems,
    setCartItems,
    loading,
    error,
    calculateTotal,
    calculateSavings,
  } = useContext(addToCartContext);
  async function handelCoupon() {
    if (coupon.trim() === "") {
      return alert("Please enter the coupon code.");
    }

    try {
      const res = await axios.post(`${BACKEND_API}/api/checkCoupon`, {
        coupon,
      });

      if (res.data.success) {
        setMessage(res.data.message);
        setDiscount(res.data.discountAmount);
      } else {
        setMessage(res.data.message);
        setDiscount("00.00");
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Something went wrong");
      } else {
        // Network or server down
        setMessage("Server error. Try again later.");
      }
      setDiscount("00.00");
    }
  }

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== itemId)
    );
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body text-center p-5">
                <div className="spinner-border text-primary mb-3" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <h5>Loading your cart...</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="alert alert-danger" role="alert">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body text-center p-5">
                <i className="fas fa-shopping-cart fa-4x text-muted mb-3"></i>
                <h3 className="text-muted mb-3">Your cart is empty</h3>
                <p className="text-muted mb-4">
                  Looks like you haven't added any items to your cart yet.
                </p>
                <Link to={"/"}>
                  <button className="btn btn-primary btn-lg">
                    <i className="fas fa-shopping-bag me-2"></i>
                    Start Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <div className="row">
        <div className="col-12">
          <div className="d-flex align-items-center mb-4">
            <i className="fas fa-shopping-cart fa-2x text-primary me-3"></i>
            <h2 className="mb-0">Shopping Cart</h2>
            <span className="badge bg-primary rounded-pill ms-3">
              {cartItems.length} items
            </span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          {cartItems.map((item) => (
            <div key={item._id} className="card shadow-sm mb-3 border-0">
              <div className="card-body p-4">
                <div className="row align-items-center">
                  <div className="col-md-2 text-center mb-3 mb-md-0">
                    <div
                      className="bg-light rounded p-3"
                      style={{
                        minHeight: "80px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/* <i className="fas fa-image fa-2x text-muted"></i> */}
                      <img src={item.productId.pic1} alt="" width={"100%"} />
                    </div>
                  </div>

                  <div className="col-md-5 mb-3 mb-md-0">
                    <h5 className="card-title mb-2 text-primary">
                      {item.productId.productname}
                    </h5>
                    <p className="card-text text-muted small mb-2">
                      {item.productId.shortdescription}
                    </p>
                    <div className="d-flex align-items-center">
                      <span className="badge bg-success me-2">In Stock</span>
                      <small className="text-muted">
                        Product ID: {item.productId._id.slice(-6)}
                      </small>
                    </div>
                  </div>

                  <div className="col-md-2 text-center mb-3 mb-md-0">
                    <div
                      className="input-group"
                      style={{ maxWidth: "120px", margin: "0 auto" }}
                    >
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <input
                        type="text"
                        className="form-control form-control-sm text-center"
                        value={item.quantity}
                        readOnly
                      />
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="col-md-2 text-center mb-3 mb-md-0">
                    <h6 className="mb-1">
                      ₹{" "}
                      {Math.round(
                        item?.productId.mrp *
                          (1 - item.productId.discount / 100)
                      )}
                    </h6>
                    <small className="text-muted">per item</small>
                  </div>
                  <div className="col-md-1 text-center">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => {
                        removeItem(item._id);
                        removeFromCart(item.productId._id);
                      }}
                      title="Remove item"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>

                <hr className="my-3" />

                <div className="row">
                  <div className="col-md-6">
                    <small className="text-muted">
                      <i className="fas fa-shipping-fast me-1"></i>
                      Free shipping on orders over ₹1000
                    </small>
                  </div>
                  <div className="col-md-6 text-md-end">
                    <strong className="text-primary">
                      Subtotal: ₹
                      {(
                        Math.round(
                          item?.productId.mrp *
                            (1 - item.productId.discount / 100)
                        ) * item.quantity
                      ).toLocaleString()}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="d-flex justify-content-between mt-4">
            <Link to={"/"}>
              <button className="btn btn-outline-secondary">
                <i className="fas fa-arrow-left me-2"></i>
                Continue Shopping
              </button>
            </Link>
  
          </div>
        </div>

        <div className="col-lg-4">
          <div
            className="card shadow-sm border-0 sticky-top"
            style={{ top: "20px" }}
          >
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-calculator me-2"></i>
                Order Summary
              </h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal ({cartItems.length} items):</span>
                <span>₹{calculateTotal().toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span className="text-success">
                  {calculateTotal() > 1000 ? "free" : 100}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Coupon Discount:</span>
                <span className="text-success">-₹{calculateSavings()}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong className="text-primary">
                  ₹
                  {(
                    calculateTotal() +
                    (calculateTotal() < 1000 ? 100 : 0) -
                    calculateSavings()
                  ).toLocaleString()}
                </strong>
              </div>

              <div className="d-grid gap-2">
                <Link to={"/checkout"}>
                  <button className="btn btn-primary btn-lg">
                    <i className="fas fa-credit-card me-2"></i>
                    Proceed to Checkout
                  </button>
                </Link>
              </div>

              <div className="mt-3">
                <div className="alert alert-info p-2">
                  <small>
                    <i className="fas fa-shield-alt me-1"></i>
                    Secure checkout with 256-bit SSL encryption
                  </small>
                </div>
              </div>
            </div>
            <div className="card shadow-sm border-0 mt-3">
              <div className="card-body">
                {message && (
                  <div className="mt-3 alert alert-info">
                    {message}
                    {discount !== "00.00" && (
                      <strong> 🎉 Discount: ₹{discount}</strong>
                    )}
                  </div>
                )}
                <h6 className="card-title">
                  <i className="fas fa-gift me-2 text-warning"></i>
                  Have a promo code?
                </h6>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="CPN-XXXXXX"
                    value={coupon}
                    onChange={(e) => {
                      setCoupon(e.target.value);
                    }}
                  />
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={handelCoupon}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;
