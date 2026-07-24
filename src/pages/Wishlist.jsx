import { useNavigate } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'
import styles from './Wishlist.module.css'

function Wishlist() {
    const { wishlistItems, removeFromWishlist } = useWishlist()
    const { addToCart } = useCart()
    const navigate = useNavigate()

    const handleMoveToCart = (product) => {
        addToCart(product)
        removeFromWishlist(product.id)
        toast.success('Moved to cart!')
    }

    const handleRemove = (id) => {
        removeFromWishlist(id)
        toast.success('Removed from wishlist!')
    }

    if (wishlistItems.length === 0) {
        return (
            <div className={styles.empty}>
                <span>🤍</span>
                <h2>Your wishlist is empty</h2>
                <p>Save items you love and come back to them anytime.</p>
                <button onClick={() => navigate('/products')}>Explore Products</button>
            </div>
        )
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.pageHeader}>
                    <h1>My Wishlist</h1>
                    <p>{wishlistItems.length} item(s) saved</p>
                </div>

                <div className={styles.grid}>
                    {wishlistItems.map(product => (
                        <div key={product.id} className={styles.card}>
                            <div
                                className={styles.cardImage}
                                onClick={() => navigate(`/products/${product.id}`)}
                            >
                                <img src={product.image} alt={product.title} />
                                <button
                                    className={styles.removeBtn}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleRemove(product.id)
                                    }}
                                >✕</button>
                            </div>

                            <div className={styles.cardInfo}>
                                <p className={styles.category}>{product.category}</p>
                                <h3
                                    className={styles.title}
                                    onClick={() => navigate(`/products/${product.id}`)}
                                >
                                    {product.title}
                                </h3>
                                <div className={styles.rating}>
                                    ⭐ {product.rating.rate}
                                    <span>({product.rating.count})</span>
                                </div>
                                <div className={styles.cardBottom}>
                                    <span className={styles.price}>
                                        ₹{(product.price * 83).toFixed(0)}
                                    </span>
                                    <button
                                        className={styles.moveToCartBtn}
                                        onClick={() => handleMoveToCart(product)}
                                    >
                                        🛒 Move to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Wishlist