// import React, { useEffect, useState } from "react";
// import instance from "../axiosConfig";
// import { useAuth } from "../contexts/AuthProvider";
// import { PiCurrencyInrLight } from "react-icons/pi";
// import { AiOutlineDelete } from "react-icons/ai";

// const Cart = () => {
//   const { isLoggedIn } = useAuth();
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch cart items
//   const fetchCart = async () => {
//     if (!isLoggedIn) return;
//     setLoading(true);
//     try {
//       const res = await instance.get("/cart", { withCredentials: true });

//       // Make sure res.data is always an array
//       const cartArray = Array.isArray(res.data) ? res.data : res.data.cart || [];

//       const validItems = cartArray.filter((item) => item.productId);
//       validItems.forEach((i) => (i.quantity = Number(i.quantity)));

//       setCartItems(validItems);
//     } catch (err) {
//       console.error("Fetch cart error:", err);
//       setCartItems([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, [isLoggedIn]);

//   // DELETE cart item
//   const handleRemove = async (cartItemId) => {
//     try {
//       await instance.delete(`/cart/remove/${cartItemId}`, {
//         withCredentials: true,
//       });
//       setCartItems((prev) => prev.filter((item) => item._id !== cartItemId));
//     } catch (error) {
//       console.error("Delete error:", error);
//     }
//   };

//   // INCREASE quantity
//   const handleIncrease = async (productId) => {
//     try {
//       await instance.post(
//         "/cart/add",
//         { productId, quantity: 1 },
//         { withCredentials: true }
//       );

//       setCartItems((prev) =>
//         prev.map((item) =>
//           item.productId._id === productId
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       );
//     } catch (error) {
//       console.error("Increase error:", error);
//     }
//   };

//   // DECREASE quantity
//   const handleDecrease = async (cartItemId, productId, qty) => {
//     if (qty <= 1) {
//       handleRemove(cartItemId);
//       return;
//     }

//     try {
//       await instance.post(
//         "/cart/add",
//         { productId, quantity: -1 },
//         { withCredentials: true }
//       );

//       setCartItems((prev) =>
//         prev.map((item) =>
//           item._id === cartItemId
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         )
//       );
//     } catch (error) {
//       console.error("Decrease error:", error);
//     }
//   };

  
//   if (!isLoggedIn) return <p>Please login to see your cart.</p>;
//   if (loading) return <p>Loading cart...</p>;
//   if (!Array.isArray(cartItems) || cartItems.length === 0)
//     return <p>Your cart is empty.</p>;

//   return (
//     <div className="cart-container">
//       <h1>Your Cart</h1>

//       {cartItems.map((item) => (
//         <div key={item._id} className="cart-item">
//           <img
//             src={`${import.meta.env.VITE_BASEURL}/${item.productId.image}`}
//             alt={item.productId.name}
//           />

//           <div className="cart-item-details">
//             <h2>{item.productId.name}</h2>

//             <p>
//               <PiCurrencyInrLight />
//               {item.productId.discountedPrice || item.productId.originalPrice}
//             </p>

//             <div className="quantity-controls">
//               <button
//                 onClick={() =>
//                   handleDecrease(item._id, item.productId._id, item.quantity)
//                 }
//               >
//                 -
//               </button>

//               <span>{item.quantity}</span>

//               <button onClick={() => handleIncrease(item.productId._id)}>+</button>
//             </div>

//             <button
//               className="remove-btn"
//               onClick={() => handleRemove(item._id)}
//             >
//               <AiOutlineDelete /> Remove
//             </button>
//           </div>
//         </div>
//       ))}

//       <h2>
//         Total: <PiCurrencyInrLight />
//         {cartItems.reduce(
//           (sum, item) =>
//             sum +
//             (item.productId.discountedPrice || item.productId.originalPrice) *
//               item.quantity,
//           0
//         )}
//       </h2>
//     </div>
//   );
// };

// export default Cart;





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

  const fetchCart = async () => {
    if (!isLoggedIn) return;
    setLoading(true);

    try {
      const res = await instance.get("/cart", { withCredentials: true });
      const cartArray = Array.isArray(res.data)
        ? res.data
        : res.data.cart || [];

      const validItems = cartArray.filter((item) => item.productId);
      validItems.forEach((i) => (i.quantity = Number(i.quantity)));

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

  const handleRemove = async (cartItemId) => {
    try {
      await instance.delete(`/cart/remove/${cartItemId}`, {
        withCredentials: true,
      });
      setCartItems((prev) => prev.filter((i) => i._id !== cartItemId));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleIncrease = async (productId) => {
    try {
      await instance.post(
        "/cart/add",
        { productId, quantity: 1 },
        { withCredentials: true }
      );

      setCartItems((prev) =>
        prev.map((item) =>
          item.productId._id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } catch (error) {
      console.error("Increase error:", error);
    }
  };

  const handleDecrease = async (cartItemId, productId, qty) => {
    if (qty <= 1) {
      handleRemove(cartItemId);
      return;
    }

    try {
      await instance.post(
        "/cart/add",
        { productId, quantity: -1 },
        { withCredentials: true }
      );

      setCartItems((prev) =>
        prev.map((item) =>
          item._id === cartItemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } catch (error) {
      console.error("Decrease error:", error);
    }
  };

  if (!isLoggedIn) return <p>Please login to see your cart.</p>;
  if (loading) return <p>Loading cart...</p>;
  if (!cartItems.length) return <p>Your cart is empty.</p>;

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
              {item.productId.discountedPrice ||
                item.productId.originalPrice}
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

              <button onClick={() => handleIncrease(item.productId._id)}>
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

      <h2>
        Total: <PiCurrencyInrLight />
        {cartItems.reduce(
          (sum, item) =>
            sum +
            (item.productId.discountedPrice ||
              item.productId.originalPrice) *
              item.quantity,
          0
        )}
      </h2>
    </div>
  );
};

export default Cart;
