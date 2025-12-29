import React, { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { PiCurrencyInrLight } from "react-icons/pi";
import { useAuth } from "../contexts/AuthProvider";

const SingleProduct = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { isLoggedIn } = useAuth();


  async function getSingleData() {
    try {
      const response = await instance.get("/product/slug/" + slug);
      setProduct(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    getSingleData();
  }, [slug]);


  async function handleAddToCart(productId) {
   console.log(isLoggedIn);
    if (!isLoggedIn) {
      // alert("Please login first to add product to cart");
      navigate("/login?nextPage=/product/" + slug);
      return;
    }

    try {
      const response = await instance.post(
        "/cart/add",
        { productId, quantity: 1 },
        { withCredentials: true } 
      );

     
      if (response.status === 200 || response.status === 201) {
        alert("Product added successfully!");
      }

      console.log(response.data);
    } catch (err) {
      console.error(err);
      alert("Failed to add product!");
    }
  }

  // 🔹 Loading / error states
  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  // 🔹 UI
  return (
    <div className="single-product">
      <div className="single-product-image">
        <img
          src={`http://localhost:3000/${product.image}`}
          alt={product.name}
        />
      </div>

      <div className="single-product-details">
        <h1>{product.name}</h1>
        <p className="category">{product.category}</p>

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

        <p className="description">{product.description}</p>

        <button
          className="add-to-cart"
          onClick={() => handleAddToCart(product._id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
