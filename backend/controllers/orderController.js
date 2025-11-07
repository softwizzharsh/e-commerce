const  Order =  require("../model/order")
const Cart  =  require("../model/cart")     
// Create Order (Checkout)

exports.createOrder = async (req, res) => {
  try {
    const { userId, permanentAddress, shippingAddress, totalAmount } = req.body;
  
    const cart = await Cart.findOne({ userId }).populate("products.productId", "mrp");
    const newOrder = new Order({
      userId,
      products: cart.products,
      permanentAddress,
      shippingAddress,
      totalAmount,
    //   paymentMethod,
    });

    await newOrder.save();  

    // clear the cart after order
    cart.products = [];
    await cart.save();

    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};


exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate(
      "products.productId",
      "productname mrp discount pic1"
    );
    res.json(orders);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

// Update order After online Payment 
exports.updateOrderStatus = async (req, res) => {
   const { orderId } = req.params;
    const { paymentId, paymentStatus } = req.body;

    try {
        const updateOrder = await Order.findByIdAndUpdate(
            orderId,
            { paymentId, paymentStatus },
            { new: true }
        );
        res.status(200).json({msg : "okk"})
    } catch (err) {
        res.status(500).json({ message: ' Failed to update payment', error: err });
      }
      
    };
    
    exports.getAllOrders = async (req ,res )=>{
     
       try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'name email')

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
}
 
exports.updateOrderStatusByAdmin  = async (req ,res )=>{
 
      try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: Pending, Processing, Shipped, Delivered, Cancelled'
      });
    }

    // Find and update order
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Update status
    order.status = status;
    order.updatedAt = new Date();

    // Save order
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: order
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: error.message
    });
  }
}