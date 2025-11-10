// import React, { useEffect, useState } from "react";
// import axios from "axios";
// const ViewAllOrders = () => {
//   const [orders, setOrders] = useState([]);

//   async function getAllOrders() {
//     try {
//       const data = await axios.get(
//         "http://localhost:8000/api/orders/getAllOrders/data"
//       );
//       setOrders(data.data);
//     } catch (error) {
//       alert("Server Error !");
//       console.log(error);
//     }
//   }
//   useEffect(() => {
//     getAllOrders();
//   }, []);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleString("en-IN", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const formatAmount = (amount) => {
//     return `₹${amount.toLocaleString("en-IN")}`;
//   };

//   const getStatusBadge = (status) => {
//     const badgeClass = {
//       Pending: "bg-warning text-dark",
//       Processing: "bg-info",
//       Shipped: "bg-primary",
//       Delivered: "bg-success",
//       Cancelled: "bg-danger",
//     };
//     return badgeClass[status] || "bg-secondary";
//   };

//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       const data = await axios.put(
//         "http://localhost:8000/api/orders/updateOrderByAdmin/data",
//         { orderId, newStatus }
//       );
        
//     } catch (error) {
//       if (error.response) {
//         console.error("Server error:", error.response.data);
//       } else {
//         console.error("Request error:", error.message);
//       }
//     }

//     setOrders(
//       orders.map((order) =>
//         order._id === orderId
//           ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
//           : order
//       )
//     );

//     setShowModal(false);
//     setSelectedOrder(null);
//   };

//   const openOrderDetails = (order) => {
//     setSelectedOrder(order);
//     setShowModal(true);
//   };

//   return (
//     <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
//       <div className="container-fluid">
//         <div className="row mb-4">
//           <div className="col">
//             <h2 className="mb-0">Orders Management</h2>
//             <p className="text-muted">Manage and track all customer orders</p>
//           </div>
//         </div>

