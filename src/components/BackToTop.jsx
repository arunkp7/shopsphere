import { useState, useEffect } from 'react'
import styles from './BackToTop.module.css'

function BackToTop() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 400)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (!visible) return null

    return (
        <button className={styles.btn} onClick={scrollToTop}>
            ↑
        </button>
    )
}

export default BackToTop