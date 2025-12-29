import React, { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { useAuth } from "../contexts/AuthProvider";
import { PiCurrencyInrLight } from "react-icons/pi";
import { AiOutlineDelete } from "react-icons/ai";

const Cart = () => {
  const { isLoggedIn } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items
  const fetchCart = async () => {
    if (!isLoggedIn) return;
    try {
      const response = await instance.get("/cart", { withCredentials: true });
      // Filter out items with null productId
      const validItems = response.data.filter((item) => item.productId);
      // Convert quantity to Number for safety
      validItems.forEach((item) => (item.quantity = Number(item.quantity)));
      setCartItems(validItems);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isLoggedIn]);

  // Remove product from cart
  const handleRemove = async (cartItemId) => {
    try {
      const response = await instance.delete(`/cart/remove/${cartItemId}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setCartItems((prev) => prev.filter((item) => item._id !== cartItemId));
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  // Increase quantity
  const handleIncrease = async (productId) => {
    if (!productId) return;
    try {
      await instance.post(
        "/cart/add",
        { productId, quantity: 1 },
        { withCredentials: true }
      );

      setCartItems((prev) =>
        prev.map((item) =>
          item.productId && item.productId._id === productId
            ? { ...item, quantity: Number(item.quantity) + 1 } // ensure number
            : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Decrease quantity
  const handleDecrease = async (cartItemId, productId, qty) => {
    if (!productId) return;
    try {
      if (qty <= 1) {
        handleRemove(cartItemId);
      } else {
        await instance.post(
          "/cart/add",
          { productId, quantity: -1 },
          { withCredentials: true }
        );

        setCartItems((prev) =>
          prev.map((item) =>
            item._id === cartItemId
              ? { ...item, quantity: Number(item.quantity) - 1 } // ensure number
              : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  if (!isLoggedIn) return <p>Please login to see your cart.</p>;
  if (loading) return <p>Loading cart...</p>;
  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      {cartItems.map((item) => (
        <div key={item._id} className="cart-item">
          <img
            src={`${import.meta.env.VITE_BASEURL}/${item.productId.image}`}
            alt={item.productId.name}
          />
          <div className="cart-item-details">
            <h2>{item.productId.name}</h2>
            <p>
              <PiCurrencyInrLight />
              {item.productId.discountedPrice || item.productId.originalPrice}
            </p>

            <div className="quantity-controls">
              <button
                onClick={() =>
                  handleDecrease(item._id, item.productId._id, item.quantity)
                }
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrease(item.productId._id)}>+</button>
            </div>

            <button className="remove-btn" onClick={() => handleRemove(item._id)}>
              <AiOutlineDelete /> Remove
            </button>
          </div>
        </div>
      ))}

      <h2>
        Total: <PiCurrencyInrLight />
        {cartItems.reduce(
          (total, item) =>
            total +
            (item.productId.discountedPrice || item.productId.originalPrice) *
              item.quantity,
          0
        )}
      </h2>
    </div>
  );
};

export default Cart;

