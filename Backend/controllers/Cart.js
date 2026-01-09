import Cart from "../models/Cart.js";

/* ================= ADD / UPDATE CART ================= */
export async function addToCart(req, res) {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId;

    let cartItem = await Cart.findOne({ userId, productId });

    if (cartItem) {
      // ✅ FIX: convert BOTH to Number
      const newQty =
        Number(cartItem.quantity) + Number(quantity);

      if (newQty <= 0) {
        await Cart.findByIdAndDelete(cartItem._id);
        return res.json({ message: "Removed from cart" });
      }

      cartItem.quantity = newQty;
      await cartItem.save();

      return res.json({ message: "Cart updated", product: cartItem });
    }

    // new product add
    if (Number(quantity) <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const newCart = new Cart({
      userId,
      productId,
      quantity: Number(quantity), // ✅ ensure number
    });

    await newCart.save();

    res.status(201).json({ message: "Added to cart", product: newCart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/* ================= FETCH CART ================= */
export async function fetchCart(req, res) {
  try {
    const cartItems = await Cart.find({ userId: req.userId })
      .populate("productId");

    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
