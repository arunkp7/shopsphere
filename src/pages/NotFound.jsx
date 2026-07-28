import { useNavigate } from 'react-router-dom'
import styles from './NotFound.module.css'

function NotFound() {
    const navigate = useNavigate()

    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <h1 className={styles.code}>404</h1>
                <div className={styles.illustration}>🛍️</div>
                <h2>Oops! Page Not Found</h2>
                <p>The page you're looking for doesn't exist or has been moved.</p>
                <div className={styles.actions}>
                    <button
                        className={styles.primaryBtn}
                        onClick={() => navigate('/')}
                    >
                        Go to Home
                    </button>
                    <button
                        className={styles.secondaryBtn}
                        onClick={() => navigate('/products')}
                    >
                        Browse Products
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotFound