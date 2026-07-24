import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllProducts, getCategories } from '../services/api'
import styles from './Home.module.css'

function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    getAllProducts(),
                    getCategories()
                ])
                setFeaturedProducts(productsRes.data.slice(0, 8))
                setCategories(categoriesRes.data)
            } catch (error) {
                console.error('Failed to fetch data', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const categoryIcons = {
        "electronics": "💻",
        "jewelery": "💍",
        "men's clothing": "👔",
        "women's clothing": "👗"
    }

    const handleNewsletterSubmit = (e) => {
        e.preventDefault()
        alert(`Thanks for subscribing with ${email}!`)
        setEmail('')
    }

    return (
        <div className={styles.home}>

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>Welcome to <span>ShopSphere</span></h1>
                    <p>Discover thousands of products at unbeatable prices. Shop the latest trends in electronics, fashion, jewelry and more.</p>
                    <div className={styles.heroButtons}>
                        <Link to="/products" className={styles.btnPrimary}>Shop Now</Link>
                        <Link to="/products?category=electronics" className={styles.btnSecondary}>Browse Categories</Link>
                    </div>
                </div>
                <div className={styles.heroImage}>
                    <div className={styles.heroCard}>
                        <span>🛍️</span>
                        <p>10,000+ Products</p>
                    </div>
                    <div className={styles.heroCard}>
                        <span>🚚</span>
                        <p>Free Delivery</p>
                    </div>
                    <div className={styles.heroCard}>
                        <span>⭐</span>
                        <p>Top Rated</p>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Shop by Category</h2>
                    <p className={styles.sectionSubtitle}>Find exactly what you're looking for</p>
                    {loading ? (
                        <div className={styles.skeletonGrid}>
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className={styles.skeletonCard} />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.categoriesGrid}>
                            {categories.map(category => (
                                <Link
                                    key={category}
                                    to={`/products?category=${category}`}
                                    className={styles.categoryCard}
                                >
                                    <span className={styles.categoryIcon}>
                                        {categoryIcons[category] || '🛒'}
                                    </span>
                                    <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Featured Products */}
            <section className={`${styles.section} ${styles.bgGray}`}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Featured Products</h2>
                    <p className={styles.sectionSubtitle}>Handpicked just for you</p>
                    {loading ? (
                        <div className={styles.productsGrid}>
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className={styles.skeletonProduct} />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.productsGrid}>
                            {featuredProducts.map(product => (
                                <div
                                    key={product.id}
                                    className={styles.productCard}
                                    onClick={() => navigate(`/products/${product.id}`)}
                                >
                                    <div className={styles.productImage}>
                                        <img src={product.image} alt={product.title} />
                                    </div>
                                    <div className={styles.productInfo}>
                                        <p className={styles.productCategory}>{product.category}</p>
                                        <h3 className={styles.productTitle}>{product.title}</h3>
                                        <div className={styles.productBottom}>
                                            <span className={styles.productPrice}>
                                                ₹{(product.price * 83).toFixed(0)}
                                            </span>
                                            <span className={styles.productRating}>
                                                ⭐ {product.rating.rate}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className={styles.viewAll}>
                        <Link to="/products" className={styles.btnPrimary}>View All Products</Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Why Choose ShopSphere?</h2>
                    <div className={styles.featuresGrid}>
                        <div className={styles.featureCard}>
                            <span>🚚</span>
                            <h3>Free Shipping</h3>
                            <p>On all orders above ₹500</p>
                        </div>
                        <div className={styles.featureCard}>
                            <span>🔒</span>
                            <h3>Secure Payment</h3>
                            <p>100% secure transactions</p>
                        </div>
                        <div className={styles.featureCard}>
                            <span>↩️</span>
                            <h3>Easy Returns</h3>
                            <p>30-day return policy</p>
                        </div>
                        <div className={styles.featureCard}>
                            <span>🎧</span>
                            <h3>24/7 Support</h3>
                            <p>Always here to help</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className={styles.newsletter}>
                <div className={styles.container}>
                    <h2>Stay in the Loop</h2>
                    <p>Subscribe to get the latest deals and offers directly in your inbox.</p>
                    <form className={styles.newsletterForm} onSubmit={handleNewsletterSubmit}>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </section>

        </div>
    )
}

export default Home