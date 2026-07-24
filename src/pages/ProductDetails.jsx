import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../services/api'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import toast from 'react-hot-toast'
import styles from './ProductDetails.module.css'

function ProductDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const { addToCart } = useCart()
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await getProductById(id)
                setProduct(res.data)
            } catch (error) {
                console.error('Failed to fetch product', error)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product)
        }
        toast.success(`Added ${quantity} item(s) to cart!`)
    }

    const handleBuyNow = () => {
        handleAddToCart()
        navigate('/checkout')
    }

    const handleWishlist = () => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id)
            toast.success('Removed from wishlist!')
        } else {
            addToWishlist(product)
            toast.success('Added to wishlist!')
        }
    }

    if (loading) {
        return (
            <div className={styles.skeletonPage}>
                <div className={styles.skeletonImage} />
                <div className={styles.skeletonInfo}>
                    <div className={styles.skeletonLine} />
                    <div className={styles.skeletonLine} />
                    <div className={styles.skeletonLineShort} />
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className={styles.error}>
                <span>😕</span>
                <h2>Product not found</h2>
                <button onClick={() => navigate('/products')}>Back to Products</button>
            </div>
        )
    }

    const inWishlist = isInWishlist(product.id)
    const stars = Math.round(product.rating.rate)

    return (
        <div className={styles.page}>
            <div className={styles.container}>

                {/* Breadcrumb */}
                <div className={styles.breadcrumb}>
                    <span onClick={() => navigate('/')}>Home</span>
                    <span> / </span>
                    <span onClick={() => navigate('/products')}>Products</span>
                    <span> / </span>
                    <span className={styles.current}>{product.title.slice(0, 30)}...</span>
                </div>

                <div className={styles.layout}>

                    {/* Left - Image */}
                    <div className={styles.imageSection}>
                        <div className={styles.imageWrapper}>
                            <img src={product.image} alt={product.title} />
                        </div>
                        <div className={styles.badges}>
                            <span className={styles.badge}>✅ In Stock</span>
                            <span className={styles.badge}>🚚 Free Delivery</span>
                            <span className={styles.badge}>↩️ 30 Day Returns</span>
                        </div>
                    </div>

                    {/* Right - Info */}
                    <div className={styles.infoSection}>
                        <p className={styles.category}>{product.category}</p>
                        <h1 className={styles.title}>{product.title}</h1>

                        {/* Rating */}
                        <div className={styles.ratingRow}>
                            <div className={styles.stars}>
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < stars ? styles.starFilled : styles.starEmpty}>
                                        ★
                                    </span>
                                ))}
                            </div>
                            <span className={styles.ratingText}>
                                {product.rating.rate} out of 5 ({product.rating.count} reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <div className={styles.priceRow}>
                            <span className={styles.price}>
                                ₹{(product.price * 83).toFixed(0)}
                            </span>
                            <span className={styles.originalPrice}>
                                ₹{(product.price * 83 * 1.2).toFixed(0)}
                            </span>
                            <span className={styles.discount}>20% OFF</span>
                        </div>

                        {/* Description */}
                        <p className={styles.description}>{product.description}</p>

                        {/* Quantity */}
                        <div className={styles.quantityRow}>
                            <span className={styles.label}>Quantity:</span>
                            <div className={styles.quantityControl}>
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className={styles.qtyBtn}
                                >−</button>
                                <span className={styles.qtyValue}>{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className={styles.qtyBtn}
                                >+</button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className={styles.actions}>
                            <button className={styles.addToCartBtn} onClick={handleAddToCart}>
                                🛒 Add to Cart
                            </button>
                            <button className={styles.buyNowBtn} onClick={handleBuyNow}>
                                ⚡ Buy Now
                            </button>
                            <button
                                className={`${styles.wishlistBtn} ${inWishlist ? styles.wishlisted : ''}`}
                                onClick={handleWishlist}
                            >
                                {inWishlist ? '❤️' : '🤍'}
                            </button>
                        </div>

                        {/* Extra Info */}
                        <div className={styles.extraInfo}>
                            <div className={styles.infoItem}>
                                <span>🏷️</span>
                                <p><strong>Category:</strong> {product.category}</p>
                            </div>
                            <div className={styles.infoItem}>
                                <span>📦</span>
                                <p><strong>Stock:</strong> Available</p>
                            </div>
                            <div className={styles.infoItem}>
                                <span>🔒</span>
                                <p><strong>Payment:</strong> Secure checkout</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails