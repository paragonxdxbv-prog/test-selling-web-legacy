"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Upload, ShoppingBag, Heart, Search, Plus, Edit, Trash2, Save, X } from "lucide-react"
import { ImageWithLoading } from "@/components/image-with-loading"
import { FirebaseAnalytics } from "@/components/firebase-analytics"
import { AdminAuth } from "@/components/admin-auth"
import { logEvent } from "@/lib/firebase-utils"
import { getProducts, addProduct, updateProduct, deleteProduct } from "@/lib/firebase-utils"

interface Product {
  id: string
  name: string
  price: string
  category: string
  image: string
  description: string
}

const categories = ["RUNNING SHOES", "LIFESTYLE SHOES", "MEN'S SHIRTS", "MEN'S PANTS", "MEN'S SHORTS", "MEN'S JACKETS", "MEN'S HOODIE", "ACCESSORIES"]

export default function AdminPage() {
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: ""
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const productsData = await getProducts()
      setProducts(productsData)
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setFormData({
      name: "",
      price: "",
      category: "",
      image: "",
      description: ""
    })
    setShowForm(true)
    logEvent('admin_action', { action: 'add_product_form' })
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
      description: product.description
    })
    setShowForm(true)
    logEvent('admin_action', { action: 'edit_product_form', product_id: product.id })
  }

  const handleSaveProduct = async () => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData)
        logEvent('admin_action', { action: 'update_product', product_id: editingProduct.id })
      } else {
        await addProduct(formData)
        logEvent('admin_action', { action: 'add_product' })
      }
      
      await loadProducts()
      setShowForm(false)
      setEditingProduct(null)
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Error saving product. Please try again.')
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId)
        logEvent('admin_action', { action: 'delete_product', product_id: productId })
        await loadProducts()
      } catch (error) {
        console.error('Error deleting product:', error)
        alert('Error deleting product. Please try again.')
      }
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingProduct(null)
    setFormData({
      name: "",
      price: "",
      category: "",
      image: "",
      description: ""
    })
  }

  return (
    <div
      className={`min-h-screen bg-white text-black font-mono transition-all duration-1000 ${
        isPageLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <AdminAuth />
      <FirebaseAnalytics />
      
      {/* Header */}
      <header
        className={`px-8 py-6 border-b border-gray-200 transition-all duration-700 ${
          isPageLoaded ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <a href="/home">
              <img src="/acme-logo.png" alt="LEGACY" className="h-10 w-auto" />
            </a>
            <span className="ml-4 text-xs font-medium tracking-widest uppercase text-gray-500">ADMIN PANEL</span>
          </div>

          <nav className="hidden md:flex items-center space-x-12">
            <a
              href="/home"
              className={`text-black hover:text-gray-500 text-xs font-medium tracking-widest uppercase transition-all duration-500 ${
                isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              HOME
            </a>
            <a
              href="/products"
              className={`text-black hover:text-gray-500 text-xs font-medium tracking-widest uppercase transition-all duration-500 ${
                isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              PRODUCTS
            </a>
            <a
              href="/about"
              className={`text-black hover:text-gray-500 text-xs font-medium tracking-widest uppercase transition-all duration-500 ${
                isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              ABOUT
            </a>
          </nav>

          <div
            className={`flex items-center space-x-6 transition-all duration-700 ${
              isPageLoaded ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <Button
              onClick={handleAddProduct}
              className="bg-black text-white hover:bg-gray-800 border-0 text-xs font-medium tracking-widest uppercase px-6 py-2 transition-all duration-300 hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              ADD PRODUCT
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div
            className={`flex items-center justify-between mb-12 transition-all duration-700 ${
              isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <h1 className="text-3xl font-medium tracking-widest uppercase">PRODUCT MANAGEMENT</h1>
            <div className="text-sm text-gray-500 font-mono">
              {products.length} PRODUCTS
            </div>
          </div>

          {/* Product Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-medium tracking-widest uppercase">
                    {editingProduct ? 'EDIT PRODUCT' : 'ADD PRODUCT'}
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    className="border-gray-300 text-gray-600 hover:bg-gray-100"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium tracking-widest uppercase mb-2">
                      PRODUCT NAME
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter product name"
                      className="border-gray-300 focus:border-black"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium tracking-widest uppercase mb-2">
                        PRICE
                      </label>
                      <Input
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="$180"
                        className="border-gray-300 focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium tracking-widest uppercase mb-2">
                        CATEGORY
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 focus:border-black focus:outline-none text-sm"
                      >
                        <option value="">Select category</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium tracking-widest uppercase mb-2">
                      IMAGE URL
                    </label>
                    <Input
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                      className="border-gray-300 focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium tracking-widest uppercase mb-2">
                      DESCRIPTION
                    </label>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter product description"
                      rows={4}
                      className="border-gray-300 focus:border-black"
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      className="border-gray-300 text-gray-600 hover:bg-gray-100"
                    >
                      CANCEL
                    </Button>
                    <Button
                      onClick={handleSaveProduct}
                      className="bg-black text-white hover:bg-gray-800"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {editingProduct ? 'UPDATE' : 'SAVE'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
              <p className="text-sm font-mono tracking-widest uppercase text-gray-500">LOADING PRODUCTS...</p>
            </div>
          ) : (
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 transition-all duration-700 ${
              isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "500ms" }}>
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className={`group cursor-pointer transition-all duration-700 ${
                    isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className="relative w-full overflow-hidden mb-4">
                    <ImageWithLoading
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleEditProduct(product)}
                        className="bg-white text-black hover:bg-gray-100 border-0 p-2 h-8 w-8"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-500 text-white hover:bg-red-600 border-0 p-2 h-8 w-8"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h3 className="text-sm font-medium tracking-wide">{product.name}</h3>
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">{product.category}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium tracking-wide">{product.price}</span>
                      <span className="text-xs text-gray-400 font-mono">ID: {product.id}</span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div
              className={`text-center py-16 transition-all duration-700 ${
                isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <p className="text-gray-500 text-sm font-mono tracking-widest uppercase mb-4">
                NO PRODUCTS FOUND
              </p>
              <Button
                onClick={handleAddProduct}
                className="bg-black text-white hover:bg-gray-800 border-0 text-xs font-medium tracking-widest uppercase px-6 py-2"
              >
                <Plus className="w-4 h-4 mr-2" />
                ADD FIRST PRODUCT
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`border-t border-gray-200 px-8 py-16 bg-gray-50 transition-all duration-700 ${
          isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ transitionDelay: "1000ms" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img src="/acme-logo.png" alt="LEGACY" className="h-8 w-auto opacity-40" />
          </div>
          <p className="text-gray-400 text-xs font-mono tracking-widest uppercase">
            © 2025 LEGACY, INC. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  )
}
