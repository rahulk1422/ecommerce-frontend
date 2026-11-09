import { Search, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { products as initialProducts } from "../../data/products";

function getStockStatus(stock){
    if(stock === 0){
        return {label: "Out of Stock", style: "bg-red-50 text-red-600"};
    }
    if(stock <= 10){
        return {label: "Low Stock", style: "bg-yellow-50 text-yellow-700"};
    }
    return {label: "In Stock", style: "bg-green-50 text-green-700"}
}

function AdminProducts(){
    const [productList, setProductList] = useState(initialProducts);
    const [search, setSearch] = useState("");

    const visibleProducts = productList.filter((product) => 
       product.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (id) => {
        const confirmed = window.confirm("Delete this product ?");

        if(!confirmed){
            return;
        }

        setProductList(productList.filter((product) => product.id !== id))
        toast.success("Product deleted");
    };
    return(
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h1 className="text-2xl font-bold text-dark">Products ({productList.length})</h1>

                <div className="flex items-center border border-gray-300 bg-white rounded-xl px-3 py-2 w-full sm:w-72">
                    <Search size={18} className="text-gray-400"/>
                    <input 
                         type="text"
                         placeholder="Search Products..."
                         value={search}
                         onChange={(e)=> setSearch(e.target.value)}
                         className="ml-2 outline-none w-full text-sm" 
                    />
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 overflow-x-auto">
                <table className="w-full text-sm min-w-175">
                    <thead>
                        <tr className="text-left text-gray-500 border-b border-gray-200">
                            <th className="py-3 font-medium">Product</th>
                            <th className="py-3 font-medium">Category</th>
                            <th className="py-3 font-medium">Price</th>
                            <th className="py-3 font-medium">Stock</th>
                            <th className="py-3 font-medium">Status</th>
                            <th className="py-3 font-medium">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {visibleProducts.map((product) => {
                            const status = getStockStatus(product.stock);

                            return (
                                <tr key={product.id} className="border-b border-gray-100 last:border-0">
                                    <td className="py-3">
                                        <div className="flex items-center gap-3">
                                            <img 
                                                src={product.image} 
                                                alt={product.name}
                                                className="w-10 h-10 rounded-lg bg-gray-100 object-contain" 
                                            />
                                            <span className="font-medium text-dark">{product.name}</span>
                                        </div>
                                    </td>

                                    <td className="py-3 text-gray-500">{product.category}</td>
                                    <td className="py-3 text-dark">{product.price}</td>
                                    <td className="py-3 text-gray-500">{product.stock}</td>
                                    <td className="py-3">
                                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium  ${status.style}`}>
                                            {status.label}
                                        </span>
                                    </td>
                                    <td className="py-3">
                                        <button
                                             onClick={() => handleDelete(product.id)}
                                             className="text-danger hover:bg-red-50 p-2 rounded-lg"
                                             aria-label="Delete product"
                                        >
                                            <Trash2 size={16}/>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}

                        {visibleProducts.length === 0 && (
                            <tr>
                                <td className="py-10 text-center text-gray-500" colSpan="6">No Products Found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminProducts;