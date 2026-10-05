import { useState } from "react";
import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = 3; // abhi dummy value, baad me cart state se aayega

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="text-2xl font-bold text-primary">
          ShopEasy
        </div>

        {/* Desktop Menu - mobile pe hide hoga */}
        <div className="hidden md:flex gap-6 text-dark font-medium">
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
          <a href="/categories">Categories</a>
          <a href="/deals">Deals</a>
          <a href="/contact">Contact</a>
        </div>

        {/* Search bar - mobile pe hide hoga */}
        <div className="hidden md:flex items-center border border-gray-300 rounded-xl px-3 py-2 w-64">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="ml-2 outline-none w-full text-sm"
          />
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <User className="cursor-pointer" />
          <Heart className="cursor-pointer" />
          
          <div className="relative cursor-pointer">
            <ShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-danger text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>

          {/* Hamburger - sirf mobile pe dikhega */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

      </div>

      {/* Mobile menu - isOpen true hone par hi dikhega */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col gap-3 px-4 pb-4 text-dark font-medium">
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
          <a href="/categories">Categories</a>
          <a href="/deals">Deals</a>
          <a href="/contact">Contact</a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;