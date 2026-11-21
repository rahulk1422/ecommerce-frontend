import { useState, useEffect } from "react";                        
import { Search, Trash2, Pencil, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { getProducts,createProduct, updateProduct, deleteProduct,} from "../../services/productService";                  
import ProductForm from "../../components/admin/ProductForm";
import Button from "../../components/common/Button";

function getStockStatus(stock) {
  if (stock === 0) {
    return { label: "Out of Stock", style: "bg-red-50 text-red-600" };
  }
  if (stock <= 10) {
    return { label: "Low Stock", style: "bg-yellow-50 text-yellow-700" };
  }
  return { label: "In Stock", style: "bg-green-50 text-green-700" };
}

function AdminProducts() {
  const [productList, setProductList] = useState([]);                    
  const [loading, setLoading] = useState(true);                    
  const [loadError, setLoadError] = useState("");                    
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    getProducts()
      .then((data) => setProductList(data))
      .catch(() => setLoadError("Could not load products."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 py-20">Loading products...</p>;
  }

  if (loadError) {
    return <p className="text-center text-danger py-20">{loadError}</p>;
  }

  const visibleProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const openAddForm = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleSave = async (data) => {
    try {
      if (editingProduct) {
        const updated = await updateProduct(editingProduct.id, {
          ...editingProduct,
          ...data,
        });
        setProductList(
          productList.map((product) =>
            product.id === updated.id ? updated : product
          )
        );
        toast.success("Product updated");
      } else {
        const created = await createProduct(data);
        setProductList([created, ...productList]);
        toast.success("Product added");
      }

      closeForm();
      return null;
    } catch (err) {
      if (err.response && err.response.status === 400) {
        return err.response.data;
      }

      toast.error("Something went wrong. Please try again.");
      return null;
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this product?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteProduct(id);
      setProductList(productList.filter((product) => product.id !== id));
      toast.success("Product deleted");
    } catch {
      toast.error("Could not delete the product.");
    }
  };

  return (
    <div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-dark">
          Products ({productList.length})
        </h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center border border-gray-300 bg-white rounded-xl px-3 py-2 w-full sm:w-64">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ml-2 outline-none w-full text-sm"
            />
          </div>

          <Button onClick={openAddForm}>
            <Plus size={16} className="mr-1" />
            Add Product
          </Button>
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
                  <td className="py-3 text-dark">${product.price}</td>
                  <td className="py-3 text-gray-500">{product.stock}</td>
                  <td className="py-3">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${status.style}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditForm(product)}
                        className="text-primary hover:bg-blue-50 p-2 rounded-lg"
                        aria-label="Edit product"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-danger hover:bg-red-50 p-2 rounded-lg"
                        aria-label="Delete product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {visibleProducts.length === 0 && (
              <tr>
                <td colSpan="6" className="py-10 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <ProductForm
          product={editingProduct}
          onSave={handleSave}
          onClose={closeForm}
        />
      )}

    </div>
  );
}

export default AdminProducts;