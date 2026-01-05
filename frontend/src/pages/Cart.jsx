import React, { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { useAuth } from "../contexts/AuthProvider";
import { useCart } from "../contexts/CartProvider";
import { useLoader } from "../contexts/LoaderContext";
import { PiCurrencyInrLight } from "react-icons/pi";
import { AiOutlineDelete } from "react-icons/ai";

const Cart = () => {
  const { isLoggedIn } = useAuth();
  const { cartItems, setCartItems } = useCart();
  const { setLoading } = useLoader();

  const [couponCode, setCouponCode] = useState("");
  const [discountData, setDiscountData] = useState(null);
  const [couponMessage, setCouponMessage] = useState("");

  const fetchCart = async () => {
    if (!isLoggedIn) {
      setCartItems([]);
      return;
    }

    setLoading(true);
    try {
      const res = await instance.get("/cart", { withCredentials: true });

      const validItems = res.data
        .filter((item) => item.productId)
        .map((item) => ({
          ...item,
          quantity: Number(item.quantity),
        }));

      setCartItems(validItems);
    } catch (err) {
      console.error(err);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isLoggedIn]);

  const handleIncrease = async (productId) => {
    setLoading(true);
    try {
      await instance.post(
        "/cart/add",
        { productId, quantity: 1 },
        { withCredentials: true }
      );
      fetchCart();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDecrease = async (productId, quantity) => {
    if (quantity <= 1) return;

    setLoading(true);
    try {
      await instance.post(
        "/cart/add",
        { productId, quantity: -1 },
        { withCredentials: true }
      );
      fetchCart();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (cartItemId) => {
    setLoading(true);
    try {
      await instance.delete(`/cart/remove/${cartItemId}`, {
        withCredentials: true,
      });
      fetchCart();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) return <p>Please login to see your cart.</p>;
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

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      <div className="cart-main">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              {/* ✅ IMAGE FIX */}
            <img
  src={`${import.meta.env.VITE_BASEURL}/${
    item.selectedImage ||
    item.productId.image ||
    item.productId.images?.[0]
  }`}
  alt={item.productId.name}
  onError={(e) => {
    e.target.src = "/no-image.png"; // optional fallback
  }}
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
                      handleDecrease(item.productId._id, item.quantity)
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

        <div className="cart-total">
          <h2>
            Total: <PiCurrencyInrLight /> {finalTotal}
          </h2>

          <div className="coupon-section">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button>Apply Coupon</button>
            {couponMessage && <p>{couponMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
