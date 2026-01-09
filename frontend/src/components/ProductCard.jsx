import { PiCurrencyInrLight } from "react-icons/pi";
import { Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_BASEURL;
const IMAGE_BASE = API_BASE.replace("/api", "");

/* ===== IMAGE NORMALIZER ===== */
function resolveImage(img) {
  if (!img) return "/placeholder.png";
  if (img.startsWith("http")) return img;
  return `${IMAGE_BASE}/${img.replace(/\\/g, "/")}`;
}

/* ===== TEXT TRIM ===== */
function trimText(text, limit = 30) {
  if (!text) return "";
  return text.length > limit ? text.slice(0, limit) + "..." : text;
}

function ProductCard({ product }) {
  const productImage =
    product.images?.length > 0
      ? resolveImage(product.images[0])
      : product.image
      ? resolveImage(product.image)
      : "/placeholder.png";

  return (
    <div className="productCard">
      <div className="productImage">
        <Link to={`/product/${product.slug}`}>
          <img src={productImage} alt={product.name} />
        </Link>
      </div>

      <div className="content">
        <h3 className="product-title">
          <Link to={`/product/${product.slug}`} title={product.name}>
            {trimText(product.name, 20)}
          </Link>
        </h3>

        <p className="price">
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
