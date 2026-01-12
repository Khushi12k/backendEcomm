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
    <div
      className="
        w-[260px] bg-white rounded-2xl overflow-hidden
        shadow-md cursor-pointer
        transition-all duration-300
        hover:-translate-y-3 hover:scale-[1.03]
        hover:shadow-2xl
      "
    >
      {/* IMAGE */}
      <div className="w-full h-[200px] bg-gray-100 overflow-hidden">
        <Link to={`/product/${product.slug}`}>
          <img
            src={productImage}
            alt={product.name}
            className="
              w-full h-full object-contain
              transition-transform duration-300
              hover:scale-110
            "
          />
        </Link>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-center font-semibold text-gray-800">
          <Link
            to={`/product/${product.slug}`}
            title={product.name}
            className="hover:text-blue-600 transition-colors"
          >
            {trimText(product.name, 20)}
          </Link>
        </h3>

        <p className="flex items-center justify-center gap-1 text-lg">
          <PiCurrencyInrLight className="text-gray-700" />

          {product.discountedPrice ? (
            <>
              <del className="text-gray-400 text-sm">
                {product.originalPrice}
              </del>
              <strong className="text-red-600 font-bold">
                {product.discountedPrice}
              </strong>
            </>
          ) : (
            <strong className="text-red-600 font-bold">
              {product.originalPrice}
            </strong>
          )}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
