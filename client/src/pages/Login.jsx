import { useState } from "react";
import axios from 'axios';

function Login({setToken}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            const{data} = await axios.post(
                'http://localhost:5000/api/auth/login',
                {email, password}
            );
            localStorage.setItem('token', data.token);
            setToken(data.token)
        }catch(err){
            setError(err.response?.data?.message || 'Login failed');
        }
    };
    return (
        <form onSubmit={submitHandler}>
            <h2>Login</h2>
            {error && <p style={{color:'red'}}>{error}</p>}
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
            <button type="submit">Login</button>
        </form>
    )
}
export default Login;