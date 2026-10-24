import { Link } from "react-router-dom";
import { useCartStore } from "../store/CartStore";
import Button from "../components/common/Button";

function Cart(){
    const items = useCartStore((state) => state.items);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const increaseQty = useCartStore((state) => state.increaseQty);
    const decreaseQty = useCartStore((state) => state.decreaseQty);

    // subtotal 
    let subtotal = 0;
    for(const item of items){
        subtotal = subtotal + item.price * item.quantity;
    }

    // $50 se uper free shipping else $6
    let shipping = 6;
    if(subtotal >= 50){
        shipping = 0;
    }

    const total = subtotal + shipping;

    // if cart is empty
    if(items.length === 0){
        return(
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold text-dark mb-2">Your Cart is empty</h1>
                <p className="text-gray-500 mb-6">Add some products to get started.</p>
                <Link to="/shop">
                    <Button>Continue Shopping</Button>
                </Link>
            </div>
        );
    }


    return(
         <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-dark mb-8">Shopping Cart</h1>

            <div className="grid lg:grid-cols-[ifr_340px] gap-8">
                {/* left cart items */}
                <div className="space-y-4">
                    {items.map((item) => (
                        <div
                            key={item.id} 
                            className="flex gap-4 border border-gray-200 rounded-xl p-4"
                        >
                           <div className="shrink-0 bg-gray-50 rounded-lg w-24 h-24 flex items-center justify-center">
                               <img src={item.image} 
                                    alt={item.name}
                                    className="h-full object-contain" 
                                />
                           </div>

                           <div className="flex-1">
                            <h3 className="font-medium text-dark">{item.name}</h3>
                            <p className="text-sm text-gray-500">${item.price}</p>

                            <div className="flex items-center gap-3 mt-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => decreaseQty(item.id)}
                                  disabled={item.quantity === 1}
                                >
                                    -
                                </Button>

                                <span className="w-6 text-center">{item.quantity}</span>

                                <Button 
                                    size="sm"
                                    variant="outline"
                                    onClick={()=> increaseQty(item.id)}
                                >
                                    +
                                </Button>

                                <button
                                   onClick={() => removeFromCart(item.id)}
                                   className="ml-4 text-sm text-danger cursor-pointer"
                                >
                                    Remove
                                </button>
                            </div>
                           </div>

                           <p className="font-bold text-dark">
                            ${(item.price * item.quantity).toFixed(2)}
                           </p>

                        </div>

                    ))}
                </div>

                {/* Right: order summary */}
                <div className="border border-gray-200 rounded-xl p-5 h-fit">
                    <h2 className="font-semibold text-lg text-dark mb-4">Order Summary</h2>

                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-sm mb-4">
                        <span className="text-gray-500">Shipping</span>
                        <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>

                    <div className="flex justify-between font-bold text-dark border-t border-gray-200 pt-4 mb-5">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <Link to="/checkout" className="block">
                       <Button size="lg" className="w-full">
                          Proceed to Checkout
                       </Button>
                    </Link>
                    
                </div>
            </div>

         </div>
    )
};

export default Cart;