import { Routes } from "react-router-dom"
import Home from "./pages/Home"
import { Route } from "react-router-dom"
import Shop from "./pages/Shop"
import ProductDetails from "./pages/ProductDetails"
import { Toaster } from "react-hot-toast"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Wishlist from "./pages/Wishlist"
import NotFound from "./pages/NotFound"
import StoreLayout from "./components/layout/StoreLayout"
import AdminLayout from "./components/layout/AdminLayout"
import Dashboard from "./pages/admin/Dashboard"
import AdminPlaceholder from "./pages/admin/AdminPlaceholder"
import AdminProducts from "./pages/admin/AdminProducts"

function App() {
  return (
    <>
     <Toaster position="top-right"/>
     <Routes>
        {/* Storefront : Navbar + footer */}
        <Route element = {<StoreLayout/>}>
          <Route path="/" element= {<Home/>} />
          <Route path="/shop" element= {<Shop/>} />
          <Route path="/product/:id" element= {<ProductDetails/>} />
          <Route path="/cart" element= {<Cart/>} />
          <Route path="/checkout" element= {<Checkout/>} />
          <Route path="/login" element= {<Login/>} />
          <Route path="/register" element= {<Register/>} />
          <Route path="/wishlist" element= {<Wishlist/>} />
          <Route path="*" element= {<NotFound/>} />
        </Route>

        {/* Admin: Sidebar + Topbar */}
        <Route path="/admin" element={<AdminLayout/>}>
           <Route index element={<Dashboard/>} />
           <Route path="products" element={<AdminProducts/>}/>
           <Route path="orders" element={<AdminPlaceholder title="Orders"/>}/>
           <Route path="customers" element={<AdminPlaceholder title="Customers"/>}/>
        </Route>
     </Routes>
    </>
  )
}

export default App



