import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

function Register({setToken}){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            const{data} = await axios.post(
                'http://localhost:5000/api/auth/register',
                {name, email, password}
            );
            navigate("/login");
        }catch(err){
            setError(err.response?.data?.message || 'Registration failed');
        }
    };
    return (
        <form onSubmit={submitHandler}>
            <h2>Register</h2>
            {error && <p style={{color:'red'}}>{error}</p>}
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) =>setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
            <p>Already have an account?<Link to="/login">Login</Link></p>
        </form>
    )
}
export default Register;