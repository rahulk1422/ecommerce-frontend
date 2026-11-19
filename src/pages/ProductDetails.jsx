import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/common/Rating";
import Button from "../components/common/Button";
import Badge from "../components/common/Badge";
import { useCartStore } from "../store/cartStore";
import toast from "react-hot-toast";
import { useWishlistStore } from "../store/wishlistStore";
import { getProductById } from "../services/productService";

function ProductDetails(){
    const {id} = useParams();
    const [quantity, setQuantity] = useState(1);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getProductById(id)
         .then((data) => setProduct(data))
         .catch(() => setError("Product not found."))
         .finally(() => setLoading(false))
    }, [id]);

    const addToCart = useCartStore((state) => state.addToCart)


    const ids = useWishlistStore((state) => state.ids);
    const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
    const isWishlisted  = ids.includes(Number(id));

    if(loading){
        return <p className="text-center text-gray-500 py-20">Loading...</p>
    }

    if(error || !product){
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <p className="text-gray-500 mb-4">{error || "Product not found."}</p>
                <Link to="/shop" className="text-primary font-medium ">Back to Shop</Link>
            </div>
        );
    }

    let discountPercent = 0;
    if(product.oldPrice){
        discountPercent = Math.round(((product.oldPrice - product.price)/ product.oldPrice) * 100);
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
        toast.success("Added to cart");
    };

    return(
          <div className="max-w-7xl mx-auto px-4 py-10">
            <Link to="/shop" className="text-sm text-primary font-medium"> ← Back to Shop</Link>

            <div className="grid md:grid-cols-2 gap-10 mt-6">
                <div className="bg-gray-50 rounded-xl h-96 flex items-center justify-center">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full object-contain"
                    />
                </div>

                <div className="">
                    <h1 className="text-3xl font-bold text-dark">{product.name}</h1>

                    <div className="mt-2">
                        <Rating value={product.rating} totalReviews={product.reviews} />
                    </div>
                    
                    <div className="flex items-center gap-3 mt-4">
                        <span className="text-3xl font-bold text-dark">$ {product.price}</span>

                        {product.oldPrice && (
                            <>
                              <span className="text-lg text-gray-400 line-through">
                                $ {product.oldPrice}
                              </span>

                              <Badge variant="discount">-{discountPercent}%</Badge>
                            </>
                        )}
                    </div>

                    <p className="text-sm text-gray-600 mt-4">Category: {product.category}</p>
                    <p className="text-sm text-gray-600 mt-1">Brand: {product.brand}</p>

                    <div className="flex items-center gap-4 mt-6">
                        <span className="font-medium">Quantity</span>

                        <div className="flex items-center gap-3">
                            <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setQuantity(quantity - 1)}
                                    disabled={quantity === 1}
                            >
                                -
                            </Button>

                            <span className="w-6 text-center">{quantity}</span>        

                            <Button
                                 variant="outline"
                                 size="sm"
                                 onClick={() => setQuantity(quantity + 1)}
                            >
                                +
                            </Button>    
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                        <Button size="lg" 
                                onClick={handleAddToCart}>
                        Add to Cart
                    </Button>

                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => toggleWishlist(product.id)}
                    >
                        {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                    </Button>
                    </div>
                </div>
            </div>
          </div>
    );
}

export default ProductDetails;