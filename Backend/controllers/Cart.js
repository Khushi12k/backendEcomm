import Cart from "../models/Cart.js";

/* ================= ADD / UPDATE CART ================= */
export async function addToCart(req, res) {
  try {
    const { productId, quantity, selectedImage } = req.body;
    const userId = req.userId;

    const existingCartItem = await Cart.findOne({ userId, productId });

    if (existingCartItem) {
      const newQuantity =
        Number(existingCartItem.quantity) + Number(quantity);

      if (newQuantity <= 0) {
        await Cart.deleteOne({ _id: existingCartItem._id });
        return res.status(200).json({ message: "Product removed from cart" });
      }

      existingCartItem.quantity = String(newQuantity);

      // ✅ update selected image if provided
      if (selectedImage) {
        existingCartItem.selectedImage = selectedImage;
      }

      await existingCartItem.save();

      return res.status(200).json({
        message: "Cart updated",
        product: existingCartItem,
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const productInCart = new Cart({
      userId,
      productId,
      quantity: String(quantity),
      selectedImage: selectedImage || "",
    });

    await productInCart.save();

    res.status(201).json({
      message: "Product added to cart",
      product: productInCart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/* ================= FETCH CART ================= */
export async function fetchCart(req, res) {
  try {
    const cartItems = await Cart.find({ userId: req.userId }).populate(
      "productId"
    );

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/* ================= DELETE CART ITEM ================= */
export async function removeCartItem(req, res) {
  try {
    const cartItemId = req.params.id;

    const deleted = await Cart.findByIdAndDelete(cartItemId);

    if (!deleted) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
