// // import { createContext, useContext, useState } from "react";

// // const CartContext = createContext();

// // export function CartProvider({ children }) {
// //   const [cartItems, setCartItems] = useState([]);
 
// //   // Add to cart
// //   const addToCart = (product) => {
// //     setCartItems((prev) => [...prev, product]);
// //   };

// //   // Remove from cart
// //   const removeFromCart = (id) => {
// //     setCartItems((prev) => prev.filter(item => item._id !== id));
// //   };

// //   return (
// //     <CartContext.Provider
// //       value={{
// //         cartItems,
// //         cartCount: cartItems.length,
// //         addToCart,
// //         removeFromCart
// //       }}
// //     >
// //       {children}
// //     </CartContext.Provider>
// //   );
// // }

// // export const useCart = () => useContext(CartContext);

// import { createContext, useContext, useState } from "react";

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (product) => {
//     if (!product) return;

//     // Check if product already exists in cart
//     setCartItems((prev) => {
//       const existing = prev.find(
//         (item) => item._id === product._id || item.slug === product.slug
//       );
//       if (existing) return prev; // avoid duplicate
//       return [...prev, product];
//     });
//   };

//   const removeFromCart = (product) => {
//     setCartItems((prev) =>
//       prev.filter(
//         (item) =>
//           item._id !== product._id &&
//           item.slug !== product.slug
//       )
//     );
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         cartCount: cartItems.length,
//         addToCart,
//         removeFromCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);
