import { useState, useEffect } from "react";

function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    },[])

    const updateCart = (updatedCart) => {
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    const increaseQty = (id) => {
        const updated = cart.map(item => 
            item.productId == id ? { ...item, qty: item.qty+1} : item
        );
        updateCart(updated);
    }
    
    const decreaseQty = (id) => {
        const updated = cart.map(item => 
            item.productId == id && item.qty > 1 ? { ...item, qty: item.qty-1} : item
        );
        updateCart(updated);
    }
    
    const removeItem = (id) => {
        const updated = cart.filter(item => item.productId !== id);
        updateCart(updated);
    }

    const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

    return (
        <div>
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                <>
                    {cart.map(item => (
                        <div key={item.productId}>
                            <p>{item.name} x {item.qty}</p>
                            <p>₹{item.price * item.qty}</p>
                            <button onClick={() => decreaseQty(item.productId)}>-</button>
                            <button onClick={() => increaseQty(item.productId)}>+</button>
                            <button onClick={() => removeItem(item.productId)}>Remove</button>
                        </div>
                    ))}
                    <h3>Total: ₹{total}</h3>
                </>
            )}
        </div>
    )
}
export default Cart;
