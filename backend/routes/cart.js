const express = require("express");
const Cart = require("../model/cart");
const router = express.Router();
// Add product to cart

router.post("/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    // check if product already exists
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user cart
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate(
      "products.productId",
      "productname mrp shortdescription pic1 , discount"
    );
    if (cart == null) {
      return res.status(200).json({ isError: true });
    }
    res.status(200).json(cart.products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove product from cart
router.delete("/:userId/:productId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    cart.products = cart.products.filter(
      (p) => p.productId.toString() !== req.params.productId
    );
    await cart.save();
    res.json({ msg: "data delete !" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
