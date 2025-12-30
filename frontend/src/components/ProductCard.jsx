// import { PiCurrencyInrLight } from "react-icons/pi";
// import { Link } from "react-router-dom";

// const trimContent = (text, maxLength = 30) => {
//   if (!text) return "";
//   return text.length > maxLength
//     ? text.substring(0, maxLength) + "..."
//     : text;
// };

// function ProductCard({ product }) {
//   return (
//     <div className="productCard">
      
     
//       <div className="productImage">
//         <Link to={"/product/" + product.slug}>
//           <img
//             src={`${import.meta.env.VITE_BASEURL}/${product.image}`}
//             alt={product.name}
//           />
//         </Link>
//       </div>

//       <div className="content">
        
//         {/* Product Name */}
//         <h3>
//            <Link to={"/product/" + product.slug}>
//             {trimContent(product.name, 22)}
//           </Link>
//         </h3>

//         {/* Price */}
//         <p>
//           <PiCurrencyInrLight />
//           {product.discountedPrice ? (
//             <>
//               <del>{product.originalPrice}</del>
//               <strong>{product.discountedPrice}</strong>
//             </>
//           ) : (
//             <strong>{product.originalPrice}</strong>
//           )}
//         </p>

        
//       </div>
//     </div>
//   );
// }

// export default ProductCard;



import { PiCurrencyInrLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartProvider";

const trimContent = (text, maxLength = 30) => {
  if (!text) return "";
  return text.length > maxLength
    ? text.substring(0, maxLength) + "..."
    : text;
};

function ProductCard({ product }) {
  const { addToCart } = useCart();

  // SAFETY CHECK
  if (!product) return null;

  function handleAddToCart(e) {
    e.preventDefault(); // link click interfere na kare
    console.log("ADD TO CART CLICKED:", product); // DEBUG
    addToCart(product);
  }

  return (
    <div className="productCard">
      {/* Product Image */}
      <div className="productImage">
        <Link to={`/product/${product.slug}`}>
          <img
            src={`${import.meta.env.VITE_BASEURL}/${product.image}`}
            alt={product.name}
          />
        </Link>
      </div>

      <div className="content">
        {/* Product Name */}
        <h3>
          <Link to={`/product/${product.slug}`}>
            {trimContent(product.name, 22)}
          </Link>
        </h3>

        {/* Price */}
        <p className="price">
          <PiCurrencyInrLight />
          {product.discountedPrice ? (
            <>
              <del>{product.originalPrice}</del>{" "}
              <strong>{product.discountedPrice}</strong>
            </>
          ) : (
            <strong>{product.originalPrice}</strong>
          )}
        </p>

        {/* Add to Cart Button */}
        <button
          type="button"
          className="addToCartBtn"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
