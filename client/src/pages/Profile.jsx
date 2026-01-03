import { useState, useEffect } from "react";
import axios from "axios";

function Profile(){
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(()=>{
        const fetchProfile = async () => {
            try{
                const token = localStorage.getItem('token');
                const{data} = await axios.get(
                    'http://localhost:5000/api/profile',
                    {
                        headers:{
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                setUser(data);
            }catch(err){
                setError('Not authorized');
            }
        };
        fetchProfile();
    },[])
    if(error) return <p>error</p>;
    if(!user) return <p>Loading profile...</p>

    return(
        <div>
            <p>Name : {user.name}</p>
            <p>Email : {user.email}</p>
        </div>
    );
}

export default Profile;