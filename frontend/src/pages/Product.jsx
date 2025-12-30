import { useEffect, useState } from "react";
import instance from "../axiosConfig";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    setLoading(true);
    try {
      const response = await instance.get("/product");
      
      // Check if response.data.products exists, else fallback to empty array
      const productsArray = Array.isArray(response.data)
        ? response.data
        : response.data.products || [];
      
      setProducts(productsArray);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]); // safe fallback
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="productsContainer">
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}

export default Products;
