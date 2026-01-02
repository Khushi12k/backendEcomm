import React, { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { useAuth } from "../contexts/AuthProvider";
import { useCart } from "../contexts/CartProvider";
import { PiCurrencyInrLight } from "react-icons/pi";
import { AiOutlineDelete } from "react-icons/ai";

const Cart = () => {
  const { isLoggedIn } = useAuth();
  const { cartItems, setCartItems } = useCart();

  const [loading, setLoading] = useState(true);

  // 🔹 Coupon States
  const [couponCode, setCouponCode] = useState("");
  const [discountData, setDiscountData] = useState(null);
  const [couponMessage, setCouponMessage] = useState("");

  /* ================= FETCH CART ================= */
  const fetchCart = async () => {
    if (!isLoggedIn) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    try {
      const res = await instance.get("/cart", {
        withCredentials: true,
      });

      const validItems = res.data
        .filter((item) => item.productId)
        .map((item) => ({
          ...item,
          quantity: Number(item.quantity),
        }));

      setCartItems(validItems);
    } catch (err) {
      console.error("Fetch cart error:", err);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isLoggedIn]);

  /* ================= CART ACTIONS ================= */
  const handleIncrease = async (productId) => {
    try {
      await instance.post(
        "/cart/add",
        { productId, quantity: 1 },
        { withCredentials: true }
      );
      fetchCart();
    } catch (err) {
      console.error("Increase error:", err);
    }
  };

  const handleDecrease = async (productId, quantity) => {
    if (quantity <= 1) return;

    try {
      await instance.post(
        "/cart/add",
        { productId, quantity: -1 },
        { withCredentials: true }
      );
      fetchCart();
    } catch (err) {
      console.error("Decrease error:", err);
    }
  };

  const handleRemove = async (cartItemId) => {
    try {
      await instance.delete(`/cart/remove/${cartItemId}`, {
        withCredentials: true,
      });
      fetchCart();
    } catch (err) {
      console.error("Remove error:", err);
    }
  };

  /* ================= APPLY COUPON ================= */
  const handleApplyCoupon = async () => {
    if (!couponCode) return;

    const cartTotal = cartItems.reduce(
      (sum, item) =>
        sum +
        (item.productId.discountedPrice ||
          item.productId.originalPrice) *
          item.quantity,
      0
    );

    try {
      const res = await instance.post(
        "/coupon/apply",
        { code: couponCode, cartTotal },
        { withCredentials: true }
      );

      setDiscountData(res.data);
      setCouponMessage(res.data.message);
    } catch (err) {
      setDiscountData(null);
      setCouponMessage(err.response?.data?.message || "Invalid coupon");
    }
  };

  /* ================= UI STATES ================= */
  if (!isLoggedIn) return <p>Please login to see your cart.</p>;
  if (loading) return <p>Loading cart...</p>;
  if (!cartItems.length) return <p>Your cart is empty.</p>;

  const cartTotal = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.productId.discountedPrice ||
        item.productId.originalPrice) *
        item.quantity,
    0
  );

  const finalTotal = discountData
    ? discountData.finalPrice
    : cartTotal;

  /* ================= JSX ================= */
  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      <div className="cart-main">
        {/* CART ITEMS */}
        <div className="cart-items">
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
                  {item.productId.discountedPrice ||
                    item.productId.originalPrice}
                </p>

                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      handleDecrease(
                        item.productId._id,
                        item.quantity
                      )
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      handleIncrease(item.productId._id)
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item._id)}
                >
                  <AiOutlineDelete /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* TOTAL + COUPON */}
        <div className="cart-total">
          <h2>
            Total: <PiCurrencyInrLight />
            {finalTotal}
          </h2>

          <div className="coupon-section">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />

            <button onClick={handleApplyCoupon}>
              Apply Coupon
            </button>

            {couponMessage && <p>{couponMessage}</p>}

            {discountData && (
              <p>
                Discount: {discountData.discountPercentage}% (
                <PiCurrencyInrLight />
                {discountData.discountAmount})
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
