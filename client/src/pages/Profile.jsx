import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_BASE_URL from "../api";
import axios from "axios";

function Profile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        navigate("/login", { replace:true });
    }
    useEffect(() => {
        console.log("API_BASE_URL:", API_BASE_URL);
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const { data } = await axios.get(
                    `${API_BASE_URL}/api/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                setUser(data);
            } catch (err) {
                setError('Not authorized');
            }
        };
        fetchProfile();
    }, [])
    if (error) return <p>{error}</p>;
    if (!user) return <p>Loading profile...</p>

    return (
        <>
            <button onClick={logout}> Logout</button>
            <div>
                <p>Name : {user.name}</p>
                <p>Email : {user.email}</p>
            </div>
            <Link to={"/myorders"}>My Orders</Link>
        </>
    );
}

export default Profile;