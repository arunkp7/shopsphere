import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAllProducts, getProductsByCategory, getCategories } from '../services/api'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import toast from 'react-hot-toast'
import styles from './Products.module.css'

function Products() {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [sortBy, setSortBy] = useState('default')
    const [priceRange, setPriceRange] = useState('all')
    const [minRating, setMinRating] = useState(0)
    const [searchQuery, setSearchQuery] = useState('')

    const { addToCart } = useCart()
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
    const location = useLocation()
    const navigate = useNavigate()

    // Read URL params
    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const category = params.get('category')
        const search = params.get('search')
        if (category) setSelectedCategory(category)
        if (search) setSearchQuery(search)
    }, [location.search])

    // Fetch products
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    getAllProducts(),
                    getCategories()
                ])
                setProducts(productsRes.data)
                setCategories(categoriesRes.data)
            } catch (error) {
                console.error('Failed to fetch', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    // Filter & Sort
    useEffect(() => {
        let result = [...products]

        // Category filter
        if (selectedCategory !== 'all') {
            result = result.filter(p => p.category === selectedCategory)
        }

        // Search filter
        if (searchQuery) {
            result = result.filter(p =>
                p.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // Price filter
        if (priceRange === '0-500') {
            result = result.filter(p => p.price * 83 <= 500)
        } else if (priceRange === '500-1000') {
            result = result.filter(p => p.price * 83 > 500 && p.price * 83 <= 1000)
        } else if (priceRange === '1000+') {
            result = result.filter(p => p.price * 83 > 1000)
        }

        // Rating filter
        if (minRating > 0) {
            result = result.filter(p => p.rating.rate >= minRating)
        }

        // Sort
        if (sortBy === 'price-low') {
            result.sort((a, b) => a.price - b.price)
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => b.price - a.price)
        } else if (sortBy === 'rating') {
            result.sort((a, b) => b.rating.rate - a.rating.rate)
        }

        setFilteredProducts(result)
    }, [products, selectedCategory, searchQuery, priceRange, minRating, sortBy])

    const handleAddToCart = (e, product) => {
        e.stopPropagation()
        addToCart(product)
        toast.success('Added to cart!')
    }

    const handleWishlist = (e, product) => {
        e.stopPropagation()
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id)
            toast.success('Removed from wishlist!')
        } else {
            addToWishlist(product)
            toast.success('Added to wishlist!')
        }
    }

    const clearFilters = () => {
        setSelectedCategory('all')
        setSortBy('default')
        setPriceRange('all')
        setMinRating(0)
        setSearchQuery('')
        navigate('/products')
    }

    return (
        <div className={styles.page}>

            <div className={styles.layout}>

                {/* Sidebar Filters */}
                <aside className={styles.sidebar}>
                    <div className={styles.filterHeader}>
                        <h3>Filters</h3>
                        <button onClick={clearFilters} className={styles.clearBtn}>Clear All</button>
                    </div>

                    {/* Category */}
                    <div className={styles.filterSection}>
                        <h4>Category</h4>
                        <label className={styles.filterOption}>
                            <input
                                type="radio"
                                name="category"
                                checked={selectedCategory === 'all'}
                                onChange={() => setSelectedCategory('all')}
                            />
                            All
                        </label>
                        {categories.map(cat => (
                            <label key={cat} className={styles.filterOption}>
                                <input
                                    type="radio"
                                    name="category"
                                    checked={selectedCategory === cat}
                                    onChange={() => setSelectedCategory(cat)}
                                />
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </label>
                        ))}
                    </div>

                    {/* Price Range */}
                    <div className={styles.filterSection}>
                        <h4>Price Range</h4>
                        {[
                            { value: 'all', label: 'All Prices' },
                            { value: '0-500', label: '₹0 – ₹500' },
                            { value: '500-1000', label: '₹500 – ₹1000' },
                            { value: '1000+', label: '₹1000+' },
                        ].map(option => (
                            <label key={option.value} className={styles.filterOption}>
                                <input
                                    type="radio"
                                    name="price"
                                    checked={priceRange === option.value}
                                    onChange={() => setPriceRange(option.value)}
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>

                    {/* Rating */}
                    <div className={styles.filterSection}>
                        <h4>Minimum Rating</h4>
                        {[4, 3, 2].map(rating => (
                            <label key={rating} className={styles.filterOption}>
                                <input
                                    type="radio"
                                    name="rating"
                                    checked={minRating === rating}
                                    onChange={() => setMinRating(rating)}
                                />
                                {rating}★ & above
                            </label>
                        ))}
                        <label className={styles.filterOption}>
                            <input
                                type="radio"
                                name="rating"
                                checked={minRating === 0}
                                onChange={() => setMinRating(0)}
                            />
                            All Ratings
                        </label>
                    </div>

                    {/* Sort */}
                    <div className={styles.filterSection}>
                        <h4>Sort By</h4>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className={styles.select}
                        >
                            <option value="default">Default</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                        </select>
                    </div>
                </aside>

                {/* Products Grid */}
                <main className={styles.main}>
                    {loading ? (
                        <div className={styles.grid}>
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className={styles.skeleton} />
                            ))}
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className={styles.empty}>
                            <span>🔍</span>
                            <h3>No products found</h3>
                            <p>Try adjusting your filters or search query</p>
                            <button onClick={clearFilters} className={styles.retryBtn}>
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className={styles.grid}>
                            {filteredProducts.map(product => (
                                <div
                                    key={product.id}
                                    className={styles.card}
                                    onClick={() => navigate(`/products/${product.id}`)}
                                >
                                    <div className={styles.cardImage}>
                                        <img src={product.image} alt={product.title} />
                                        <button
                                            className={`${styles.wishlistBtn} ${isInWishlist(product.id) ? styles.wishlisted : ''}`}
                                            onClick={(e) => handleWishlist(e, product)}
                                        >
                                            {isInWishlist(product.id) ? '❤️' : '🤍'}
                                        </button>
                                    </div>
                                    <div className={styles.cardInfo}>
                                        <p className={styles.cardCategory}>{product.category}</p>
                                        <h3 className={styles.cardTitle}>{product.title}</h3>
                                        <div className={styles.cardRating}>
                                            ⭐ {product.rating.rate}
                                            <span>({product.rating.count})</span>
                                        </div>
                                        <div className={styles.cardBottom}>
                                            <span className={styles.cardPrice}>
                                                ₹{(product.price * 83).toFixed(0)}
                                            </span>
                                            <button
                                                className={styles.addToCartBtn}
                                                onClick={(e) => handleAddToCart(e, product)}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default Products