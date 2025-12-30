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



import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    // ✅ safety check (but block nahi karega)
    if (!product) return;

    setCartItems((prev) => {
      return [...prev, product];
    });
  };

  const removeFromCart = (product) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          item._id !== product._id &&
          item.id !== product.id &&
          item.slug !== product.slug
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount: cartItems.length, // ✅ yahi Header me show hoga
        addToCart,
        removeFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
