import React, { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { PiCurrencyInrLight } from "react-icons/pi";
import { useAuth } from "../contexts/AuthProvider";
import { useLoader } from "../contexts/LoaderContext";
import { toast } from "react-toastify";
import { useCart } from "../contexts/CartProvider";

const SingleProduct = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { setLoading } = useLoader();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");

  // ================= FETCH SINGLE PRODUCT =================
  async function getSingleData() {
    setLoading(true);
    try {
      const res = await instance.get("/product/slug/" + slug);
      const data = res.data;

      setProduct(data);

      // ✅ set default active image
      if (data.images && data.images.length > 0) {
        setActiveImage(data.images[0]);
      } else if (data.image) {
        setActiveImage(data.image);
      }
    } catch (error) {
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getSingleData();
  }, [slug]);

  // ================= ADD TO CART (FIXED) =================
  async function handleAddToCart(productId) {
    if (!isLoggedIn) {
      toast.info("Please login first");
      navigate("/login?nextPage=/product/" + slug);
      return;
    }

    setLoading(true);

    // ✅ VERY IMPORTANT: send selected image
    const selectedImage = activeImage;

    const success = await addToCart(productId, 1, selectedImage);

    setLoading(false);

    if (!success) return;
  }

  if (!product) return null;

  // ================= NORMALIZE IMAGES =================
  const allImages =
    product.images?.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];

  return (
    <div className="single-product">
      {/* ================= IMAGE SECTION ================= */}
      <div className="single-product-image">
        <div className="main-image">
          <img
            src={`${import.meta.env.VITE_BASEURL}/${activeImage}`}
            alt={product.name}
          />
        </div>

        {allImages.length > 1 && (
          <div className="image-gallery">
            {allImages.map((img, index) => (
              <img
                key={index}
                src={`${import.meta.env.VITE_BASEURL}/${img}`}
                alt="thumb"
                onClick={() => setActiveImage(img)}
                className={activeImage === img ? "active" : ""}
              />
            ))}
          </div>
        )}
      </div>

      {/* ================= DETAILS ================= */}
      <div className="single-product-details">
        <h1>{product.name}</h1>
        <p>{product.category}</p>

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

        <p>{product.description}</p>

        <button onClick={() => handleAddToCart(product._id)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
