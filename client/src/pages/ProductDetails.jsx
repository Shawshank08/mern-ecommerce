import { useEffect, useState } from "react";
import { formatPrice } from "../utils/formatCurrency";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../api";

function ProductDetails() {
    const { id } = useParams();
    const[ product, setProduct ] = useState(null);
    const[ error, setError ] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try{
                const { data } = await axios.get(`${API_BASE_URL}/api/products/${id}`);
                setProduct(data);
            }catch(err){
                setError("Product not found");
            }
        };
        if(id) fetchProduct();
    }, [id]);

    if(error) return<p>{error}</p>;
    if(!product) return <p>Loading...</p>;

    return(
        <div>
            <Link to={"/"}>Back to Products</Link>
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} width="250"/>;
            <p>Brand: {product.brand}</p>
            <p>Category: {product.category}</p>
            <p>{product.description}</p>
            <p>Price: {formatPrice(product.price)}</p>
            <p>{product.countInStock > 0 ? "In Stock":"Out of Stock"}</p>
            <button onClick={() => {
                const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
                const item = {
                    productId:product._id,
                    name:product.name,
                    image:product.image,
                    price:product.price,
                    qty:1
                };
                const exist = cart.find((x) => x.productId === product._id);
                if(exist){
                    cart.forEach((x)=>{
                        if(x.productId === product._id) x.qty += 1;
                    });
                }else{
                    cart.push(item);
                }
                localStorage.setItem("cartItems", JSON.stringify(cart));
                alert("Added to cart");
            }}>Add to Cart</button>
            <a href="/cart">Go to Cart</a>
        </div>
    )
}
export default ProductDetails;