// import { createContext, useContext, useState } from "react";

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState([]);

//   // Add to cart
//   const addToCart = (product) => {
//     setCartItems((prev) => [...prev, product]);
//   };

//   // Remove from cart
//   const removeFromCart = (id) => {
//     setCartItems((prev) => prev.filter(item => item._id !== id));
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         cartCount: cartItems.length,
//         addToCart,
//         removeFromCart
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);
