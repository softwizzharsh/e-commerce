const Wishlist =  require("../model/wishlist")
// Get wishlist by user
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.params.userId }).populate("products");
    if (!wishlist) {
      return res.status(404).json({ msg: "Wishlist not found" ,  isSuccess : false});
    }
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

// Add product to wishlist
exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;
  try {
    let wishlist = await Wishlist.findOne({ user: req.params.userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: req.params.userId, products: [productId] });
    } 
    else {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
      }
    }

    await wishlist.save();
    res.json({ msg: "Product added to wishlist", wishlist });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

// Remove product from wishlist
exports.removeFromWishlist = async (req, res) => {

  const { productId } = req.body;
  try {
    const wishlist = await Wishlist.findOne({ user: req.params.userId });

    if (!wishlist) {
      return res.status(404).json({ msg: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );

    await wishlist.save();
    res.json({ msg: "Product removed from wishlist", wishlist });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
    console.log(error)
  }
};
