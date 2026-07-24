import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        return JSON.parse(localStorage.getItem('cart')) || []
    })

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems])

    const addToCart = (product) => {
        setCartItems(prev => {
            const exists = prev.find(item => item.id === product.id)
            if (exists) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [...prev, { ...product, quantity: 1 }]
        })
    }

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id))
    }

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return
        setCartItems(prev =>
            prev.map(item => item.id === id ? { ...item, quantity } : item)
        )
    }

    const clearCart = () => setCartItems([])

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

    const cartTotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity, 0
    )

    return (
        <CartContext.Provider value={{
            cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal
        }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}