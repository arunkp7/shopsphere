import { createContext, useContext, useState, useEffect } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
    const [wishlistItems, setWishlistItems] = useState(() => {
        return JSON.parse(localStorage.getItem('wishlist')) || []
    })

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems))
    }, [wishlistItems])

    const addToWishlist = (product) => {
        setWishlistItems(prev => {
            const exists = prev.find(item => item.id === product.id)
            if (exists) return prev
            return [...prev, product]
        })
    }

    const removeFromWishlist = (id) => {
        setWishlistItems(prev => prev.filter(item => item.id !== id))
    }

    const isInWishlist = (id) => wishlistItems.some(item => item.id === id)

    return (
        <WishlistContext.Provider value={{
            wishlistItems, addToWishlist, removeFromWishlist, isInWishlist
        }}>
            {children}
        </WishlistContext.Provider>
    )
}

export function useWishlist() {
    return useContext(WishlistContext)
}