import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
    const { id } = useParams();
    const[ product, setProduct ] = useState(null);
    const[ error, setError ] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try{
                const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(data);
            }catch(err){
                setError("Product not found");
            }
        };
        fetchProduct();
    }, [id]);

    if(error) return<p>{error}</p>;
    if(!product) return <p>Loading...</p>;

    return(
        <div>
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} width="250"/>;
            <p>Brand: {product.brand}</p>
            <p>Category: {product.category}</p>
            <p>{product.description}</p>
            <p>Price: ₹{product.price}</p>
            <p>{product.countInStock > 0 ? "In Stock":"Out of Stock"}</p>
            <button onClick={() => {
                const cart = JSON.parse(localStorage.getItem("cart")) || [];
                const item = {
                    productId:product._id,
                    name:product.name,
                    image:product.image,
                    price:product.price,
                    qty:1
                };
                const existItem = cart.find(x => x.productId === product._id);
                if(existItem){
                    existItem.qty += 1;
                }else{
                    cart.push(item);
                }
                localStorage.setItem("cart", JSON.stringify(cart));
                alert("Added to cart");
            }}>Add to Cart</button>
            <a href="/cart">Go to Cart</a>
        </div>
    )
}
export default ProductDetails;