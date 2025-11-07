import React, { useState } from "react";
// import { backendApi } from "../.."; // your backend URL
import { Form, Button, Card } from "react-bootstrap";

function CouponForm() {
  const [couponCode, setCouponCode] = useState("");
  const [amount, setAmount] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const backendApi = "http://localhost:8000/api/"
  // Generate random coupon code
  const generateCoupon = () => {
    const randomCode = "CPN-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    setCouponCode(randomCode);
  };

  // Submit coupon to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendApi}coupon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ couponCode, amount, expiryDate }),
      });

      if (res.ok) {
        alert("Coupon saved successfully!");
        setCouponCode("");
        setAmount("");
        setExpiryDate("");
      } else {
        alert("Failed to save coupon");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Card className="p-4 shadow-lg mt-4" style={{ maxWidth: "500px", margin: "auto" }}>
      <h3 className="text-center mb-3">Generate Coupon</h3>
      <Form onSubmit={handleSubmit}>
        {/* Coupon Code */}
        <Form.Group className="mb-3">
          <Form.Label>Coupon Code</Form.Label>
          <div className="d-flex">
            <Form.Control
              type="text"
              value={couponCode}
              placeholder="Click Generate"
              readOnly
            />
            <Button variant="secondary" className="ms-2" onClick={generateCoupon}>
              Generate
            </Button>
          </div>
        </Form.Group>

        {/* Amount */}
        <Form.Group className="mb-3">
          <Form.Label>Amount (₹)</Form.Label>
          <Form.Control
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </Form.Group>

        {/* Expiry Date */}
        <Form.Group className="mb-3">
          <Form.Label>Expiry Date</Form.Label>
          <Form.Control
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Save Coupon
        </Button>
      </Form>
    </Card>
  );
}

export default CouponForm;


