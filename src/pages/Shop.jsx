import { useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/product/ProductCard";
import FilterSidebar from "../components/product/FilterSidebar";
import Pagination from "../components/common/Pagination";

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [maxPrice, setMaxPrice] = useState(500)
  const [minRating, setMinRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

 

  const handleBrandToggle = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
    setCurrentPage(1);  
  };

  const handleClear = () => {
    setSelectedCategory("All");
    setSelectedBrands([]);
    setSortBy("default");
    setMaxPrice(500);
    setMinRating(0);
    setCurrentPage(1);   
  };


  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePriceChange = (price) => {
    setMaxPrice(price);
    setCurrentPage(1);
  };

  const handleRatingChange = (rating) => {
    setMinRating(rating);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const priceMatch = product.price <= maxPrice;
    const ratingMatch = product.rating >= minRating;

    return categoryMatch && brandMatch && priceMatch && ratingMatch;
  });

  const sortedProducts = filteredProducts.slice();

  if (sortBy === "price-low") {
    sortedProducts.sort((a, b) => a.price - b.price)
  }
  if (sortBy === "price-high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }
  if (sortBy === "rating") {
    sortedProducts.sort((a, b) => b.rating - a.rating)
  }

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);


  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark">Shop</h1>
        <p className="text-gray-500 mt-1">Discover our products</p>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-6">

        <FilterSidebar
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}    // changed

          selectedBrands={selectedBrands}
          onBrandToggle={handleBrandToggle}

          maxPrice={maxPrice}
          onPriceChange={handlePriceChange}          // changed

          minRating={minRating}
          onRatingChange={handleRatingChange}        // changed

          onClear={handleClear}
        />

        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              Showing {sortedProducts.length} products
            </p>

            <select
              value={sortBy}
              onChange={handleSortChange}
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
            <>
            
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>

      </div>
    </div>
  );
}

export default Shop;