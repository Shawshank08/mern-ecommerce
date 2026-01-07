import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import ProductList from "./pages/ProductList";
import PrivateRoute from "./components/PrivateRoute";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <ProductList />
            </PrivateRoute>
          } />
        <Route
          path="/product/:id"
          element={
            <PrivateRoute>
              <ProductDetails />
            </PrivateRoute>
          } />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          } />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
