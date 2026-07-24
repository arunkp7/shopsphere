import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'
import styles from './Cart.module.css'

function Cart() {
    const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart()
    const navigate = useNavigate()

    const handleRemove = (id) => {
        removeFromCart(id)
        toast.success('Item removed from cart!')
    }

    const handleClearCart = () => {
        clearCart()
        toast.success('Cart cleared!')
    }

    if (cartItems.length === 0) {
        return (
            <div className={styles.empty}>
                <span>🛒</span>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything yet.</p>
                <button onClick={() => navigate('/products')}>Start Shopping</button>
            </div>
        )
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.pageTitle}>Shopping Cart</h1>

                <div className={styles.layout}>

                    {/* Cart Items */}
                    <div className={styles.itemsSection}>
                        <div className={styles.itemsHeader}>
                            <span>{cartItems.length} item(s) in your cart</span>
                            <button onClick={handleClearCart} className={styles.clearBtn}>
                                🗑️ Clear Cart
                            </button>
                        </div>

                        {cartItems.map(item => (
                            <div key={item.id} className={styles.cartItem}>
                                <div
                                    className={styles.itemImage}
                                    onClick={() => navigate(`/products/${item.id}`)}
                                >
                                    <img src={item.image} alt={item.title} />
                                </div>

                                <div className={styles.itemInfo}>
                                    <p className={styles.itemCategory}>{item.category}</p>
                                    <h3
                                        className={styles.itemTitle}
                                        onClick={() => navigate(`/products/${item.id}`)}
                                    >
                                        {item.title}
                                    </h3>
                                    <p className={styles.itemPrice}>
                                        ₹{(item.price * 83).toFixed(0)} each
                                    </p>
                                </div>

                                <div className={styles.itemActions}>
                                    <div className={styles.quantityControl}>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className={styles.qtyBtn}
                                        >−</button>
                                        <span className={styles.qtyValue}>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className={styles.qtyBtn}
                                        >+</button>
                                    </div>
                                    <p className={styles.itemTotal}>
                                        ₹{(item.price * 83 * item.quantity).toFixed(0)}
                                    </p>
                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className={styles.removeBtn}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className={styles.summary}>
                        <h2>Order Summary</h2>

                        <div className={styles.summaryRow}>
                            <span>Subtotal</span>
                            <span>₹{cartTotal.toFixed(0) * 83}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span>Shipping</span>
                            <span className={styles.free}>FREE</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span>Tax (18% GST)</span>
                            <span>₹{(cartTotal * 83 * 0.18).toFixed(0)}</span>
                        </div>

                        <div className={styles.divider} />

                        <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                            <span>Total</span>
                            <span>₹{(cartTotal * 83 * 1.18).toFixed(0)}</span>
                        </div>

                        <button
                            className={styles.checkoutBtn}
                            onClick={() => navigate('/checkout')}
                        >
                            Proceed to Checkout →
                        </button>

                        <button
                            className={styles.continueBtn}
                            onClick={() => navigate('/products')}
                        >
                            Continue Shopping
                        </button>

                        <div className={styles.secureNote}>
                            🔒 Secure & Encrypted Checkout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart