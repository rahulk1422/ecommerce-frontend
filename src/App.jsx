import { Routes } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Home from "./pages/Home"
import { Route } from "react-router-dom"
import Shop from "./pages/Shop"
import ProductDetails from "./pages/ProductDetails"
import { Toaster } from "react-hot-toast"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"

function App() {
  return (
    <div>
      <Toaster position="top-right"/>
      <Navbar/>
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Checkout/>}/>
      </Routes>
    </div>
  )
}

export default App



