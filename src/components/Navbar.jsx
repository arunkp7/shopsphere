import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import styles from './Navbar.module.css'

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const { cartCount } = useCart()
    const { wishlistItems } = useWishlist()
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/products?search=${searchQuery}`)
            setSearchQuery('')
            setMenuOpen(false)
        }
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>

                {/* Logo */}
                <Link to="/" className={styles.logo}>
                    🛍️ ShopSphere
                </Link>

                {/* Desktop Nav Links */}
                <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
                    <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link></li>
                    <li><Link to="/products?category=electronics" onClick={() => setMenuOpen(false)}>Categories</Link></li>
                    <li>
                        <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
                            Wishlist
                            {wishlistItems.length > 0 && (
                                <span className={styles.badge}>{wishlistItems.length}</span>
                            )}
                        </Link>
                    </li>
                </ul>

                {/* Search Bar */}
                <form className={styles.searchForm} onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchBtn}>🔍</button>
                </form>

                {/* Right Icons */}
                <div className={styles.navIcons}>
                    <Link to="/cart" className={styles.iconBtn}>
                        🛒
                        {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
                    </Link>

                    {user ? (
                        <div className={styles.userMenu}>
                            <Link to="/profile" className={styles.iconBtn}>👤 {user.name}</Link>
                            <button onClick={logout} className={styles.logoutBtn}>Logout</button>
                        </div>
                    ) : (
                        <Link to="/login" className={styles.iconBtn}>Login</Link>
                    )}
                </div>

                {/* Hamburger */}
                <button
                    className={styles.hamburger}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? '✕' : '☰'}
                </button>

            </div>
        </nav>
    )
}

export default Navbar