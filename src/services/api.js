import axios from 'axios'

const BASE_URL = 'https://fakestoreapi.com'

const api = axios.create({
    baseURL: BASE_URL,
})

// Get all products
export const getAllProducts = () => api.get('/products')

// Get single product
export const getProductById = (id) => api.get(`/products/${id}`)

// Get all categories
export const getCategories = () => api.get('/products/categories')

// Get products by category
export const getProductsByCategory = (category) =>
    api.get(`/products/category/${category}`)