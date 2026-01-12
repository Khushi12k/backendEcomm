import React, { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { PiCurrencyInrLight } from "react-icons/pi";
import { useAuth } from "../contexts/AuthProvider";
import { useLoader } from "../contexts/LoaderContext";
import { toast } from "react-toastify";
import { useCart } from "../contexts/CartProvider";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

/* ✅ AI CHAT COMPONENT */
import AIChatBox from "../components/Chat.jsx";

/* ================= IMAGE BASE ================= */
const API_BASE = import.meta.env.VITE_BASEURL;
const IMAGE_BASE = API_BASE.replace("/api", "");

function resolveImage(img) {
  if (!img) return "/no-image.png";
  if (img.startsWith("http")) return img;
  return `${IMAGE_BASE}/${img.replace(/\\/g, "/")}`;
}

const SingleProduct = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { setLoading } = useLoader();
  const { addToCart } = useCart();

  /* ================= STATES ================= */
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  /* 🔍 ZOOM STATES */
  const [showZoom, setShowZoom] = useState(false);
  const [bgPos, setBgPos] = useState("50% 50%");

  /* ================= LOAD PRODUCT ================= */
  useEffect(() => {
    loadProduct();
  }, [slug]);

  async function loadProduct() {
    setLoading(true);
    try {
      const res = await instance.get(`/product/slug/${slug}`);
      setProduct(res.data);
      setImageIndex(0);
      loadRelatedProducts(res.data);
    } catch {
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  }

  /* ================= RELATED PRODUCTS ================= */
  async function loadRelatedProducts(prod) {
    try {
      const res = await instance.post("/api/ai/related-products", {
        category: prod.category,
        productId: prod._id,
      });
      setRelatedProducts(res.data || []);
    } catch (err) {
      console.error("Related products error:", err);
    }
  }

  if (!product) return null;

  /* ================= IMAGES ================= */
  const images =
    product.images?.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];

  if (!images.length) return null;

  const nextImage = () =>
    setImageIndex((i) => (i + 1) % images.length);

  const prevImage = () =>
    setImageIndex((i) =>
      i === 0 ? images.length - 1 : i - 1
    );

  /* 🔍 ZOOM HANDLER */
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setBgPos(`${x}% ${y}%`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* ================= PRODUCT ================= */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* IMAGE + ZOOM SECTION */}
        <div className="flex-1">
          <div className="flex gap-6">
            {/* MAIN IMAGE */}
            <div
              className="relative w-[400px] h-[520px] border rounded-xl bg-white overflow-hidden"
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
              onMouseMove={handleMouseMove}
            >
              {images.length > 1 && (
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full z-10"
                >
                  <FaChevronLeft />
                </button>
              )}

              <img
                src={resolveImage(images[imageIndex])}
                alt={product.name}
                className="w-full h-full object-contain"
                draggable={false}
              />

              {images.length > 1 && (
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full z-10"
                >
                  <FaChevronRight />
                </button>
              )}
            </div>

            {/* 🔍 ZOOM PREVIEW (RIGHT SIDE) */}
            <div
              className={`hidden lg:block w-[420px] h-[520px] border rounded-xl bg-no-repeat bg-[length:200%] transition-opacity duration-200 ${
                showZoom ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url(${resolveImage(
                  images[imageIndex]
                )})`,
                backgroundPosition: bgPos,
              }}
            />
          </div>

          {/* THUMBNAILS */}
          {images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={resolveImage(img)}
                  onClick={() => setImageIndex(i)}
                  className={`w-[70px] h-[90px] border rounded-md cursor-pointer object-cover ${
                    imageIndex === i
                      ? "border-black"
                      : "opacity-60 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* DETAILS */}
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="uppercase text-gray-500">
            {product.category}
          </p>

          <p className="flex items-center gap-1 text-2xl font-bold">
            <PiCurrencyInrLight />
            {product.discountedPrice || product.originalPrice}
          </p>

          <p className="text-gray-600">
            {product.description}
          </p>

          <button
            onClick={() => {
              if (!isLoggedIn) {
                navigate("/login");
                return;
              }
              addToCart(product._id, 1, images[imageIndex]);
              navigate("/cart");
            }}
            className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* ================= RELATED PRODUCTS ================= */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-6">
            Related Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item._id}
                onClick={() =>
                  navigate(`/product/${item.slug}`)
                }
                className="border rounded-xl p-4 cursor-pointer bg-white hover:shadow-lg transition"
              >
                <img
                  src={resolveImage(
                    item.images?.[0] || item.image
                  )}
                  className="w-full h-[220px] object-contain mb-3"
                />

                <h3 className="font-semibold line-clamp-1">
                  {item.name}
                </h3>

                <p className="flex items-center gap-1 font-bold mt-1">
                  <PiCurrencyInrLight />
                  {item.discountedPrice ||
                    item.originalPrice}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= AI CHAT ================= */}
      <AIChatBox product={product} />
    </div>
  );
};

export default SingleProduct;
