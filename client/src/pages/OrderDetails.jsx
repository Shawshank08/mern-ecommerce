import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function OrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            const token = localStorage.getItem("token");
            const { data } = await axios.get(
                `http://localhost:5000/api/orders/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setOrder(data);
        };
        fetchOrder();
    }, [id]);
    if (!order) return <p>Loading...</p>;
    return (
        <div>
            <h2>Order:{order.id}</h2>
            <h2>Customer:{order.user.name}</h2>
            <h2>Email:{order.user.email}</h2>

            <h3>Shipping</h3>
            <p>{order.shippingAddress.address}, {order.shippingAddress.city}</p>
            <h3>Items</h3>
            {order.orderItems.map(item => (
                <div key={item._id}>
                    {item.name} X {item.qty} = {item.price * item.qty};
                </div>
            ))}
            <h3>Total: ₹{order.totalPrice}</h3>
        </div>
    )
}
export default OrderDetails;