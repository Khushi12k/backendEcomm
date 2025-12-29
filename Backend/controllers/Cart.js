import Cart from "../models/Cart.js";

export async function addToCart(req, res) {
  try {
    const { productId, quantity } = req.body; 
    const userId = req.userId;

    const existingCartItem = await Cart.findOne({ userId, productId });

    if (existingCartItem) {
      // Update quantity
      let newQuantity = Number(existingCartItem.quantity) + Number(quantity);

      if (newQuantity <= 0) {
        // Remove item if quantity is 0 or less
        await Cart.deleteOne({ _id: existingCartItem._id });
        return res.status(200).json({ message: "Product removed from cart" });
      } else {
        existingCartItem.quantity = String(newQuantity);
        await existingCartItem.save();
        return res.status(200).json({
          message: "Product quantity updated in cart",
          product: existingCartItem,
        });
      }
    } else {
      if (quantity <= 0) {
        return res.status(400).json({ message: "Invalid quantity" });
      }
      // Add new item
      const productInCart = new Cart({ userId, productId, quantity: String(quantity) });
      await productInCart.save();
      return res
        .status(201)
        .json({ message: "Product added in cart", product: productInCart });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function fetchCart(req, res) {
  try {
    const userId = req.userId;
    const cartItems = await Cart.find({ userId }).populate("productId");
    return res.status(200).json(cartItems);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
