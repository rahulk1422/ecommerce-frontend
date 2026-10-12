import { useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/product/ProductCard";
import FilterSidebar from "../components/product/FilterSidebar";

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const handleBrandToggle = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleClear = () => {
    setSelectedCategory("All");
    setSelectedBrands([]);
    setSortBy("default");
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
    const brandMatch   = selectedBrands.length === 0 || selectedBrands.includes(product.brand);

    return categoryMatch && brandMatch;
  });

  const sortedProducts =filteredProducts.slice();

  if(sortBy === "price-low"){
    sortedProducts.sort((a,b) => a.price - b.price)
  }
  if(sortBy === "price-high"){
    sortedProducts.sort((a, b) => b.price - a.price);
  }
  if(sortBy === "rating"){
    sortedProducts.sort((a, b) => b.rating - a.rating)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark">Shop</h1>
        <p className="text-gray-500 mt-1">Discover our products</p>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-6">

        <FilterSidebar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedBrands={selectedBrands}
          onBrandToggle={handleBrandToggle}
          onClear={handleClear}
        />

        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              Showing {sortedProducts.length} products
            </p>

            <select
               value={sortBy}
               onChange={(e) => setSortBy(e.target.value)} 
               className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="default">Sort by:Default</option>
              <option value="price-low">Price : Low to High</option>
              <option value="price-high">Price : High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {sortedProducts.length === 0 ? (
            <p className="text-center text-gray-500 py-20">
              No products found. Try changing the filters.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Shop;