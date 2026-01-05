import { useEffect, useState } from "react";
import instance from "../axiosConfig";
import ProductCard from "../components/ProductCard";
import { useLoader } from "../contexts/LoaderContext"; // ✅ import

function Products() {
  const [products, setProducts] = useState([]);
  const { setLoading } = useLoader(); // ✅ use loader

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    setLoading(true); // show loader
    try {
      const response = await instance.get("/product");
      const productsArray = Array.isArray(response.data)
        ? response.data
        : response.data.products || [];
      setProducts(productsArray);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setLoading(false); // hide loader
    }
  }

  return (
    <div className="productsContainer">
      {products.length > 0 ? (
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
