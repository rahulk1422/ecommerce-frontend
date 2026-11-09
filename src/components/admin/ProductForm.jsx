import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import Button from "../common/Button"

const inputStyle = "w-full border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary";
const categoryOptions = ["Electronics", "Fashion", "Sports"];

function ProductForm({ product, onSave, onClose }) {

    // if product available then edit mode , else Add Mode
    const isEditing = Boolean(product);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: isEditing ? product.name : "",
            price: isEditing ? product.price : "",
            stock: isEditing ? product.stock : "",
            category: isEditing ? product.category : "",
            brand: isEditing ? product.brand : "",
        }
    });

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-bold text-dark">{isEditing ? "Edit Product" : "Add Product"}</h2>
                    <button onClick={onClose} aria-label="Close"> <X size={20}/> </button>
                </div>

                <form onSubmit={handleSubmit(onSave)}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            Product Name <span className="text-danger">*</span>
                        </label>
                        <input 
                              type="text"
                              placeholder="Enter product name"
                              className={inputStyle}
                              {...register("name", {
                                required: "Product name is required",
                                minLength: { value: 3, message: "Name must be at least 3 characters"}
                              })}
                       />
                       {errors.name && (
                         <p className="text-sm text-danger mt-1">{errors.name.message}</p>
                       )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Price ($) <span className="text-danger">*</span>
                            </label>
                            <input 
                                 type="number" 
                                 step="0.01"
                                 placeholder="0.00"
                                 className={inputStyle}
                                 {...register("price", {
                                    required: "Price is required",
                                    valueAsNumber:true,
                                    min: {value:1, message:"Price must be at least 1"},
                                 })}
                            />
                            {errors.price && (
                                <p className="text-sm text-danger mt-1">{errors.price.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Stock <span className="text-danger">*</span>
                            </label>
                            <input 
                                  type="number" 
                                  placeholder="0"
                                  className={inputStyle}
                                  {...register("stock", {
                                    required: "Stock is required",
                                    valueAsNumber: true,
                                    min: {value: 0, message:"Stock can not be negative"},
                                  })}
                            />
                            {errors.stock && (
                                <p className="text-sm text-danger mt-1">{errors.stock.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="text-sm block font-medium mb-1">
                                Category <span className="text-danger">*</span>
                            </label>
                            <select 
                                   className={inputStyle}
                                   {...register("category", {
                                    required:"Select a category"
                                   })}
                            >
                                <option value="">Select category</option>
                                {categoryOptions.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="text-danger text-sm mt-1">{errors.category.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Brand <span className="text-danger">*</span>
                            </label>
                            <input 
                                   type="text" 
                                   placeholder="Enter Brand"
                                   className={inputStyle}
                                   {...register("brand", {
                                    required: "Brand is required"
                                   })}
                            />
                            {errors.brand && (
                                <p className="text-sm text-danger mt-1">{errors.brand.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit">Save Product</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductForm;