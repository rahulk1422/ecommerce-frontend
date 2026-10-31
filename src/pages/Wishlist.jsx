import { Link } from "react-router-dom";
import { products } from "../data/products";
import { useWishlistStore } from "../store/wishlistStore";
import Button from "../components/common/Button";
import ProductCard from "../components/product/ProductCard";

function Wishlist() {
    const ids = useWishlistStore((state) => state.ids);
    const wishlistProducts = products.filter((product) => ids.includes(product.id));

    if(wishlistProducts.length === 0){
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold text-dark mb-2">Your wishlist is empty</h1>
                <p className="text-gray-500 mb-6">Tap the heart on any product to save it here.</p>
                <Link to="/shop">
                   <Button>Browse Products</Button>
                </Link>
            </div>
        );
    }
    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-dark mb-8">My Wishlist ({wishlistProducts.length})</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {wishlistProducts.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>

        </div>
    )
}

export default Wishlist;