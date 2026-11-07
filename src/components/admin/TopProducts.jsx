import { topProducts } from "../../data/adminStats";

function TopProducts(){
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-semibold text-dark mb-4">Most Selling Products</h2>

            <div className="space-y-4">
                {topProducts.map((product) => (
                    <div key={product.id} className="flex items-center gap-3">
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-12 h-12 rounded-lg bg-gray-100 object-contain"
                        />

                        <div className="flex-1">
                            <p className="text-sm font-medium text-dark">{product.name}</p>
                            <p className="text-xs text-gray-500">ID: {product.id}</p>
                        </div>

                        <span className="text-sm font-medium border border-gray-200 rounded-lg px-2 py-1">{product.sales}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopProducts;