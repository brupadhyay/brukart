import { Routes, Route } from "react-router";
import "./App.css";

import { Landing } from "./screens/Landing";
import MockAPI from "./screens/Mockman";
import { Navbar } from "./screens/Navbar/Navbar";
import { ProductListing } from "./screens/ProductListing/ProductListing";
import { Footer, SingleProductPage } from "./components";
import { Login, Signup } from "./pages";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/mockman" element={<MockAPI />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product/:productId" element={<SingleProductPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
