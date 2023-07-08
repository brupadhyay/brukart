import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import { ToastContainer } from "react-toastify";

import "./App.css";
import { Footer, SingleProductPage } from "./components";
import { PrivateRoutes } from "./constants/PrivateRoutes";
import { Login, Signup } from "./pages";
import { Cart } from "./screens/Cart/Cart";
import { Landing } from "./screens/Landing";
import MockAPI from "./screens/Mockman";
import { Navbar } from "./screens/Navbar/Navbar";
import { ProductListing } from "./screens/ProductListing/ProductListing";
import { Profile } from "./screens/Profile/Profile";
import { Wishlist } from "./screens/Wishlist/Wishlist";
import { Checkout } from "./screens/Checkout/Checkout";
import { Error404 } from "./screens/Error404";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="App">
      <Navbar />
      <ToastContainer
        style={{
          fontSize: "1rem",
          fontWeight: "500",
        }}
      />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/mockman" element={<MockAPI />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product/:productId" element={<SingleProductPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Error404 />} />
        <Route
          path="/profile"
          element={
            <PrivateRoutes>
              <Profile />
            </PrivateRoutes>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoutes>
              <Cart />
            </PrivateRoutes>
          }
        />
        <Route
          path="/wishlist"
          element={
            <PrivateRoutes>
              <Wishlist />
            </PrivateRoutes>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoutes>
              <Checkout />
            </PrivateRoutes>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
