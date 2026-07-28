# 🛍️ ShopSphere — Modern E-Commerce Frontend

![ShopSphere](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-purple?style=for-the-badge&logo=vite)
![CSS Modules](https://img.shields.io/badge/CSS-Modules-orange?style=for-the-badge&logo=css3)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A fully responsive, feature-rich e-commerce frontend built with React 19. ShopSphere simulates a real-world online shopping experience with product browsing, cart management, wishlist, authentication, checkout flow, and dark mode.

> 🔗 **Live Demo:** [shopsphere.vercel.app](https://shopsphere.vercel.app)

---

## 📸 Screenshots

| Home Page | Products Page |
|-----------|--------------|
| ![Home]() | ![Products]() |

| Product Details | Cart |
|----------------|------|
| ![Details]() | ![Cart]() |

---

## ✨ Features

- 🏠 **Home Page** — Hero banner, featured products, categories, features section, newsletter
- 🛒 **Product Listing** — Grid layout with live search, filters, sorting and pagination
- 📦 **Product Details** — Full product info, quantity selector, add to cart, buy now, wishlist
- 🔍 **Search** — Instant search with partial matching from navbar and products page
- 🎛️ **Filters** — Filter by category, price range, rating and sort order
- 🛍️ **Shopping Cart** — Add, remove, update quantity, persistent via localStorage
- ❤️ **Wishlist** — Save products, move to cart, persistent via localStorage
- 🔐 **Authentication** — Mock login/signup with form validation and protected routes
- 💳 **Checkout** — 3-step flow: shipping → payment → review, with promo code support
- 👤 **Profile** — View orders, saved address, edit settings
- 🌙 **Dark Mode** — Full dark/light theme toggle, preference saved in localStorage
- 📱 **Responsive** — Works seamlessly on desktop, tablet and mobile
- 💀 **Skeletons** — Loading skeleton screens instead of blank pages
- 🔔 **Toast Notifications** — Feedback for all user actions
- 🚫 **404 Page** — Custom not found page
- ⬆️ **Back to Top** — Smooth scroll button on long pages

---

## 🧰 Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Routing | React Router DOM v7 |
| HTTP Client | Axios |
| Styling | CSS Modules |
| State Management | Context API + useState |
| Persistence | localStorage |
| Notifications | react-hot-toast |
| API | FakeStore API |
| Deployment | Vercel |

---

## 📁 Folder Structure

src/
├── assets/
├── components/
│ ├── Navbar.jsx
│ ├── Footer.jsx
│ ├── ScrollToTop.jsx
│ └── BackToTop.jsx
├── context/
│ ├── AuthContext.jsx
│ ├── CartContext.jsx
│ ├── WishlistContext.jsx
│ └── ThemeContext.jsx
├── pages/
│ ├── Home.jsx
│ ├── Products.jsx
│ ├── ProductDetails.jsx
│ ├── Cart.jsx
│ ├── Wishlist.jsx
│ ├── Checkout.jsx
│ ├── Login.jsx
│ ├── Profile.jsx
│ └── NotFound.jsx
├── routes/
│ └── ProtectedRoute.jsx
├── services/
│ └── api.js
├── App.jsx
└── main.jsx

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/shopsphere.git

# Navigate into the project
cd shopsphere

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## 🔑 Demo Credentials

Email: demo@shopsphere.com
Password: demo123

---

## 🛒 API Reference

This project uses the [FakeStore API](https://fakestoreapi.com).

| Endpoint | Description |
|----------|-------------|
| `GET /products` | Fetch all products |
| `GET /products/:id` | Fetch single product |
| `GET /products/categories` | Fetch all categories |
| `GET /products/category/:name` | Fetch products by category |

---

## 🎯 React Concepts Demonstrated

- Functional Components
- React Hooks (`useState`, `useEffect`, `useContext`)
- Custom Hooks
- Context API for global state
- React Router DOM (nested routes, protected routes, URL params)
- Conditional Rendering
- Component Reusability
- CSS Modules for scoped styling
- localStorage for persistence

---

## 🔮 Future Improvements

- [ ] Backend integration with Node.js + MongoDB
- [ ] Real payment gateway (Razorpay / Stripe)
- [ ] Product reviews and ratings
- [ ] Order tracking system
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Infinite scroll / pagination
- [ ] Image zoom on product details
- [ ] Recently viewed products
- [ ] Coupon management system

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙋‍♂️ Author

**Arun**
- GitHub: [@arunkp7](https://github.com/arunkp7)
- LinkedIn: [arun-k-pal](https://linkedin.com/in/arun-k-pal)

---

⭐ If you found this project helpful, please give it a star!