import { useEffect, useState } from "react";
import ProductCard from "../product/ProductCard";
import { getProducts } from "../../services/productService";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-dark">Featured Products</h2>
        <a href="/shop" className="text-primary font-medium text-sm">
          View All →
        </a>
      </div>

      {loading
        ? (<p className="text-center text-gray-500 py-10">Loading products...</p>)
        : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {products.slice(0, 16).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )
      }

    </section>
  );
}

export default FeaturedProducts;