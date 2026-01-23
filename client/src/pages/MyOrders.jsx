import { useEffect, useState } from "react";
import { formatPrice } from "../../../server/src/utils/formatCurrency";
import axios from "axios";

function MyOrders(){
    const[orders, setOrders] = useState([]);
    useEffect(()=>{
        const fetchOrders = async () => {
            const token = localStorage.getItem("token");
            const{ data } = await axios.get(`${API_BASE_URL}/api/orders/myorders`, {
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });
            setOrders(data);
        }
        fetchOrders();
    },[]);
    return(
        <div>
            <h2>My Orders</h2>
            {orders.length ==0 ? (
                <p>No orders found</p>
            ):(
                orders.map(order => (
                    <div key={orders._id}>
                        <p>Order ID: {order._id}</p>
                        <p>Total: {formatPrice(order.totalPrice)}</p>
                        <a href={`order/${order._id}`}>View</a>
                    </div>
                ))
            )}
        </div>
    )
}
export default MyOrders;