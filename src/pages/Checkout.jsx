import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCartStore } from "../store/cartStore";
import Button from "../components/common/Button";

const inputStyle =
  "w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary";

function Checkout() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { payment: "card" },
  });

  // Totals (Cart page jaisa hi)
  let subtotal = 0;
  for (const item of items) {
    subtotal = subtotal + item.price * item.quantity;
  }
  let shipping = 6;
  if (subtotal >= 50) {
    shipping = 0;
  }
  const total = subtotal + shipping;

  const onSubmit = (data) => {
    console.log("Order data:", data);
    toast.success("Order placed successfully!");
    clearCart();
    navigate("/");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 mb-4">Your cart is empty.</p>
        <Link to="/shop" className="text-primary font-medium">
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-dark mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-10">

        {/* Left: shipping form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-xl font-semibold text-dark mb-4">Shipping Address</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Full Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className={inputStyle}
              {...register("fullName", {
                required: "Full name is required",
                minLength: { value: 3, message: "Name must be at least 3 characters" },
              })}
            />
            {errors.fullName && (
              <p className="text-sm text-danger mt-1">{errors.fullName.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Phone Number <span className="text-danger">*</span>
            </label>
            <div className="flex">
              <span className="border border-r-0 border-gray-300 rounded-l-xl px-3 py-2 text-gray-500">
                +91
              </span>
              <input
                type="text"
                placeholder="10-digit number"
                className="w-full border border-gray-300 rounded-r-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit phone number",
                  },
                })}
              />
            </div>
            {errors.phone && (
              <p className="text-sm text-danger mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email (optional)</label>
            <input
              type="text"
              placeholder="Enter your email"
              className={inputStyle}
              {...register("email", {
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-danger mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Address <span className="text-danger">*</span>
            </label>
            <textarea
              rows="3"
              placeholder="Enter your full address"
              className={inputStyle}
              {...register("address", {
                required: "Address is required",
                minLength: { value: 10, message: "Please enter your full address" },
              })}
            />
            {errors.address && (
              <p className="text-sm text-danger mt-1">{errors.address.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Order notes (optional)</label>
            <textarea
              rows="2"
              placeholder="Share your notes"
              className={inputStyle}
              {...register("notes")}
            />
          </div>

          <Button type="submit" size="lg" className="w-full">
            Place Order
          </Button>
        </form>

        {/* Right: order summary */}
        <div className="bg-gray-bg rounded-xl p-6 h-fit">
          <h2 className="text-xl font-semibold text-dark mb-4 text-center">Your order</h2>

          <div className="space-y-3 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 object-contain bg-white rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-dark">{item.name}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <h3 className="font-medium text-dark mb-2">How you'll pay</h3>
          <div className="space-y-2 mb-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" value="card" className="accent-primary" {...register("payment")} />
              Credit / Debit Card
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="radio" value="paypal" className="accent-primary" {...register("payment")} />
              PayPal
            </label>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span className="text-gray-500">Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between font-bold text-dark border-t border-gray-200 pt-4">
            <span>Total ({items.length} items)</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Checkout;