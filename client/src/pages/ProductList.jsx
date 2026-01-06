import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/products');
                setProducts(data);
            } catch (err) {
                setError('Failed to load products');
            }
        };
        fetchProducts();
    }, [])

    if (error) return <p>error</p>;

    return (
        <div>
            <h2>Products</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {products.map(product => (
                    <Link key={product._id} to={`/product/${product._id}`} style={{ textDecoration: "none", color: "black" }}>
                        <div style={{ border: '1px solid #ccc', padding: '10px' }}>
                            <img src={product.image} alt={product.name} width="150" />
                            <h3>{product.name}</h3>
                            <p>₹{product.price}</p>
                            <p>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default ProductList;