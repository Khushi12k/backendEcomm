import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../axiosConfig";
import { useAuth } from "../contexts/AuthProvider";
import { useCart } from "../contexts/CartProvider";
import { useLoader } from "../contexts/LoaderContext";
import { PiCurrencyInrLight } from "react-icons/pi";
import { AiOutlineDelete } from "react-icons/ai";

/* ================= IMAGE RESOLVER ================= */
const resolveImage = (img) => {
  if (!img) return "/no-image.png";
  if (img.startsWith("http")) return img;
  return `${import.meta.env.VITE_BASEURL}/${img}`;
};

const Cart = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { cartItems, setCartItems } = useCart();
  const { setLoading } = useLoader();

  /* ================= FETCH CART ================= */
  const fetchCart = async () => {
    if (!isLoggedIn) {
      setCartItems([]);
      return;
    }

    setLoading(true);
    try {
      const res = await instance.get("/cart", {
        withCredentials: true,
      });

      const items = res.data
        .filter((item) => item.productId)
        .map((item) => ({
          ...item,
          quantity: Number(item.quantity),
        }));

      setCartItems(items);
    } catch (err) {
      console.error("FETCH CART ERROR 👉", err);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= EFFECT ================= */
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    fetchCart();
  }, [isLoggedIn]);

  /* ================= INCREASE (+1) ================= */
  const handleIncrease = async (productId) => {
    setLoading(true);
    try {
      await instance.post(
        "/cart/add",
        {
          productId,
          quantity: 1, // ✅ increment
        },
        { withCredentials: true }
      );
      fetchCart();
    } catch (err) {
      console.error("INCREASE ERROR 👉", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DECREASE (-1) ================= */
  const handleDecrease = async (productId, currentQty) => {
    if (currentQty <= 1) return;

    setLoading(true);
    try {
      await instance.post(
        "/cart/add",
        {
          productId,
          quantity: -1, // ✅ decrement
        },
        { withCredentials: true }
        
      );
      fetchCart();
    } catch (err) {
      console.error("DECREASE ERROR 👉", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= REMOVE ITEM ================= */
  const handleRemove = async (cartItemId) => {
    setLoading(true);
    try {
      await instance.delete(`/cart/remove/${cartItemId}`, {
        withCredentials: true,
      });
      fetchCart();
    } catch (err) {
      console.error("REMOVE ERROR 👉", err);
    } finally {
      setLoading(false);
    }
  };

  if (!cartItems.length) {
    return <p className="empty-cart">Your cart is empty.</p>;
  }

  /* ================= TOTAL ================= */
  const cartTotal = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.productId.discountedPrice || item.productId.originalPrice) *
        item.quantity,
    0
  );

  /* ================= UI ================= */
  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item._id} className="cart-item">
            <img
              src={resolveImage(
                item.productId.image || item.productId.images?.[0]
              )}
              alt={item.productId.name}
            />

            <div className="cart-item-details">
              <h2>{item.productId.name}</h2>

              <p className="price">
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
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => handleIncrease(item.productId._id)}
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
          Total: <PiCurrencyInrLight /> {cartTotal}
        </h2>
      </div>
    </div>
  );
};

export default Cart;



