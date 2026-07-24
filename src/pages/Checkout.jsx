import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import styles from './Checkout.module.css'

function Checkout() {
    const { cartItems, cartTotal, clearCart } = useCart()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const [promoCode, setPromoCode] = useState('')
    const [promoApplied, setPromoApplied] = useState(false)
    const [orderPlaced, setOrderPlaced] = useState(false)
    const [orderId, setOrderId] = useState('')
    const [formData, setFormData] = useState({
        fullName: user?.name || '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        paymentMethod: 'card',
        cardNumber: '',
        cardExpiry: '',
        cardCvv: '',
    })
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setErrors(prev => ({ ...prev, [e.target.name]: '' }))
    }

    const validateStep1 = () => {
        const newErrors = {}
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
        if (!formData.email.trim()) newErrors.email = 'Email is required'
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
        if (!formData.address.trim()) newErrors.address = 'Address is required'
        if (!formData.city.trim()) newErrors.city = 'City is required'
        if (!formData.state.trim()) newErrors.state = 'State is required'
        if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required'
        return newErrors
    }

    const validateStep2 = () => {
        const newErrors = {}
        if (formData.paymentMethod === 'card') {
            if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required'
            if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Expiry is required'
            if (!formData.cardCvv.trim()) newErrors.cardCvv = 'CVV is required'
        }
        return newErrors
    }

    const handlePromo = () => {
        if (promoCode.toUpperCase() === 'SHOP10') {
            setPromoApplied(true)
            toast.success('Promo code applied! 10% off')
        } else {
            toast.error('Invalid promo code')
        }
    }

    const discount = promoApplied ? cartTotal * 83 * 0.1 : 0
    const tax = cartTotal * 83 * 0.18
    const finalTotal = cartTotal * 83 + tax - discount

    const handlePlaceOrder = () => {
        const newErrors = validateStep2()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }
        const id = 'SS' + Math.random().toString(36).substr(2, 9).toUpperCase()
        setOrderId(id)
        clearCart()
        setOrderPlaced(true)
    }

    // Order Success Screen
    if (orderPlaced) {
        return (
            <div className={styles.successPage}>
                <div className={styles.successCard}>
                    <div className={styles.successIcon}>✅</div>
                    <h1>Order Successfully Placed!</h1>
                    <p>Thank you for shopping with ShopSphere</p>
                    <div className={styles.orderIdBox}>
                        <p>Your Order ID</p>
                        <h2>{orderId}</h2>
                    </div>
                    <p className={styles.successNote}>
                        A confirmation will be sent to <strong>{formData.email}</strong>
                    </p>
                    <div className={styles.successActions}>
                        <button
                            className={styles.primaryBtn}
                            onClick={() => navigate('/')}
                        >
                            Back to Home
                        </button>
                        <button
                            className={styles.secondaryBtn}
                            onClick={() => navigate('/products')}
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Empty cart guard
    if (cartItems.length === 0) {
        return (
            <div className={styles.emptyPage}>
                <span>🛒</span>
                <h2>Your cart is empty</h2>
                <button onClick={() => navigate('/products')}>Shop Now</button>
            </div>
        )
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.pageTitle}>Checkout</h1>

                {/* Steps Indicator */}
                <div className={styles.steps}>
                    {['Shipping', 'Payment', 'Review'].map((s, i) => (
                        <div key={s} className={styles.stepItem}>
                            <div className={`${styles.stepCircle} ${step > i ? styles.stepDone : ''} ${step === i + 1 ? styles.stepActive : ''}`}>
                                {step > i + 1 ? '✓' : i + 1}
                            </div>
                            <span className={step === i + 1 ? styles.stepLabelActive : styles.stepLabel}>
                                {s}
                            </span>
                            {i < 2 && <div className={`${styles.stepLine} ${step > i + 1 ? styles.stepLineDone : ''}`} />}
                        </div>
                    ))}
                </div>

                <div className={styles.layout}>

                    {/* Left - Form */}
                    <div className={styles.formSection}>

                        {/* Step 1 - Shipping */}
                        {step === 1 && (
                            <div className={styles.formCard}>
                                <h2>Shipping Address</h2>
                                <div className={styles.formGrid}>
                                    <div className={styles.field}>
                                        <label>Full Name</label>
                                        <input
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className={errors.fullName ? styles.inputError : ''}
                                        />
                                        {errors.fullName && <p className={styles.error}>{errors.fullName}</p>}
                                    </div>
                                    <div className={styles.field}>
                                        <label>Email</label>
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className={errors.email ? styles.inputError : ''}
                                        />
                                        {errors.email && <p className={styles.error}>{errors.email}</p>}
                                    </div>
                                    <div className={`${styles.field} ${styles.fullWidth}`}>
                                        <label>Phone Number</label>
                                        <input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 98765 43210"
                                            className={errors.phone ? styles.inputError : ''}
                                        />
                                        {errors.phone && <p className={styles.error}>{errors.phone}</p>}
                                    </div>
                                    <div className={`${styles.field} ${styles.fullWidth}`}>
                                        <label>Street Address</label>
                                        <input
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="123 Main Street, Apartment 4B"
                                            className={errors.address ? styles.inputError : ''}
                                        />
                                        {errors.address && <p className={styles.error}>{errors.address}</p>}
                                    </div>
                                    <div className={styles.field}>
                                        <label>City</label>
                                        <input
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="Gurugram"
                                            className={errors.city ? styles.inputError : ''}
                                        />
                                        {errors.city && <p className={styles.error}>{errors.city}</p>}
                                    </div>
                                    <div className={styles.field}>
                                        <label>State</label>
                                        <input
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            placeholder="Haryana"
                                            className={errors.state ? styles.inputError : ''}
                                        />
                                        {errors.state && <p className={styles.error}>{errors.state}</p>}
                                    </div>
                                    <div className={styles.field}>
                                        <label>Pincode</label>
                                        <input
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleChange}
                                            placeholder="122001"
                                            className={errors.pincode ? styles.inputError : ''}
                                        />
                                        {errors.pincode && <p className={styles.error}>{errors.pincode}</p>}
                                    </div>
                                </div>
                                <button
                                    className={styles.nextBtn}
                                    onClick={() => {
                                        const newErrors = validateStep1()
                                        if (Object.keys(newErrors).length > 0) {
                                            setErrors(newErrors)
                                        } else {
                                            setStep(2)
                                        }
                                    }}
                                >
                                    Continue to Payment →
                                </button>
                            </div>
                        )}

                        {/* Step 2 - Payment */}
                        {step === 2 && (
                            <div className={styles.formCard}>
                                <h2>Payment Method</h2>

                                <div className={styles.paymentOptions}>
                                    {[
                                        { value: 'card', label: '💳 Credit / Debit Card' },
                                        { value: 'upi', label: '📱 UPI' },
                                        { value: 'cod', label: '💵 Cash on Delivery' },
                                    ].map(option => (
                                        <label key={option.value} className={`${styles.paymentOption} ${formData.paymentMethod === option.value ? styles.paymentSelected : ''}`}>
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value={option.value}
                                                checked={formData.paymentMethod === option.value}
                                                onChange={handleChange}
                                            />
                                            {option.label}
                                        </label>
                                    ))}
                                </div>

                                {formData.paymentMethod === 'card' && (
                                    <div className={styles.formGrid}>
                                        <div className={`${styles.field} ${styles.fullWidth}`}>
                                            <label>Card Number</label>
                                            <input
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleChange}
                                                placeholder="1234 5678 9012 3456"
                                                maxLength={19}
                                                className={errors.cardNumber ? styles.inputError : ''}
                                            />
                                            {errors.cardNumber && <p className={styles.error}>{errors.cardNumber}</p>}
                                        </div>
                                        <div className={styles.field}>
                                            <label>Expiry Date</label>
                                            <input
                                                name="cardExpiry"
                                                value={formData.cardExpiry}
                                                onChange={handleChange}
                                                placeholder="MM/YY"
                                                maxLength={5}
                                                className={errors.cardExpiry ? styles.inputError : ''}
                                            />
                                            {errors.cardExpiry && <p className={styles.error}>{errors.cardExpiry}</p>}
                                        </div>
                                        <div className={styles.field}>
                                            <label>CVV</label>
                                            <input
                                                name="cardCvv"
                                                value={formData.cardCvv}
                                                onChange={handleChange}
                                                placeholder="•••"
                                                maxLength={3}
                                                type="password"
                                                className={errors.cardCvv ? styles.inputError : ''}
                                            />
                                            {errors.cardCvv && <p className={styles.error}>{errors.cardCvv}</p>}
                                        </div>
                                    </div>
                                )}

                                {formData.paymentMethod === 'upi' && (
                                    <div className={styles.field} style={{ marginTop: '16px' }}>
                                        <label>UPI ID</label>
                                        <input
                                            name="upiId"
                                            placeholder="yourname@upi"
                                            onChange={handleChange}
                                        />
                                    </div>
                                )}

                                {formData.paymentMethod === 'cod' && (
                                    <div className={styles.codNote}>
                                        💵 You will pay <strong>₹{finalTotal.toFixed(0)}</strong> at the time of delivery.
                                    </div>
                                )}

                                <div className={styles.stepButtons}>
                                    <button className={styles.backBtn} onClick={() => setStep(1)}>
                                        ← Back
                                    </button>
                                    <button className={styles.nextBtn} onClick={() => {
                                        const newErrors = validateStep2()
                                        if (Object.keys(newErrors).length > 0) {
                                            setErrors(newErrors)
                                        } else {
                                            setStep(3)
                                        }
                                    }}>
                                        Review Order →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3 - Review */}
                        {step === 3 && (
                            <div className={styles.formCard}>
                                <h2>Review Your Order</h2>

                                <div className={styles.reviewSection}>
                                    <h4>📍 Shipping To</h4>
                                    <p>{formData.fullName}</p>
                                    <p>{formData.address}, {formData.city}</p>
                                    <p>{formData.state} - {formData.pincode}</p>
                                    <p>{formData.phone}</p>
                                </div>

                                <div className={styles.reviewSection}>
                                    <h4>💳 Payment</h4>
                                    <p>{formData.paymentMethod === 'card' ? 'Credit/Debit Card' : formData.paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery'}</p>
                                </div>

                                <div className={styles.reviewItems}>
                                    <h4>🛍️ Items ({cartItems.length})</h4>
                                    {cartItems.map(item => (
                                        <div key={item.id} className={styles.reviewItem}>
                                            <img src={item.image} alt={item.title} />
                                            <div>
                                                <p className={styles.reviewItemTitle}>{item.title}</p>
                                                <p className={styles.reviewItemMeta}>
                                                    Qty: {item.quantity} × ₹{(item.price * 83).toFixed(0)}
                                                </p>
                                            </div>
                                            <span className={styles.reviewItemTotal}>
                                                ₹{(item.price * 83 * item.quantity).toFixed(0)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.stepButtons}>
                                    <button className={styles.backBtn} onClick={() => setStep(2)}>
                                        ← Back
                                    </button>
                                    <button className={styles.placeOrderBtn} onClick={handlePlaceOrder}>
                                        ✅ Place Order
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right - Order Summary */}
                    <div className={styles.summary}>
                        <h2>Order Summary</h2>

                        <div className={styles.summaryItems}>
                            {cartItems.map(item => (
                                <div key={item.id} className={styles.summaryItem}>
                                    <img src={item.image} alt={item.title} />
                                    <div className={styles.summaryItemInfo}>
                                        <p>{item.title.slice(0, 30)}...</p>
                                        <p>Qty: {item.quantity}</p>
                                    </div>
                                    <span>₹{(item.price * 83 * item.quantity).toFixed(0)}</span>
                                </div>
                            ))}
                        </div>

                        {/* Promo Code */}
                        <div className={styles.promoRow}>
                            <input
                                type="text"
                                placeholder="Promo code (SHOP10)"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                disabled={promoApplied}
                            />
                            <button onClick={handlePromo} disabled={promoApplied}>
                                {promoApplied ? '✓' : 'Apply'}
                            </button>
                        </div>

                        <div className={styles.summaryRows}>
                            <div className={styles.summaryRow}>
                                <span>Subtotal</span>
                                <span>₹{(cartTotal * 83).toFixed(0)}</span>
                            </div>
                            {promoApplied && (
                                <div className={`${styles.summaryRow} ${styles.discount}`}>
                                    <span>Discount (10%)</span>
                                    <span>-₹{discount.toFixed(0)}</span>
                                </div>
                            )}
                            <div className={styles.summaryRow}>
                                <span>Tax (18% GST)</span>
                                <span>₹{tax.toFixed(0)}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Shipping</span>
                                <span className={styles.free}>FREE</span>
                            </div>
                            <div className={styles.divider} />
                            <div className={`${styles.summaryRow} ${styles.total}`}>
                                <span>Total</span>
                                <span>₹{finalTotal.toFixed(0)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout