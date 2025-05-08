import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ProductDetails from "./pages/product-details/ProductDetails";
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
import PickupLocationsPage from "./pages/footer/pickup-locations/PickupLocationsPage";
import ApplyForALoanPage from "./pages/footer/apply-for-a-loan/ApplyForALoanPage";
import HowToShopOnSalekoPage from "./pages/footer/how-to-shop-on-saleko/HowToShopOnSalekoPage";
import AdvertiseWithUsPage from "./pages/footer/advertise-with-us/AdvertiseWithUsPage";
import MarketPage from "./pages/market/MarketPage";
import CreateBuyerProfilePage from "./pages/footer/create-buyer-profile/CreateBuyerProfilePage";
import TrackMyOrderPage from "./pages/footer/track-my-order/TrackMyOrderPage";
import SellerGuidePage from "./pages/footer/seller-guide/SellerGuidePage";
import MarketPageFooter from "./pages/footer/market-footer/MarketPageFooter";
import FaqsPage from "./pages/footer/faqs/FaqsPage";
import CategoryPage from "./pages/category/CategoryPage";
import ProfileLayoutPage from "./pages/profile/profile-layout/ProfileLayoutPage";
import { SkeletonTheme } from "react-loading-skeleton";
import { TooltipProvider } from "./context/TooltipContext";
import MyWishlistPage from "./pages/profile/my-wishlists/MyWishlistPage";
import DeliveryAddressPage from "./pages/profile/delivery-address/DeliveryAddressPage";
import PersonalDetailsPage from "./pages/profile/personal-details/PersonalDetailsPage";

function App() {
  return (
    <TooltipProvider>
      <SkeletonTheme baseColor="#c7c9c8" highlightColor="#b3b5b4">
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

            <Route path="/product/:sku" element={<ProductDetails />} />

            <Route path="/cart" element={<CartPage />} />

            <Route path="/checkout" element={<CheckoutPage />} />

            <Route path="/negotiate/:sku" element={<NegotiationPage />} />

            <Route path="/search" element={<SearchPage />} />

            <Route path="/store-list" element={<StoreListPage />} />

            <Route
              path="/store-details/:storeId"
              element={<StoreDetailsPage />}
            />

            <Route path="/market" element={<MarketPage />} />

            <Route path="/category" element={<CategoryPage />} />

            {/* Profile */}
            <Route path="/profile" element={<ProfileLayoutPage />}>
              <Route
                path="personal-details"
                element={<PersonalDetailsPage />}
                
              />

              <Route
                path="delivery-address"
                element={<DeliveryAddressPage />}
              />

              <Route path="my-wishlist" element={<MyWishlistPage />} />
            </Route>

            {/* Footer */}
            <Route path="/about-us" element={<AboutUsPage />} />

            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditionsPage />}
            />

            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

            <Route path="/contact-us" element={<ContactUsPage />} />

            <Route path="/escrow-service" element={<EscrowServicePage />} />

            <Route path="/disputes" element={<DisputesPage />} />

            <Route path="/become-a-seller" element={<BecomeASellerPage />} />

            <Route
              path="/how-to-shop-on-saleko"
              element={<HowToShopOnSalekoPage />}
            />

            <Route path="/apply-for-a-loan" element={<ApplyForALoanPage />} />

            <Route
              path="/pick-up-locations"
              element={<PickupLocationsPage />}
            />

            <Route
              path="/advertise-with-us-page"
              element={<AdvertiseWithUsPage />}
            />

            <Route
              path="/create-buyer-profile"
              element={<CreateBuyerProfilePage />}
            />

            <Route path="/track-my-order" element={<TrackMyOrderPage />} />

            <Route path="/seller-guide" element={<SellerGuidePage />} />

            <Route path="/saleko-markets" element={<MarketPageFooter />} />

            <Route path="/faqs" element={<FaqsPage />} />
          </Routes>
        </BrowserRouter>
      </SkeletonTheme>
    </TooltipProvider>
  );
}

export default App;
