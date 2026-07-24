import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>

                <div className={styles.section}>
                    <h3 className={styles.logo}>🛍️ ShopSphere</h3>
                    <p>Your one-stop shop for everything you need. Quality products at great prices.</p>
                </div>

                <div className={styles.section}>
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                        <li><Link to="/wishlist">Wishlist</Link></li>
                    </ul>
                </div>

                <div className={styles.section}>
                    <h4>Categories</h4>
                    <ul>
                        <li><Link to="/products?category=electronics">Electronics</Link></li>
                        <li><Link to="/products?category=jewelery">Jewelry</Link></li>
                        <li><Link to="/products?category=men's clothing">Men's Clothing</Link></li>
                        <li><Link to="/products?category=women's clothing">Women's Clothing</Link></li>
                    </ul>
                </div>

                <div className={styles.section}>
                    <h4>Contact</h4>
                    <ul>
                        <li>📧 support@shopsphere.com</li>
                        <li>📞 +91 9xxx5 4xxx0</li>
                        <li>📍 New Delhi, India</li>
                    </ul>
                </div>

            </div>

            <div className={styles.bottom}>
                <p>© 2026 ShopSphere. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer