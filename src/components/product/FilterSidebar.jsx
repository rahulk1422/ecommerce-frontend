import { products } from "../../data/products";
import Button from "../common/Button";

const categories = ["All", ...new Set(products.map((p) => p.category))];
const brands = [...new Set(products.map((p) => p.brand))];

function FilterSidebar({
    selectedCategory,
    onCategoryChange,
    selectedBrands,
    onBrandToggle,
    onClear,
}) {
    return (
        <aside className="border border-gray-200 rounded-xl p-4 h-fit">
            <h3 className="font-semibold text-dark mb-3">Categories</h3>
            <ul className="space-y-1 mb-6">
                {
                    categories.map((category) => (
                        <li key={category}>
                            <button
                                onClick={() => onCategoryChange(category)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${selectedCategory === category ? "bg-blue-50 text-primary font-medium" : "text-dark hover:bg-gray-bg"}`}>
                                {category}
                            </button>
                        </li>
                    ))
                }
            </ul>

            <h3 className="font-semibold text-dark mb-3">Brand</h3>
            <div className="space-y-2 mb-6">
                {
                    brands.map((brand) => (
                        <label key={brand} className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedBrands.includes(brand)}
                                onChange={() => onBrandToggle(brand)}
                                className="accent-primary"
                            />
                            {brand}
                        </label>
                    ))
                }
            </div>

            <Button className="w-full" variant="outline" size="sm" onClick={onClear}>
                Clear Filters
            </Button>
        </aside>
    )
}
export default FilterSidebar