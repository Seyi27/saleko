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
import ContactUsPage from "./pages/footer/contact-us/ContactUsPage";
import EscrowServicePage from "./pages/footer/escrow-service/EscrowServicePage";
import DisputesPage from "./pages/footer/disputes/DisputesPage";
import AboutUsPage from "./pages/footer/about-us/AboutUsPage";
import TermsAndConditionsPage from "./pages/footer/terms-and-conditions/TermsAndConditionsPage";
import PrivacyPolicyPage from "./pages/footer/privacy-policy/PrivacyPolicyPage";
import BecomeASellerPage from "./pages/footer/become-a-seller/BecomeASellerPage";
import HowToShopOnSaleko from "./pages/footer/how-to-sell-on-saleko/HowToShopOnSaleko";

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

        <Route path="/escrow-service" element={<EscrowServicePage />} />

        <Route path="/disputes" element={<DisputesPage />} />

        <Route path="/become-a-seller" element={<BecomeASellerPage />} />

        <Route path="/how-to-shop-on-saleko" element={<HowToShopOnSaleko />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
