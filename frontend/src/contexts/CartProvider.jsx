import { createContext, useContext, useState, useEffect } from "react";
import instance from "../axiosConfig";
import { useAuth } from "./AuthProvider";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // ================= FETCH CART =================
  useEffect(() => {
    const fetchCart = async () => {
      if (!isLoggedIn) {
        setCartItems([]);
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
        console.error(err);
        setCartItems([]);
      }
    };

    fetchCart();
  }, [isLoggedIn]);

  // ================= ADD TO CART (FIXED) =================
  const addToCart = async (productId, quantity = 1, selectedImage = "") => {
    if (!isLoggedIn) {
      toast.info("Please login first");
      return false;
    }

    try {
      await instance.post(
        "/cart/add",
        { productId, quantity, selectedImage }, // ✅ IMAGE SENT
        { withCredentials: true }
      );

      // ✅ always re-fetch cart (SAFE & CLEAN)
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

      toast.success("Added to cart");
      return true;
    } catch (err) {
      console.error(err);
      toast.error("Add to cart failed");
      return false;
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
