import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import styles from './Login.module.css'
import { useNavigate, Link, useLocation } from 'react-router-dom'

function Login() {
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setErrors(prev => ({ ...prev, [e.target.name]: '' }))
    }

    const validate = () => {
        const newErrors = {}
        if (!isLogin && !formData.name.trim()) {
            newErrors.name = 'Name is required'
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Enter a valid email'
        }
        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }
        if (!isLogin && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }
        return newErrors
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newErrors = validate()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }
        setLoading(true)
        setTimeout(() => {
            login(formData.email, formData.password, formData.name)
            toast.success(isLogin ? 'Welcome back!' : 'Account created!')
            setLoading(false)
            navigate(from)
        }, 1000)
    }

    return (
        <div className={styles.page}>
            <div className={styles.card}>

                {/* Logo */}
                <div className={styles.logo}>
                    <span>🛍️</span>
                    <h1>ShopSphere</h1>
                </div>

                {/* Tabs */}
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${isLogin ? styles.activeTab : ''}`}
                        onClick={() => {
                            setIsLogin(true)
                            setErrors({})
                        }}
                    >
                        Login
                    </button>
                    <button
                        className={`${styles.tab} ${!isLogin ? styles.activeTab : ''}`}
                        onClick={() => {
                            setIsLogin(false)
                            setErrors({})
                        }}
                    >
                        Sign Up
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>

                    {/* Name - Sign Up only */}
                    {!isLogin && (
                        <div className={styles.field}>
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                className={errors.name ? styles.inputError : ''}
                            />
                            {errors.name && <p className={styles.error}>{errors.name}</p>}
                        </div>
                    )}

                    {/* Email */}
                    <div className={styles.field}>
                        <label>Email Address</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? styles.inputError : ''}
                        />
                        {errors.email && <p className={styles.error}>{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div className={styles.field}>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? styles.inputError : ''}
                        />
                        {errors.password && <p className={styles.error}>{errors.password}</p>}
                    </div>

                    {/* Confirm Password - Sign Up only */}
                    {!isLogin && (
                        <div className={styles.field}>
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={errors.confirmPassword ? styles.inputError : ''}
                            />
                            {errors.confirmPassword && (
                                <p className={styles.error}>{errors.confirmPassword}</p>
                            )}
                        </div>
                    )}

                    {/* Forgot Password */}
                    {isLogin && (
                        <div className={styles.forgotRow}>
                            <span
                                className={styles.forgotLink}
                                onClick={() => toast('Password reset coming soon!')}
                            >
                                Forgot password?
                            </span>
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={loading}
                    >
                        {loading
                            ? '⏳ Please wait...'
                            : isLogin ? 'Login' : 'Create Account'
                        }
                    </button>

                    {/* Demo credentials */}
                    {isLogin && (
                        <div className={styles.demoBox}>
                            <p>🔑 Demo credentials</p>
                            <p>Email: demo@shopsphere.com</p>
                            <p>Password: demo123</p>
                            <button
                                type="button"
                                className={styles.demoBtn}
                                onClick={() => {
                                    setFormData(prev => ({
                                        ...prev,
                                        email: 'demo@shopsphere.com',
                                        password: 'demo123'
                                    }))
                                }}
                            >
                                Fill Demo Credentials
                            </button>
                        </div>
                    )}

                </form>
            </div>
        </div>
    )
}

export default Login