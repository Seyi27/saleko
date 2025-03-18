import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ProductDetails from "./components/product-details/ProductDetails";
import CartPage from "./pages/cart/CartPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import ScrollToTop from "./helpers/ScrollToTop";
import NegotiationPage from "./pages/negotiation/NegotiationPage";
import { Bounce, Slide, ToastContainer } from "react-toastify";
import SearchPage from "./pages/search/SearchPage";
import StoreListPage from "./pages/store-list/StoreListPage";
import StoreDetailsPage from "./pages/store-details/StoreDetailsPage";
import PrivacyPolicyPage from "./pages/privacy-policy/PrivacyPolicyPage";
import TermsAndConditionsPage from "./pages/terms-and-conditions/TermsAndConditionsPage";
import AboutUsPage from "./pages/about-us/AboutUsPage";
import ContactUsPage from "./pages/contact-us/ContactUsPage";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/product/:productId" element={<ProductDetails />} />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/checkout" element={<CheckoutPage />} />

        <Route path="/negotiate/:itemId" element={<NegotiationPage />} />

        <Route path="/search" element={<SearchPage />} />

        <Route path="/store-list" element={<StoreListPage />} />

        <Route path="/store-details/:storeId" element={<StoreDetailsPage />} />

        <Route path="/about-us" element={<AboutUsPage />} />

        <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />

        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

        <Route path="/contact-us" element={<ContactUsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
