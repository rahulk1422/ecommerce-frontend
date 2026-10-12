import { Routes } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Home from "./pages/Home"
import { Route } from "react-router-dom"
import Shop from "./pages/Shop"

function App() {
  return (
    <div>
      <Navbar/>
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/shop" element={<Shop/>}/>
      </Routes>
    </div>
  )
}

export default App



