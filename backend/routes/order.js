const express = require("express");
const { createOrder, getUserOrders, updateOrderStatus, updateOrderStatusByAdmin, getAllOrders } = require("../controllers/orderController");

const router = express.Router();

// Checkout
router.post("/checkout", createOrder);

// Get all orders by user
router.get("/:userId", getUserOrders);

// Update order status online payment
router.put("/:orderId", updateOrderStatus);

// GET ALL ORDER FOR ADMIN
router.get("/getAllOrders/data", getAllOrders);

// Update order status (admin)
router.patch("/updateOrderByAdmin/:orderId", updateOrderStatusByAdmin)

module.exports = router;
