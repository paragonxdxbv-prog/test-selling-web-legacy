"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Upload, ShoppingBag, Heart, Search, Filter, Grid, List } from "lucide-react"
import { ImageWithLoading } from "@/components/image-with-loading"
import { FirebaseAnalytics } from "@/components/firebase-analytics"
import { logEvent, getProducts } from "@/lib/firebase-utils"

interface Product {
  id: string
  name: string
  price: string
  category: string
  image: string
  description: string
}

// Products will be loaded from Firebase

const categories = ["ALL", "SHOES", "CLOTHING", "ACCESSORIES", "NEW ARRIVALS"]

export default function ProductsPage() {
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("ALL")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())

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

  const handleImageLoad = (productId: string) => {
    setLoadedImages((prev) => new Set([...prev, productId]))
  }

  const handleAddToCart = (product: Product) => {
    logEvent('add_to_cart', {
      item_id: product.id,
      item_name: product.name,
      category: product.category,
      price: product.price,
      currency: 'USD'
    })
    // Add to cart logic here
  }

  const handleCategoryFilter = (category: string) => {
    logEvent('filter_products', {
      filter_type: 'category',
      filter_value: category
    })
    setSelectedCategory(category)
  }

  const handleViewModeChange = (mode: "grid" | "list") => {
    logEvent('change_view_mode', {
      view_mode: mode
    })
    setViewMode(mode)
  }

  const filteredProducts = selectedCategory === "ALL" 
    ? products 
    : products.filter(product => 
        product.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        product.name.toLowerCase().includes(selectedCategory.toLowerCase())
      )

  return (
    <div
      className={`min-h-screen bg-white text-black font-mono transition-all duration-1000 ${
        isPageLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
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
              href="/about"
              className={`text-black hover:text-gray-500 text-xs font-medium tracking-widest uppercase transition-all duration-500 ${
                isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              ABOUT
            </a>
            {["MEN", "WOMEN", "KIDS"].map((item, index) => (
              <a
                key={item}
                href="#"
                className={`text-black hover:text-gray-500 text-xs font-medium tracking-widest uppercase transition-all duration-500 ${
                  isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                {item}
              </a>
            ))}
            <Button
              variant="outline"
              size="sm"
              className={`border-black text-black hover:bg-black hover:text-white text-xs font-medium tracking-widest uppercase bg-transparent px-6 transition-all duration-500 ${
                isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              AI TRY-ON
            </Button>
          </nav>

          <div
            className={`flex items-center space-x-6 transition-all duration-700 ${
              isPageLoaded ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="hidden md:flex items-center bg-gray-50 rounded-none px-4 py-2 border border-gray-200">
              <Search className="w-4 h-4 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="SEARCH"
                className="bg-transparent text-xs outline-none placeholder-gray-400 w-24 font-mono tracking-wider"
              />
            </div>
            <Heart className="w-4 h-4 text-black cursor-pointer hover:text-gray-500 transition-colors" />
            <ShoppingBag className="w-4 h-4 text-black cursor-pointer hover:text-gray-500 transition-colors" />
          </div>
        </div>
      </header>

      {/* Page Title */}
      <section className="px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div
            className={`flex items-center justify-between mb-8 transition-all duration-700 ${
              isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <h1 className="text-3xl font-medium tracking-widest uppercase">PRODUCTS</h1>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                className={`border-gray-300 text-gray-600 hover:bg-gray-100 text-xs font-medium tracking-widest uppercase bg-transparent px-4 transition-all duration-300 ${
                  viewMode === "grid" ? "bg-black text-white" : ""
                }`}
                onClick={() => handleViewModeChange("grid")}
              >
                <Grid className="w-4 h-4 mr-2" />
                GRID
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`border-gray-300 text-gray-600 hover:bg-gray-100 text-xs font-medium tracking-widest uppercase bg-transparent px-4 transition-all duration-300 ${
                  viewMode === "list" ? "bg-black text-white" : ""
                }`}
                onClick={() => handleViewModeChange("list")}
              >
                <List className="w-4 h-4 mr-2" />
                LIST
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <div
            className={`flex flex-wrap gap-4 mb-12 transition-all duration-700 ${
              isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            {categories.map((category, index) => (
              <Button
                key={category}
                variant="outline"
                className={`border-gray-300 text-gray-600 hover:bg-gray-100 text-xs font-medium tracking-widest uppercase bg-transparent px-6 transition-all duration-300 ${
                  selectedCategory === category ? "bg-black text-white border-black" : ""
                }`}
                onClick={() => handleCategoryFilter(category)}
                style={{ transitionDelay: `${500 + index * 100}ms` }}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
              <p className="text-sm font-mono tracking-widest uppercase text-gray-500">LOADING PRODUCTS...</p>
            </div>
          ) : (
            <div className={`grid gap-8 transition-all duration-700 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                : "grid-cols-1"
            } ${isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
            style={{ transitionDelay: "600ms" }}>
              {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`group cursor-pointer transition-all duration-700 ${
                  isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                } ${viewMode === "list" ? "flex items-center space-x-6" : ""}`}
                style={{ transitionDelay: `${700 + index * 100}ms` }}
              >
                <div className={`relative overflow-hidden mb-4 ${viewMode === "list" ? "w-32 h-32 flex-shrink-0" : "w-full"}`}>
                  <ImageWithLoading
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className={`w-full h-auto object-contain group-hover:scale-105 transition-all duration-500 ${
                      viewMode === "list" ? "h-full object-cover" : ""
                    }`}
                    onLoad={() => handleImageLoad(product.id)}
                  />
                </div>

                <div className={`space-y-3 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div>
                    <h3 className="text-sm font-medium tracking-wide">{product.name}</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">{product.category}</p>
                    {viewMode === "list" && (
                      <p className="text-xs text-gray-600 mt-2">{product.description}</p>
                    )}
                  </div>
                  <div className={`flex items-center justify-between ${viewMode === "list" ? "mt-4" : ""}`}>
                    <span className="text-sm font-medium tracking-wide">{product.price}</span>
                    <button 
                      className="bg-white text-black border-2 border-black px-6 py-2 text-xs font-medium tracking-widest uppercase cursor-pointer hover:bg-black hover:text-white transition-all duration-300 hover:scale-105"
                      onClick={() => handleAddToCart(product)}
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
              ))}
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div
              className={`text-center py-16 transition-all duration-700 ${
                isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <p className="text-gray-500 text-sm font-mono tracking-widest uppercase">
                NO PRODUCTS FOUND
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Upload Area */}
      <div
        className={`fixed bottom-8 right-8 z-40 transition-all duration-700 ${
          isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
        style={{ transitionDelay: "800ms" }}
      >
        <div className="border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center w-64 hover:shadow-md hover:scale-102">
          <Upload className="w-6 h-6 mx-auto mb-3 text-gray-400 animate-bounce" />
          <h3 className="text-sm font-medium mb-2 tracking-wide animate-pulse">DROP YOUR PHOTO</h3>
          <p className="text-xs text-gray-400 font-mono tracking-wider mt-2 animate-fade-in">
            To see how the products would look on you
          </p>
        </div>
      </div>

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
