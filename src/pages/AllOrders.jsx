import React, { useState, useEffect } from "react";
import axios from "axios";
import BACKEND_API from "../backendApi"
const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelError, setCancelError] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    // try {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userID");
      if (userId) {
        const res = await axios.get(
          `${BACKEND_API}/api/orders/${userId}`
        );
        setOrders(res.data);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch orders");
      setLoading(false);
    }
    // Simulating API call with mock data based on your backend structure
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Pending: { color: "warning-800", icon: "clock" },
      Processing: { color: "info-800", icon: "cog" },
      Shipped: { color: "primary-800", icon: "truck" },
      Delivered: { color: "success", icon: "check-circle" },
      Cancelled: { color: "danger-800", icon: "times-circle" },
      Returned: { color: "secondary", icon: "undo" },
    };

    const config = statusConfig[status] || {
      color: "secondary",
      icon: "question",
    };

    return (
      <span
        className={`badge bg-${config.color} d-inline-flex align-items-center`}
      >
        <i className={`fas fa-${config.icon} me-1`}></i>
        {status}
      </span>
    );
  };

  const getPaymentStatusBadge = (paymentStatus) => {
    const config =
      paymentStatus === "Paid"
        ? { color: "success", icon: "check-circle" }
        : { color: "danger", icon: "times-circle" };

    return (
      <span
        className={`badge bg-${config.color} d-inline-flex align-items-center`}
      >
        <i className={`fas fa-${config.icon} me-1`}></i>
        {paymentStatus}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateDiscountedPrice = (mrp, discount) => {
    const price = parseInt(mrp);
    const discountAmount = (price * parseInt(discount)) / 100;
    return price - discountAmount;
  };

  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "All") return true;
    return order.status === filterStatus;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortBy === "amount-high") {
      return b.totalAmount - a.totalAmount;
    } else if (sortBy === "amount-low") {
      return a.totalAmount - b.totalAmount;
    }
    return 0;
  });

 async function cancelOrder(orderId){
    let ans =  window.confirm("Do you agree !")
    if (ans) {
      try {
        
       const  newStatus = "Cancelled"
       const response = await fetch(`http://localhost:8000/api/orders/updateOrderByAdmin/${orderId}`, {
        method: 'PATCH',
        headers: {
        //   'Authorization': `Bearer ${TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();
      if (data.success) {
        //  setOrders(orders.map(order => 
        //   order._id === orderId ? data.data : order
        // ));
          fetchOrders()
        alert('Order status updated successfully!');
      } else {
        alert(data.message || 'Failed to update order status');
      }

      } catch (err) {
        console.error('Error updating order status:', err);
        alert('Failed to update order status. Please try again.');
      }
    }
  }

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
                <h5>Loading your orders...</h5>
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

  if (orders.length === 0) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body text-center p-5">
                <i className="fas fa-shopping-bag fa-4x text-muted mb-3"></i>
                <h3 className="text-muted mb-3">No Orders Found</h3>
                <p className="text-muted mb-4">
                  You haven't placed any orders yet.
                </p>
                <button className="btn btn-primary btn-lg">
                  <i className="fas fa-shopping-cart me-2"></i>
                  Start Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <div className="d-flex align-items-center mb-3 mb-md-0">
              <i className="fas fa-shopping-bag fa-2x text-primary me-3"></i>
              <div>
                <h2 className="mb-0">My Orders</h2>
                <small className="text-muted">
                  Track and manage your orders
                </small>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <span className="badge bg-primary rounded-pill">
                {orders.length} Total Orders
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm border-0">
            <div className="card-body py-3">
              <div className="row align-items-center">
                <div className="col-md-6 mb-2 mb-md-0">
                  <div className="d-flex align-items-center gap-3 flex-wrap">
                    <label className="form-label mb-0 fw-semibold">
                      Filter by Status:
                    </label>
                    <select
                      className="form-select"
                      style={{ width: "auto" }}
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="All">All Orders</option>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Returned">Returned</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-3 flex-wrap justify-content-md-end">
                    <label className="form-label mb-0 fw-semibold">
                      Sort by:
                    </label>
                    <select
                      className="form-select"
                      style={{ width: "auto" }}
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="amount-high">Highest Amount</option>
                      <option value="amount-low">Lowest Amount</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="row">
        <div className="col-12">
          {sortedOrders.map((order) => (
            <div key={order._id} className="card shadow-sm border-0 mb-4">
              <div className="card-header bg-light">
                <div className="row align-items-center">
                  <div className="col-md-3 mb-2 mb-md-0">
                    <h6 className="mb-1">Order ID</h6>
                    <small className="text-primary fw-bold">
                      {order._id.slice(-8).toUpperCase()}
                    </small>
                  </div>
                  <div className="col-md-3 mb-2 mb-md-0">
                    <h6 className="mb-1">Order Date</h6>
                    <small>{formatDate(order.createdAt)}</small>
                  </div>
                  <div className="col-md-3 mb-2 mb-md-0">
                    <h6 className="mb-1">Total Amount</h6>
                    <span className="fw-bold text-success">
                      ₹{order.totalAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="col-md-3 text-md-end">
                    <div className="d-flex flex-column align-items-md-end gap-1">
                      {getStatusBadge(order.status)}
                      {getPaymentStatusBadge(order.paymentStatus)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body">
                {/* Products */}
                <div className="mb-3">
                  <h6 className="fw-bold mb-3">
                    <i className="fas fa-box me-2 text-primary"></i>
                    Items ({order.products.length})
                  </h6>
                  {order.products.map((product) => (
                    <div
                      key={product._id}
                      className="row align-items-center mb-3 pb-3 border-bottom"
                    >
                      <div className="col-md-2 text-center mb-2 mb-md-0">
                        <div
                          className="bg-light rounded p-2"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={product.productId.pic1}
                            alt=""
                            width={"100%"}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-2 mb-md-0">
                        <h6 className="mb-1">
                          {product.productId.productname}
                        </h6>
                        <small className="text-muted">
                          Product ID: {product.productId._id.slice(-6)}
                        </small>
                        <div className="mt-1">
                          <span className="badge bg-success me-2">
                            Qty: {product.quantity}
                          </span>
                          <span className="badge bg-success">
                            {product.productId.discount}% OFF
                          </span>
                        </div>
                      </div>
                      <div className="col-md-2 text-center mb-2 mb-md-0">
                        <div className="small text-muted">
                          <small>
                            ₹{parseInt(product.productId.mrp).toLocaleString()}
                          </small>
                        </div>
                        <div className="fw-bold">
                          ₹
                          {calculateDiscountedPrice(
                            product.productId.mrp,
                            product.productId.discount
                          ).toLocaleString()}
                        </div>
                        <small className="text-muted">per item</small>
                      </div>
                      <div className="col-md-2 text-center">
                        <div className="fw-bold text-primary">
                          ₹
                          {(
                            calculateDiscountedPrice(
                              product.productId.mrp,
                              product.productId.discount
                            ) * product.quantity
                          ).toLocaleString()}
                        </div>
                        <small className="text-muted">subtotal</small>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Addresses */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <h6 className="fw-bold mb-2">
                      <i className="fas fa-map-marker-alt me-2 text-success"></i>
                      Shipping Address
                    </h6>
                    <address className="small mb-0">
                      <strong>{order.shippingAddress.fullName}</strong>
                      <br />
                      {order.shippingAddress.address}
                      <br />
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state}{" "}
                      {order.shippingAddress.zipCode}
                      <br />
                      {order.shippingAddress.country}
                      <br />
                      <i className="fas fa-phone me-1"></i>{" "}
                      {order.shippingAddress.phone}
                    </address>
                  </div>
                  <div className="col-md-6">
                    <h6 className="fw-bold mb-2">
                      <i className="fas fa-credit-card me-2 text-info"></i>
                      Payment Details
                    </h6>
                    <div className="small">
                      <div className="mb-1">
                        <strong>Payment ID:</strong> {order.paymentId}
                      </div>
                      <div className="mb-1">
                        <strong>Status:</strong>{" "}
                        {getPaymentStatusBadge(order.paymentStatus)}
                      </div>
                      <div className="mb-1">
                        <strong>Last Updated:</strong>{" "}
                        {formatDate(order.updatedAt)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                  <div className="d-flex gap-2 flex-wrap">
                    {/* {order.status !== "Cancelled" && (
                      <>
                        <button className="btn btn-outline-primary btn-sm">
                          <i className="fas fa-truck me-1"></i>
                          Track Order
                        </button>
                        <button className="btn btn-outline-info btn-sm">
                          <i className="fas fa-download me-1"></i>
                          Invoice
                        </button>
                      </>
                    )} */}
                    {/* {order.status === "Delivered" && (
                      <button className="btn btn-outline-warning btn-sm">
                        <i className="fas fa-star me-1"></i>
                        Rate & Review
                      </button>
                    )} */}
                  </div>
                  <div>
                    {
                      cancelError && (<h5>{cancelError }</h5>)
                    }
                    {(order.status === "Pending" ||
                      order.status === "Processing") && (
                        
                      <button className="btn btn-outline-danger btn-sm" onClick={()=>{cancelOrder(order._id)}}>
                        <i className="fas fa-times me-1"></i>
                        Cancel Order
                      </button>
                    )}
                    {/* {order.status === "Delivered" && (
                      <button className="btn btn-outline-secondary btn-sm">
                        <i className="fas fa-undo me-1"></i>
                        Return/Exchange
                      </button>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {sortedOrders.length === 0 && (
            <div className="card shadow-sm border-0">
              <div className="card-body text-center p-5">
                <i className="fas fa-filter fa-3x text-muted mb-3"></i>
                <h5 className="text-muted">
                  No orders found with current filters
                </h5>
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => setFilterStatus("All")}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
