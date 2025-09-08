export const sections = [
  {
    id: "hero",
    title: "Welcome to LEGACY",
    content: "Discover premium digital products crafted for creators, entrepreneurs, and innovators.",
    showButton: true,
    buttonText: "Shop Now",
    showLogo: true,
  },
  {
    id: "products",
    title: "Digital Products",
    content:
      "Explore our curated collection of templates, tools, and resources designed to elevate your projects and streamline your workflow.",
    products: [
      {
        id: "web-templates",
        name: "LEGACY Web Templates",
        description: "Sophisticated, responsive website templates with timeless design principles",
        price: 49,
        originalPrice: 79,
        category: "Templates",
        image: "/placeholder.svg?height=300&width=400",
        features: ["Responsive Design", "Dark/Light Mode", "SEO Optimized", "Easy Customization"],
      },
      {
        id: "ui-components",
        name: "LEGACY UI Components",
        description: "Premium React components with clean, minimalist design philosophy",
        price: 89,
        originalPrice: 129,
        category: "Components",
        image: "/placeholder.svg?height=300&width=400",
        features: ["50+ Components", "TypeScript Support", "Storybook Docs", "Figma Files"],
      },
      {
        id: "design-system",
        name: "LEGACY Design System",
        description: "Complete design system built on timeless principles and modern standards",
        price: 149,
        originalPrice: 199,
        category: "Design",
        image: "/placeholder.svg?height=300&width=400",
        features: ["Design Tokens", "Icon Library", "Style Guide", "Sketch & Figma"],
      },
    ],
  },
  {
    id: "testimonials",
    title: "Customer Reviews",
    content:
      "Join thousands of satisfied customers who have transformed their projects with our premium digital products.",
  },
  {
    id: "contact",
    title: "Get in Touch",
    content: "Have questions about our products or need custom solutions? We're here to help you succeed.",
    showButton: true,
    buttonText: "Contact Support",
  },
]
