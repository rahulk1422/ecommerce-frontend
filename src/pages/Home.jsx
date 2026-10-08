import { ShieldCheck, Truck, RefreshCw } from "lucide-react";
import Button from "../components/common/Button";
import CategorySection from "../components/home/CategorySection";
import FeaturedProducts from "../components/home/FeaturedProducts";

function Home() {
  return (
    <>
    {/* Hero Section  */}
    <section className="bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left side - Text content */}
        <div>
          <span className="text-primary font-semibold text-sm">NEW ARRIVALS</span>

          <h1 className="text-4xl md:text-5xl font-bold text-dark mt-2 leading-tight">
            Shop More, Save More Only at{" "}
            <span className="text-primary">ShopEasy</span>
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            Discover a wide range of quality products at the best prices. 
            Fast delivery, secure payments, and easy returns.
          </p>

          <div className="flex gap-4 mt-6">
            <Button variant="primary" size="lg">Shop Now</Button>
            <Button variant="outline" size="lg">Explore Deals</Button>
          </div>

          {/* Trust badges */}
          <div className="flex gap-6 mt-8">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-primary" />
              <div>
                <p className="font-semibold text-sm">Secure Payment</p>
                <p className="text-xs text-gray-500">100% protected</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Truck className="text-primary" />
              <div>
                <p className="font-semibold text-sm">Fast Delivery</p>
                <p className="text-xs text-gray-500">On time delivery</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <RefreshCw className="text-primary" />
              <div>
                <p className="font-semibold text-sm">Easy Returns</p>
                <p className="text-xs text-gray-500">30-day returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Image placeholder */}
        <div className="bg-blue-100 rounded-2xl h-80 flex items-center justify-center text-blue-400">
          Image Placeholder
        </div>

      </div>
    </section>

    {/* Category Section */}
    <CategorySection /> 
    <FeaturedProducts /> 
    </>
  );
}

export default Home;