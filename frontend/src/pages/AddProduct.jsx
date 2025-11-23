import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Package, DollarSign, Hash, Upload, AlertCircle, Loader2, X } from "lucide-react";

export default function AddProduct() {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const categories = ["keyboard","Mouse","Headphone","Monitor","Laptop"];

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError("");

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login as admin first!");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("category", data.category);
    if (data.image) formData.append("image", data.image); 

    try {
      const response = await fetch("http://127.0.0.1:8000/api/admin/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
         
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Product added successfully!");
        navigate("/admin/viewProduct");
      } else {
        setServerError(result.detail || "Failed to add product");
      }
    } catch (err) {
      setServerError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto border border-gray-100">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Package className="w-8 h-8 text-blue-600" />
          Add New Product
        </h1>
        <p className="text-gray-600 mt-2">Fill in the details to add a product to your store.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g., iPhone 15 Pro"
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm font-medium"
            {...register("name", { required: "Product name is required", minLength: { value: 3, message: "Min 3 characters" } })}
          />
          {errors.name && <p className="mt-2 text-xs text-red-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            placeholder="Describe your product..."
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm resize-none"
            {...register("description", { required: "Description is required", minLength: { value: 10, message: "Min 10 characters" } })}
          />
          {errors.description && <p className="mt-2 text-xs text-red-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Price (Rs) <span className="text-red-500">*</span></label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="number"
                step="0.01"
                placeholder="999.99"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm font-medium"
                {...register("price", { required: "Price is required", min: { value: 0.01, message: "Must be > 0" } })}
              />
            </div>
            {errors.price && <p className="mt-2 text-xs text-red-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.price.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity <span className="text-red-500">*</span></label>
            <div className="relative">
              <Hash className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="number"
                placeholder="50"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm font-medium"
                {...register("stock", { required: "Stock is required", min: { value: 0, message: "Must be >= 0" } })}
              />
            </div>
            {errors.stock && <p className="mt-2 text-xs text-red-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.stock.message}</p>}
          </div>
        </div>

      
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Category <span className="text-red-500">*</span></label>
          <select
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm"
            {...register("category", { required: "Select a category" })}
          >
            <option value="">Choose category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="mt-2 text-xs text-red-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.category.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Product Image <span className="text-red-500">*</span>
          </label>

          <input
            type="file"
            accept="image/*"
            id="image-upload"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

          
              setImagePreview(URL.createObjectURL(file));
              setUploading(true);

              const formData = new FormData();
              formData.append("file", file); 

              try {
                const token = localStorage.getItem("token");
                const res = await fetch("http://127.0.0.1:8000/api/admin/upload-image", {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                  body: formData,
                });

                const result = await res.json();

                if (res.ok) {
                  setValue("image", result.image_url); 
                  console.log("Image uploaded:", result.image_url);
                } else {
                  alert("Upload failed: " + (result.detail || "Unknown error"));
                  setImagePreview("");
                }
              } catch (err) {
                console.error("Upload error:", err);
                alert("Upload failed. Check console.");
                setImagePreview("");
              } finally {
                setUploading(false); 
              }
            }}
          />

          {!imagePreview ? (
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-blue-500 transition-all"
            >
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-sm font-medium text-gray-700">Click to upload image</p>
              <p className="text-xs text-gray-500">PNG, JPG, WebP up to 5MB</p>
            </label>
          ) : (
            <div className="mt-6 relative group">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-80 object-cover rounded-xl border border-gray-200 shadow-lg"
              />
              {uploading && (
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-xl">
                  <Loader2 className="w-12 h-12 text-white animate-spin" />
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  setImagePreview("");
                  document.getElementById("image-upload").value = "";
                  setValue("image", "");
                }}
                className="absolute top-4 right-4 p-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

    
        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-5 py-3.5 rounded-xl text-sm text-center font-medium">
            {serverError}
          </div>
        )}

     
        <div className="flex items-center gap-4 pt-6">
          <button
            type="submit"
            disabled={loading || uploading}
            className={`flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg transform active:scale-95 ${(loading || uploading) ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading || uploading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                {uploading ? "Uploading Image..." : "Adding Product..."}
              </>
            ) : (
              <>
                <Package className="w-5 h-5" />
                Add Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}