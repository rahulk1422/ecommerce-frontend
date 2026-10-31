import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { id: 1, label: "Shop", to: "/shop" },
  { id: 2, label: "Cart", to: "/cart" },
  { id: 3, label: "Login", to: "/login" },
  { id: 4, label: "Register", to: "/register" },
];

const supportLinks = ["Returns", "Shipping Info", "FAQ", "Contact Us"];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">

        {/* Column 1: Brand */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-2xl font-bold text-white mb-3">ShopEasy</h3>
          <p className="text-sm text-gray-400">
            Quality products at the best prices. Fast delivery, secure
            payments, and easy returns.
          </p>
        </div>

        {/* Column 2: Quick links */}
        <div>
          <h4 className="font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.id}>
                <Link to={link.to} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Support */}
        <div>
          <h4 className="font-semibold text-white mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            {supportLinks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div className="col-span-2 md:col-span-1">
          <h4 className="font-semibold text-white mb-3">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@shopeasy.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +91 9315450074
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Delhi, India
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © {year} ShopEasy. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;