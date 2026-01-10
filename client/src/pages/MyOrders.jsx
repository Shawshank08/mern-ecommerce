import { useEffect, useState } from "react";
import axios from "axios";

function MyOrders(){
    const[orders, setOrders] = useState([]);
    useEffect(()=>{
        const fetchOrders = async () => {
            const token = localStorage.getItem("token");
            const{ data } = await axios.get("http://localhost:5000/api/orders/myorders", {
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
                        <p>Total: {order.totalPrice}</p>
                        <a href={`order/${order._id}`}>View</a>
                    </div>
                ))
            )}
        </div>
    )
}
export default MyOrders;