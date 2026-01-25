import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../api";

function Checkout() {
    const navigate = useNavigate();
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const placeOrder = async () => {
        const token = localStorage.getItem("token");
        const itemsPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

        const orderData = {
            orderItems: cart.map(item => ({
                name: item.name,
                qty: item.qty,
                image: item.image,
                price: item.price,
                product: item.productId,
            })),
            shippingAddress: { address, city, postalCode, country },
            paymentMethod: "COD",
            itemsPrice,
            taxPrice: 0,
            totalPrice: itemsPrice,
        };
        const { data } = await axios.post(
        `${API_BASE_URL}/api/orders`,
            orderData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        localStorage.removeItem("cartItems");
        navigate(`/order/${data._id}`, {replace:true});
    };

    return (
        <div>
            <h2>Checkout</h2>
            <input placeholder="Address" onChange={e => setAddress(e.target.value)} />
            <input placeholder="City" onChange={e => setCity(e.target.value)} />
            <input placeholder="Postal Code" onChange={e => setPostalCode(e.target.value)} />
            <input placeholder="Country" onChange={e => setCountry(e.target.value)} />

            <button onClick={placeOrder}>Place Order</button>
        </div>
    )
}
export default Checkout;
