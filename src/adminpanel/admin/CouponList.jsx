import React, { useEffect, useState } from "react";
// import { backendApi } from "../.."; // adjust path to your backend config
import { Table, Button, Card } from "react-bootstrap";
import {BACKEND_API} from "../../backendApi"
function CouponList() {
  const [coupons, setCoupons] = useState([]);
  const backendApi = `${BACKEND_API}`
  // Fetch all coupons
  const fetchCoupons = async () => {
    try {
      const res = await fetch(`${backendApi}/api/coupon`);
      const data = await res.json();
      setCoupons(data);
    } catch (err) {
      console.error("Error fetching coupons:", err);
    }
  };

  // Delete coupon
  const deleteCoupon = async (id) => {
    try {
      const res = await fetch(`${backendApi}/api/coupon/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Coupon deleted!");
        fetchCoupons();
      } else {
        alert("Failed to delete coupon");
      }
    } catch (err) {
      console.error("Error deleting coupon:", err);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div className="container mt-4">
      <Card className="p-3 shadow-lg">
        <h4 className="mb-3">Saved Coupons</h4>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Coupon Code</th>
              <th>Amount</th>
              <th>Expiry Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length > 0 ? (
              coupons.map((c, i) => (
                <tr key={c._id}>
                  <td>{i + 1}</td>
                  <td>{c.couponCode}</td>
                  <td>₹{c.amount}</td>
                  <td>{new Date(c.expiryDate).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteCoupon(c._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No coupons available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}

export default CouponList;
