import { products } from "../../data/products";
import ProductCard from "../product/ProductCard";

function FeaturedProducts() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-dark">Featured Products</h2>
        <a href="/shop" className="text-primary font-medium text-sm">
          View All →
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </section>
  );
}

export default FeaturedProducts;