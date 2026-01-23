import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatPrice } from "../../../server/src/utils/formatCurrency";
import axios from "axios";

function OrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrder = async () => {
            try{
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
            }catch(err){
                setError("Could not load order")
            }
        };
        if(id) fetchOrder();
    }, [id]);
    if(error) return <p>{error}</p>
    if (!order) return <p>Loading...</p>;
    return (
        <div>
            <Link to={'/myorders'}>Back to My Orders</Link>
            <h2>Order:{order._id}</h2>
            <h2>Customer:{order.user?.name}</h2>
            <h2>Email:{order.user?.email}</h2>

            <h3>Shipping</h3>
            <p>{order.shippingAddress.address}, {order.shippingAddress.city}</p>
            <h3>Items</h3>
            {order.orderItems.map(item => (
                <div key={item._id}>
                    {item.name} X {item.qty} = {formatPrice(item.price * item.qty)};
                </div>
            ))}
            <h3>Total: {formatPrice(order.totalPrice)}</h3>
        </div>
    )
}
export default OrderDetails;