import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Register from "./pages/Rrgister";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile"
import PrivateRoute from "./components/PrivateRoute";
import PublicRoutes from "./components/PublicRoutes";
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout";
import OrderDetails from "./pages/OrderDetails";
import MyOrders from "./pages/MyOrders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          } />
        <Route
          path="/register"
          element={
            <PublicRoutes>
              <Register />
            </PublicRoutes>
          } />
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
        <Route
          path="/order/:id"
          element={
            <PrivateRoute>
              <OrderDetails />
            </PrivateRoute>
          } />
        <Route
          path="/myorders"
          element={
            <PrivateRoute>
              <MyOrders />
            </PrivateRoute>
          } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
