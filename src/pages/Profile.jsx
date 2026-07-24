import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import toast from 'react-hot-toast'
import styles from './Profile.module.css'

const dummyOrders = [
    {
        id: 'SS4F2K9X1A',
        date: '20 July 2026',
        status: 'Delivered',
        total: 4299,
        items: 2
    },
    {
        id: 'SS7B3M5R2C',
        date: '15 July 2026',
        status: 'In Transit',
        total: 8749,
        items: 3
    },
    {
        id: 'SS1D6N8T4E',
        date: '10 July 2026',
        status: 'Processing',
        total: 2199,
        items: 1
    },
]

function Profile() {
    const { user, logout } = useAuth()
    const { cartItems } = useCart()
    const { wishlistItems } = useWishlist()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('overview')

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        pincode: ''
    })

    if (!user) {
        return (
            <div className={styles.notLoggedIn}>
                <span>👤</span>
                <h2>Please login to view your profile</h2>
                <button onClick={() => navigate('/login')}>Login</button>
            </div>
        )
    }

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSave = (e) => {
        e.preventDefault()
        toast.success('Profile updated successfully!')
    }

    const handleLogout = () => {
        logout()
        toast.success('Logged out successfully!')
        navigate('/')
    }

    const getStatusColor = (status) => {
        if (status === 'Delivered') return styles.statusDelivered
        if (status === 'In Transit') return styles.statusTransit
        return styles.statusProcessing
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>

                {/* Profile Header */}
                <div className={styles.profileHeader}>
                    <div className={styles.avatar}>
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.profileInfo}>
                        <h1>{user.name}</h1>
                        <p>{user.email}</p>
                        <span className={styles.memberBadge}>⭐ ShopSphere Member</span>
                    </div>
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                        Logout
                    </button>
                </div>

                {/* Stats Row */}
                <div className={styles.statsRow}>
                    <div className={styles.statCard}>
                        <span>{dummyOrders.length}</span>
                        <p>Total Orders</p>
                    </div>
                    <div className={styles.statCard}>
                        <span>{cartItems.length}</span>
                        <p>Items in Cart</p>
                    </div>
                    <div className={styles.statCard}>
                        <span>{wishlistItems.length}</span>
                        <p>Wishlist Items</p>
                    </div>
                    <div className={styles.statCard}>
                        <span>⭐</span>
                        <p>Premium Member</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className={styles.tabs}>
                    {[
                        { key: 'overview', label: '📋 Overview' },
                        { key: 'orders', label: '📦 Orders' },
                        { key: 'settings', label: '⚙️ Settings' },
                    ].map(tab => (
                        <button
                            key={tab.key}
                            className={`${styles.tab} ${activeTab === tab.key ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab(tab.key)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className={styles.tabContent}>
                        <div className={styles.overviewGrid}>

                            <div className={styles.card}>
                                <h3>📦 Recent Orders</h3>
                                {dummyOrders.slice(0, 2).map(order => (
                                    <div key={order.id} className={styles.orderRow}>
                                        <div>
                                            <p className={styles.orderId}>{order.id}</p>
                                            <p className={styles.orderDate}>{order.date}</p>
                                        </div>
                                        <div className={styles.orderRight}>
                                            <span className={`${styles.status} ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                            <p className={styles.orderTotal}>₹{order.total}</p>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    className={styles.viewAllBtn}
                                    onClick={() => setActiveTab('orders')}
                                >
                                    View All Orders →
                                </button>
                            </div>

                            <div className={styles.card}>
                                <h3>📍 Saved Address</h3>
                                {formData.address ? (
                                    <div className={styles.addressBox}>
                                        <p>{formData.name}</p>
                                        <p>{formData.address}</p>
                                        <p>{formData.city} - {formData.pincode}</p>
                                        <p>{formData.phone}</p>
                                    </div>
                                ) : (
                                    <div className={styles.emptyAddress}>
                                        <p>No address saved yet.</p>
                                        <button onClick={() => setActiveTab('settings')}>
                                            Add Address →
                                        </button>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                    <div className={styles.tabContent}>
                        <div className={styles.card}>
                            <h3>📦 All Orders</h3>
                            {dummyOrders.map(order => (
                                <div key={order.id} className={styles.orderCard}>
                                    <div className={styles.orderCardLeft}>
                                        <p className={styles.orderId}>{order.id}</p>
                                        <p className={styles.orderDate}>{order.date}</p>
                                        <p className={styles.orderItems}>{order.items} item(s)</p>
                                    </div>
                                    <div className={styles.orderCardRight}>
                                        <span className={`${styles.status} ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                        <p className={styles.orderTotal}>₹{order.total}</p>
                                        <button className={styles.trackBtn}>Track Order</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                    <div className={styles.tabContent}>
                        <div className={styles.card}>
                            <h3>⚙️ Edit Profile</h3>
                            <form onSubmit={handleSave} className={styles.settingsForm}>
                                <div className={styles.formGrid}>
                                    <div className={styles.field}>
                                        <label>Full Name</label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Email</label>
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Phone</label>
                                        <input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                    <div className={styles.field}>
                                        <label>City</label>
                                        <input
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="Gurugram"
                                        />
                                    </div>
                                    <div className={`${styles.field} ${styles.fullWidth}`}>
                                        <label>Street Address</label>
                                        <input
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="123 Main Street"
                                        />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Pincode</label>
                                        <input
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleChange}
                                            placeholder="122001"
                                        />
                                    </div>
                                </div>
                                <button type="submit" className={styles.saveBtn}>
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Profile