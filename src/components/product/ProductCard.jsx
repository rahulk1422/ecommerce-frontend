import Rating from "../common/Rating";

function ProductCard({ product }) {
    return (
        <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition cursor-pointer">
            <div className="bg-gray-50 rounded-lg h-40 flex items-center justify-center mb-3">
                <img src={product.image} alt={product.name} className="h-full object-contain" />
            </div>
            <h3 className="text-sm text-dark font-medium mb-1">{product.name}</h3>
            <Rating value={product.rating} totalReviews={product.reviews} />

            <div className="flex items-center gap-2 mt-2">
                <span className="font-bold text-dark">${product.price}</span>

                {product.oldPrice && (
                    <span className="text-gray-400 line-through text-sm">${product.oldPrice}</span>
                )}
            </div>
        </div>
    );
}

export default ProductCard