import { useEffect, useState } from "react";
import instance from "../axiosConfig";
import ProductCard from "../components/ProductCard";
import { useLoader } from "../contexts/LoaderContext";

function Products() {
  const [products, setProducts] = useState([]);
  const { setLoading } = useLoader();

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    setLoading(true);
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
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 px-5 py-8">
      {products.length > 0 ? (
        <div
          className="
            flex flex-wrap justify-center gap-6
            animate-fade-in
          "
        >
          {products.map((product) => (
            <div
              key={product._id}
              className="
                transform transition duration-300
                hover:-translate-y-2 hover:scale-[1.03]
              "
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          No products found.
        </p>
      )}
    </div>
  );
}

export default Products;
