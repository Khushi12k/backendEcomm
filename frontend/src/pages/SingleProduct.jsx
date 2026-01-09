// import React, { useEffect, useState } from "react";
// import instance from "../axiosConfig";
// import { useNavigate, useParams } from "react-router-dom";
// import { PiCurrencyInrLight } from "react-icons/pi";
// import { useAuth } from "../contexts/AuthProvider";
// import { useLoader } from "../contexts/LoaderContext";
// import { toast } from "react-toastify";
// import { useCart } from "../contexts/CartProvider";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// const API_BASE = import.meta.env.VITE_BASEURL;
// const IMAGE_BASE = API_BASE.replace("/api", "");

// function resolveImage(img) {
//   if (!img) return "";
//   if (img.startsWith("http")) return img;
//   return `${IMAGE_BASE}/${img.replace(/\\/g, "/")}`;
// }

// const SingleProduct = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();
//   const { setLoading } = useLoader();
//   const { addToCart } = useCart();

//   const [product, setProduct] = useState(null);
//   const [imageIndex, setImageIndex] = useState(0);
//   const [showZoom, setShowZoom] = useState(false);
//   const [bgPos, setBgPos] = useState("50% 50%");

//   useEffect(() => {
//     getSingleData();
//   }, [slug]);

//   async function getSingleData() {
//     setLoading(true);
//     try {
//       const res = await instance.get("/product/slug/" + slug);
//       setProduct(res.data);
//       setImageIndex(0);
//     } catch {
//       toast.error("Failed to load product");
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (!product) return null;

//   const images =
//     product.images?.length > 0
//       ? product.images
//       : product.image
//       ? [product.image]
//       : [];

//   const nextImage = () => {
//     setImageIndex((prev) => (prev + 1) % images.length);
//   };

//   const prevImage = () => {
//     setImageIndex((prev) =>
//       prev === 0 ? images.length - 1 : prev - 1
//     );
//   };

//   const handleMouseMove = (e) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - rect.left) / rect.width) * 100;
//     const y = ((e.clientY - rect.top) / rect.height) * 100;
//     setBgPos(`${x}% ${y}%`);
//   };

//   return (
//     <div className="single-product">
//       {/* IMAGE SECTION */}
//       <div className="single-product-image">
//         {/* IMAGE + ZOOM ROW */}
//         <div className="image-zoom-row">
//           {/* LEFT IMAGE */}
//           <div
//             className="main-image"
//             onMouseEnter={() => setShowZoom(true)}
//             onMouseLeave={() => setShowZoom(false)}
//             onMouseMove={handleMouseMove}
//           >
//             {images.length > 1 && (
//               <span className="img-arrow left" onClick={prevImage}>
//                 <FaChevronLeft />
//               </span>
//             )}

//             <img
//               src={resolveImage(images[imageIndex])}
//               alt={product.name}
//             />

//             {images.length > 1 && (
//               <span className="img-arrow right" onClick={nextImage}>
//                 <FaChevronRight />
//               </span>
//             )}
//           </div>

//           {/* RIGHT ZOOM PREVIEW (ALWAYS PRESENT – NO SHIFT) */}
//           <div
//             className={`zoom-preview ${showZoom ? "show" : ""}`}
//             style={{
//               backgroundImage: `url(${resolveImage(
//                 images[imageIndex]
//               )})`,
//               backgroundPosition: bgPos,
//             }}
//           />
//         </div>

//         {/* THUMBNAILS */}
//         {images.length > 1 && (
//           <div className="image-thumbnails">
//             {images.map((img, index) => (
//               <img
//                 key={index}
//                 src={resolveImage(img)}
//                 alt="thumb"
//                 className={imageIndex === index ? "active" : ""}
//                 onClick={() => setImageIndex(index)}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* DETAILS */}
//       <div className="single-product-details">
//         <h1>{product.name}</h1>
//         <p>{product.category}</p>

//         <p className="price">
//           <PiCurrencyInrLight />
//           <strong>
//             {product.discountedPrice || product.originalPrice}
//           </strong>
//         </p>

//         <p>{product.description}</p>

//         <button
//           onClick={() => {
//             if (!isLoggedIn) {
//               navigate("/login");
//               return;
//             }
//             addToCart(product._id, 1, images[imageIndex]);
//             navigate("/cart");
//           }}
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SingleProduct;






import React, { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { PiCurrencyInrLight } from "react-icons/pi";
import { useAuth } from "../contexts/AuthProvider";
import { useLoader } from "../contexts/LoaderContext";
import { toast } from "react-toastify";
import { useCart } from "../contexts/CartProvider";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const API_BASE = import.meta.env.VITE_BASEURL;
const IMAGE_BASE = API_BASE.replace("/api", "");

function resolveImage(img) {
  if (!img) return "";
  if (img.startsWith("http")) return img;
  return `${IMAGE_BASE}/${img.replace(/\\/g, "/")}`;
}

const SingleProduct = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { setLoading } = useLoader();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [bgPos, setBgPos] = useState("50% 50%");

  useEffect(() => {
    getSingleData();
  }, [slug]);

  async function getSingleData() {
    setLoading(true);
    try {
      const res = await instance.get("/product/slug/" + slug);
      setProduct(res.data);
      setImageIndex(0);
    } catch {
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  }

  if (!product) return null;

  const images =
    product.images?.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];

  if (images.length === 0) return null;

  /* ===== ARROW HANDLERS ===== */
  const nextImage = (e) => {
    e.stopPropagation();
    setImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  /* ===== ZOOM MOVE ===== */
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setBgPos(`${x}% ${y}%`);
  };

  return (
    <div className="single-product">
      {/* IMAGE SECTION */}
      <div className="single-product-image">
        <div className="image-zoom-row">
          {/* MAIN IMAGE */}
          <div
            className="main-image"
            onMouseEnter={() => setShowZoom(true)}
            onMouseLeave={() => setShowZoom(false)}
            onMouseMove={handleMouseMove}
          >
            {images.length > 1 && (
              <button
                className="img-arrow left"
                onClick={prevImage}
                type="button"
              >
                <FaChevronLeft />
              </button>
            )}

            <img
              src={resolveImage(images[imageIndex])}
              alt={product.name}
              draggable={false}
            />

            {images.length > 1 && (
              <button
                className="img-arrow right"
                onClick={nextImage}
                type="button"
              >
                <FaChevronRight />
              </button>
            )}
          </div>

          {/* ZOOM PREVIEW */}
          <div
            className={`zoom-preview ${showZoom ? "show" : ""}`}
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
          <div className="image-thumbnails">
            {images.map((img, index) => (
              <img
                key={index}
                src={resolveImage(img)}
                alt="thumb"
                className={imageIndex === index ? "active" : ""}
                onClick={() => setImageIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* DETAILS */}
      <div className="single-product-details">
        <h1>{product.name}</h1>
        <p>{product.category}</p>

        <p className="price">
          <PiCurrencyInrLight />
          <strong>
            {product.discountedPrice || product.originalPrice}
          </strong>
        </p>

        <p>{product.description}</p>

        <button
          onClick={() => {
            if (!isLoggedIn) {
              navigate("/login");
              return;
            }
            addToCart(product._id, 1, images[imageIndex]);
            navigate("/cart");
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
