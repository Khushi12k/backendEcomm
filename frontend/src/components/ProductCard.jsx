import { PiCurrencyInrLight } from "react-icons/pi";
import { Link } from "react-router-dom";

const trimContent = (text, maxLength = 30) => {
  if (!text) return "";
  return text.length > maxLength
    ? text.substring(0, maxLength) + "..."
    : text;
};

function ProductCard({ product }) {
  // ✅ SUPPORT BOTH SINGLE & MULTIPLE IMAGES
  const productImage =
    product.images && product.images.length > 0
      ? `${import.meta.env.VITE_BASEURL}/${product.images[0]}`
      : product.image
      ? `${import.meta.env.VITE_BASEURL}/${product.image}`
      : "/placeholder.png";

  return (
    <div className="productCard">
      <div className="productImage">
        <Link to={"/product/" + product.slug}>
          <img src={productImage} alt={product.name} />
        </Link>
      </div>

      <div className="content">
        <h3>
          <Link to={"/product/" + product.slug}>
            {trimContent(product.name, 22)}
          </Link>
        </h3>

        <p>
          <PiCurrencyInrLight />
          {product.discountedPrice ? (
            <>
              <del>{product.originalPrice}</del>
              <strong>{product.discountedPrice}</strong>
            </>
          ) : (
            <strong>{product.originalPrice}</strong>
          )}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