//         <div className="row">
//           <div className="col-12">
//             <div className="card shadow-sm">
//               <div className="card-body p-0">
//                 <div className="table-responsive">
//                   <table className="table table-hover mb-0">
//                     <thead className="table-light">
//                       <tr>
//                         <th>Order ID</th>
//                         <th>Customer</th>
//                         <th>Products</th>
//                         <th>Amount</th>
//                         <th>Payment</th>
//                         <th>Status</th>
//                         <th>Date</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {orders.map((order) => (
//                         <tr key={order._id}>
//                           <td>
//                             <small className="font-monospace">
//                               {order._id.substring(0, 12)}...
//                             </small>
//                           </td>
//                           <td>
//                             <div>
//                               <strong>
//                                 {order.shippingAddress.fullName || "N/A"}
//                               </strong>
//                               {order.permanentAddress.email && (
//                                 <div>
//                                   <small className="text-muted">
//                                     {order.permanentAddress.email}
//                                   </small>
//                                 </div>
//                               )}
//                               {order.shippingAddress.phone && (
//                                 <div>
//                                   <small className="text-muted">
//                                     {order.shippingAddress.phone}
//                                   </small>
//                                 </div>
//                               )}
//                             </div>
//                           </td>
//                           <td>
//                             <span className="badge bg-secondary">
//                               {order.products.length} item(s)
//                             </span>
//                           </td>
//                           <td>
//                             <strong>{formatAmount(order.totalAmount)}</strong>
//                           </td>
//                           <td>
//                             <span
//                               className={`badge ${
//                                 order.paymentStatus === "Paid"
//                                   ? "bg-success"
//                                   : "bg-warning"
//                               }`}
//                             >
//                               {order.paymentStatus}
//                             </span>
//                           </td>
//                           <td>
//                             <span
//                               className={`badge ${getStatusBadge(
//                                 order.status
//                               )}`}
//                             >
//                               {order.status}
//                             </span>
//                           </td>
//                           <td>
//                             <small>{formatDate(order.createdAt)}</small>
//                           </td>
//                           <td>
//                             <button
//                               className="btn btn-sm btn-outline-primary"
//                               onClick={() => openOrderDetails(order)}
//                             >
//                               View Details
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {showModal && selectedOrder && (
//         <div
//           className="modal show d-block"
//           style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//           onClick={() => setShowModal(false)}
//         >
//           <div
//             className="modal-dialog modal-lg modal-dialog-centered"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Order Details</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setShowModal(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="row mb-3">
//                   <div className="col-md-6">
//                     <h6>Order Information</h6>
//                     <p className="mb-1">
//                       <strong>Order ID:</strong> {selectedOrder._id}
//                     </p>
//                     <p className="mb-1">
//                       <strong>Payment ID:</strong> {selectedOrder.paymentId}
//                     </p>
//                     <p className="mb-1">
//                       <strong>Total Amount:</strong>{" "}
//                       {formatAmount(selectedOrder.totalAmount)}
//                     </p>
//                     <p className="mb-1">
//                       <strong>Payment Status:</strong>
//                       <span
//                         className={`badge ms-2 ${
//                           selectedOrder.paymentStatus === "Paid"
//                             ? "bg-success"
//                             : "bg-warning"
//                         }`}
//                       >
//                         {selectedOrder.paymentStatus}
//                       </span>
//                     </p>
//                     <p className="mb-1">
//                       <strong>Created:</strong>{" "}
//                       {formatDate(selectedOrder.createdAt)}
//                     </p>
//                     <p className="mb-1">
//                       <strong>Updated:</strong>{" "}
//                       {formatDate(selectedOrder.updatedAt)}
//                     </p>
//                   </div>
//                   <div className="col-md-6">
//                     <h6>Shipping Address</h6>
//                     <p className="mb-1">
//                       <strong>
//                         {selectedOrder.shippingAddress.fullName || "N/A"}
//                       </strong>
//                     </p>
//                     {selectedOrder.shippingAddress.address && (
//                       <p className="mb-1">
//                         {selectedOrder.shippingAddress.address}
//                       </p>
//                     )}
//                     {selectedOrder.shippingAddress.city && (
//                       <p className="mb-1">
//                         {selectedOrder.shippingAddress.city},{" "}
//                         {selectedOrder.shippingAddress.state}{" "}
//                         {selectedOrder.shippingAddress.zipCode}
//                       </p>
//                     )}
//                     {selectedOrder.shippingAddress.country && (
//                       <p className="mb-1">
//                         {selectedOrder.shippingAddress.country}
//                       </p>
//                     )}
//                     {selectedOrder.shippingAddress.phone && (
//                       <p className="mb-1">
//                         <strong>Phone:</strong>{" "}
//                         {selectedOrder.shippingAddress.phone}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {selectedOrder.permanentAddress.fullName && (
//                   <div className="row mb-3">
//                     <div className="col-12">
//                       <h6>Permanent Address</h6>
//                       <p className="mb-1">
//                         <strong>
//                           {selectedOrder.permanentAddress.fullName}
//                         </strong>
//                       </p>
//                       {selectedOrder.permanentAddress.email && (
//                         <p className="mb-1">
//                           <strong>Email:</strong>{" "}
//                           {selectedOrder.permanentAddress.email}
//                         </p>
//                       )}
//                       {selectedOrder.permanentAddress.address && (
//                         <p className="mb-1">
//                           {selectedOrder.permanentAddress.address}
//                         </p>
//                       )}
//                       {selectedOrder.permanentAddress.city && (
//                         <p className="mb-1">
//                           {selectedOrder.permanentAddress.city},{" "}
//                           {selectedOrder.permanentAddress.state}{" "}
//                           {selectedOrder.permanentAddress.zipCode}
//                         </p>
//                       )}
//                       {selectedOrder.permanentAddress.phone && (
//                         <p className="mb-1">
//                           <strong>Phone:</strong>{" "}
//                           {selectedOrder.permanentAddress.phone}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 <div className="row mb-3">
//                   <div className="col-12">
//                     <h6>Products</h6>
//                     <div className="table-responsive">
//                       <table className="table table-sm table-bordered">
//                         <thead className="table-light">
//                           <tr>
//                             <th>Product ID</th>
//                             <th>Quantity</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {selectedOrder.products.map((product) => (
//                             <tr key={product._id}>
//                               <td>
//                                 <small className="font-monospace">
//                                   {product.productId}
//                                 </small>
//                               </td>
//                               <td>{product.quantity}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-12">
//                     <h6>Update Order Status</h6>
//                     <div className="d-flex gap-2 flex-wrap">
//                       {[
//                         "Pending",
//                         "Processing",
//                         "Shipped",
//                         "Delivered",
//                         "Cancelled",
//                       ].map((status) => (
//                         <button
//                           key={status}
//                           className={`btn btn-sm ${
//                             selectedOrder.status === status
//                               ? "btn-primary"
//                               : "btn-outline-primary"
//                           }`}
//                           onClick={() =>
//                             handleStatusChange(selectedOrder._id, status)
//                           }
//                         >
//                           {status}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setShowModal(false)}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewAllOrders;


import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {BACKEND_API} from "../../backendApi"
const ViewAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Fetch all orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_API}/api/orders/getAllOrders/data`, {
        headers: {
        //   'Authorization': `Bearer ${TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log(data)
      if (data.success) {
        setOrders(data.data);
        setError(null);
      } else {
        setError(data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      setError('Failed to connect to server');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getStatusBadge = (status) => {
    const badgeClass = {
      'Pending': 'bg-warning text-dark',
      'Processing': 'bg-info',
      'Shipped': 'bg-primary',
      'Delivered': 'bg-success',
      'Cancelled': 'bg-danger'
    };
    return badgeClass[status] || 'bg-secondary';
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdating(true);
      const response = await fetch(`${BACKEND_API}/updateOrderByAdmin/${orderId}`, {
        method: 'PATCH',
        headers: {
        //   'Authorization': `Bearer ${TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();

      if (data.success) {
        // Update local state
        setOrders(orders.map(order => 
          order._id === orderId ? data.data : order
        ));
        
        // Update selected order if in modal
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder(data.data);
        }
        // Show success message
        alert('Order status updated successfully!');
      } else {
        alert(data.message || 'Failed to update order status');
      }
    } catch (err) {
      console.error('Error updating order status:', err);
      alert('Failed to update order status. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const openOrderDetails = (order) => {
    console.log(order)
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
          <hr />
          <button className="btn btn-danger" onClick={fetchOrders}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '20px' }}>
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-md-8">
            <h2 className="mb-0">Orders Management</h2>
            <p className="text-muted">Manage and track all customer orders</p>
          </div>
          <div className="col-md-4 text-end">
            <button className="btn btn-primary" onClick={fetchOrders}>
              <i className="bi bi-arrow-clockwise"></i> Refresh
            </button>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <div className="alert alert-info">
              <strong>Total Orders:</strong> {orders.length}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Products</th>
                        <th>Amount</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="text-center py-4">
                            <p className="text-muted mb-0">No orders found</p>
                          </td>
                        </tr>
                      ) : (
                        orders.map((order) => (
                          <tr key={order._id}>
                            <td>
                              <small className="font-monospace">{order._id.substring(0, 12)}...</small>
                            </td>
                            <td>
                              <div>
                                <strong>{order.shippingAddress.fullName || 'N/A'}</strong>
                                {order.permanentAddress.email && (
                                  <div><small className="text-muted">{order.permanentAddress.email}</small></div>
                                )}
                                {order.shippingAddress.phone && (
                                  <div><small className="text-muted">{order.shippingAddress.phone}</small></div>
                                )}
                              </div>
                            </td>
                            <td>
                              <span className="badge bg-secondary">{order.products.length} item(s)</span>
                            </td>
                            <td>
                              <strong>{formatAmount(order.totalAmount)}</strong>
                            </td>
                            <td>
                              <span className={`badge ${order.paymentStatus === 'Paid' ? 'bg-success' : 'bg-warning'}`}>
                                {order.paymentStatus}
                              </span>
                            </td>
                            <td>
                              <span className={`badge ${getStatusBadge(order.status)}`}>
                                {order.status}
                              </span>
                            </td>
                            <td>
                              <small>{formatDate(order.createdAt)}</small>
                            </td>
                            <td>
                              <button 
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => openOrderDetails(order)}
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && selectedOrder && (
        <div 
          className="modal show d-block" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={closeModal}
        >
          <div 
            className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Order Details</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <h6>Order Information</h6>
                    <p className="mb-1"><strong>Order ID:</strong> {selectedOrder._id}</p>
                    <p className="mb-1"><strong>Payment ID:</strong> {selectedOrder.paymentId}</p>
                    <p className="mb-1"><strong>Total Amount:</strong> {formatAmount(selectedOrder.totalAmount)}</p>
                    <p className="mb-1">
                      <strong>Payment Status:</strong> 
                      <span className={`badge ms-2 ${selectedOrder.paymentStatus === 'Paid' ? 'bg-success' : 'bg-warning'}`}>
                        {selectedOrder.paymentStatus}
                      </span>
                    </p>
                    <p className="mb-1"><strong>Created:</strong> {formatDate(selectedOrder.createdAt)}</p>
                    <p className="mb-1"><strong>Updated:</strong> {formatDate(selectedOrder.updatedAt)}</p>
                  </div>
                  <div className="col-md-6">
                    <h6>Shipping Address</h6>
                    <p className="mb-1"><strong>{selectedOrder.shippingAddress.fullName || 'N/A'}</strong></p>
                    {selectedOrder.shippingAddress.address && (
                      <p className="mb-1">{selectedOrder.shippingAddress.address}</p>
                    )}
                    {selectedOrder.shippingAddress.city && (
                      <p className="mb-1">
                        {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                      </p>
                    )}
                    {selectedOrder.shippingAddress.country && (
                      <p className="mb-1">{selectedOrder.shippingAddress.country}</p>
                    )}
                    {selectedOrder.shippingAddress.phone && (
                      <p className="mb-1"><strong>Phone:</strong> {selectedOrder.shippingAddress.phone}</p>
                    )}
                  </div>
                </div>

                {selectedOrder.permanentAddress.fullName && (
                  <div className="row mb-3">
                    <div className="col-12">
                      <h6>Permanent Address</h6>
                      <p className="mb-1"><strong>{selectedOrder.permanentAddress.fullName}</strong></p>
                      {selectedOrder.permanentAddress.email && (
                        <p className="mb-1"><strong>Email:</strong> {selectedOrder.permanentAddress.email}</p>
                      )}
                      {selectedOrder.permanentAddress.address && (
                        <p className="mb-1">{selectedOrder.permanentAddress.address}</p>
                      )}
                      {selectedOrder.permanentAddress.city && (
                        <p className="mb-1">
                          {selectedOrder.permanentAddress.city}, {selectedOrder.permanentAddress.state} {selectedOrder.permanentAddress.zipCode}
                        </p>
                      )}
                      {selectedOrder.permanentAddress.phone && (
                        <p className="mb-1"><strong>Phone:</strong> {selectedOrder.permanentAddress.phone}</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="row mb-3">
                  <div className="col-12">
                    <h6>Products</h6>
                    <div className="table-responsive">
                      <table className="table table-sm table-bordered">
                        <thead className="table-light">
                          <tr>
                            <th>Product ID</th>
                            <th>Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedOrder.products.map((product) => (
                            <tr key={product._id}>
                              <td><small className="font-monospace">{product.productId}</small></td>
                              <td>{product.quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <h6>Update Order Status</h6>
                    <div className="d-flex gap-2 flex-wrap">
                      {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                        <button
                          key={status}
                          className={`btn btn-sm ${selectedOrder.status === status ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => handleStatusChange(selectedOrder._id, status)}
                          disabled={updating}
                        >
                          {updating ? 'Updating...' : status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllOrders;