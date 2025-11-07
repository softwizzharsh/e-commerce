const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");

// GET wishlist for a user
router.get("/:userId", wishlistController.getWishlist);

// POST add product to wishlist
router.post("/:userId/add", wishlistController.addToWishlist);

// DELETE remove product from wishlist
router.delete("/:userId/remove", wishlistController.removeFromWishlist);

module.exports = router;
