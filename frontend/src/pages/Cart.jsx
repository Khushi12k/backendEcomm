import React, { useEffect, useState } from "react";
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

  /* ================= COUPON STATES ================= */
  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  /* ================= FETCH CART ================= */
  const fetchCart = async () => {
    if (!isLoggedIn) {
      setCartItems([]);
      return;
    }

    setLoading(true);
    try {
      const res = await instance.get("/cart", { withCredentials: true });

      const items = res.data
        .filter((item) => item.productId)
        .map((item) => ({
          ...item,
          quantity: Number(item.quantity),
        }));

      setCartItems(items);
    } catch (err) {
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    fetchCart();
  }, [isLoggedIn]);

  /* ================= TOTAL ================= */
  const cartTotal = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.productId.discountedPrice || item.productId.originalPrice) *
        item.quantity,
    0
  );

  useEffect(() => {
    setFinalTotal(cartTotal - discountAmount);
  }, [cartTotal, discountAmount]);

  /* ================= ACTIONS ================= */
  const handleIncrease = async (productId) => {
    setLoading(true);
    await instance.post(
      "/cart/add",
      { productId, quantity: 1 },
      { withCredentials: true }
    );
    fetchCart();
    setLoading(false);
  };

  const handleDecrease = async (productId, qty) => {
    if (qty <= 1) return;
    setLoading(true);
    await instance.post(
      "/cart/add",
      { productId, quantity: -1 },
      { withCredentials: true }
    );
    fetchCart();
    setLoading(false);
  };

  const handleRemove = async (cartItemId) => {
    setLoading(true);
    await instance.delete(`/cart/remove/${cartItemId}`, {
      withCredentials: true,
    });
    fetchCart();
    setLoading(false);
  };

  /* ================= APPLY COUPON ================= */
  const applyCoupon = async () => {
    if (!couponCode.trim()) return;

    try {
      const res = await instance.post("/coupon/apply", {
        code: couponCode,
        cartTotal,
      });

      setDiscountAmount(res.data.discountAmount);
      setCouponMsg(res.data.message);
    } catch (err) {
      setDiscountAmount(0);
      setCouponMsg(
        err.response?.data?.message || "Invalid coupon"
      );
    }
  };

  /* ================= EMPTY ================= */
  if (!cartItems.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-xl">Your cart is empty.</p>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= CART ITEMS ================= */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex gap-6 bg-white p-5 rounded-xl shadow-sm"
            >
              <img
                src={resolveImage(
                  item.productId.image || item.productId.images?.[0]
                )}
                className="w-28 h-28 object-cover rounded-lg"
              />

              <div className="flex-1 space-y-2">
                <h2 className="text-lg font-semibold">
                  {item.productId.name}
                </h2>

                <p className="flex items-center gap-1">
                  <PiCurrencyInrLight />
                  {item.productId.discountedPrice ||
                    item.productId.originalPrice}
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      handleDecrease(item.productId._id, item.quantity)
                    }
                    className="w-8 h-8 bg-gray-800 text-white rounded"
                  >
                    −
                  </button>

                  <span className="font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      handleIncrease(item.productId._id)
                    }
                    className="w-8 h-8 bg-gray-800 text-white rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleRemove(item._id)}
                  className="flex items-center gap-1 text-red-600 text-sm"
                >
                  <AiOutlineDelete /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ================= ORDER SUMMARY ================= */}
        <div className="bg-white rounded-xl shadow-md p-6 sticky top-24 h-fit">
          <h2 className="text-xl font-bold mb-4">
            Order Summary
          </h2>

          {/* COUPON */}
          <div className="mb-4">
            <input
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="Enter coupon code"
              className="w-full border rounded-lg px-3 py-2 mb-2"
            />
            <button
              onClick={applyCoupon}
              className="w-full bg-black text-white py-2 rounded-lg"
            >
              Apply Coupon
            </button>

            {couponMsg && (
              <p className="text-sm mt-2 text-green-600">
                {couponMsg}
              </p>
            )}
          </div>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹ {cartTotal}</span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between mb-2 text-green-600">
              <span>Discount</span>
              <span>- ₹ {discountAmount}</span>
            </div>
          )}

          <hr className="my-4" />

          <div className="flex justify-between text-lg font-bold mb-6">
            <span>Total</span>
            <span className="flex items-center gap-1">
              <PiCurrencyInrLight /> {finalTotal}
            </span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full py-3 bg-black text-white rounded-lg"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
