import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/formatCurrency";

function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
        setCart(savedCart);
    }, [])

    const updateCart = (updatedCart) => {
        setCart(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }

    const increaseQty = (id) => {
        const updated = cart.map(item =>
            item.productId === id ? { ...item, qty: item.qty + 1 } : item
        );
        updateCart(updated);
    }

    const decreaseQty = (id) => {
        const updated = cart.map(item =>
            item.productId === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
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
                        <div key={item.productId} style={{ borderBottom: "1px solid #ddd", padding: "8px 0" }}>
                            <p>{item.name}</p>
                            <p>{formatPrice(item.price * item.qty)}</p>
                            <button onClick={() => decreaseQty(item.productId)}>-</button>
                            <span style={{ margin: "0 8px" }}>{item.qty}</span>
                            <button onClick={() => increaseQty(item.productId)}>+</button>
                            <button style={{ marginLeft: 12 }} onClick={() => removeItem(item.productId)}>Remove</button>
                        </div>
                    ))}
                    <h3>Total: {formatPrice(total)}</h3>
                    <Link to={"/checkout"}>Proceed to Checkout</Link>
                </>
            )}
        </div>
    )
}
export default Cart;
