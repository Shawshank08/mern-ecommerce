import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const token = localStorage.getItem("token");

    if(!token || token==="undefined"){
        return <Navigate to="/login" replace/>;
    }
    return children;
}
export default PrivateRoute;