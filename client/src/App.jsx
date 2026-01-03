import { useState } from "react"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  }
  return (
    <div>
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <button onClick={logout}>Logout</button>
          <Profile />
        </>
      )}
    </div>
  )
}

export default App
