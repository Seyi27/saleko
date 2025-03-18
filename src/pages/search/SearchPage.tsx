import React, { useEffect } from "react";
import "./SearchPage.css";
import NavHeader from "../../components/nav-header/NavHeader";
import NavHeaderSearch from "../../components/nav-header-search/NavHeaderSearch";
import SearchFilterNav from "../../components/search-filter-nav/SearchFilterNav";
import Footer from "../../components/footer/Footer";
import StoreSection from "../../components/top-store-section/TopStoreSection";
import { productData, storeData } from "../../helpers/Data";
import ProductSection from "../../components/product-section/ProductSection";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const searchParams = new URLSearchParams(useLocation().search);
  const query = searchParams.get("q");

  return (
    <div>
      <NavHeader />

      <NavHeaderSearch />

      <SearchFilterNav />

      <div className="body_container">
        <div className="body_second_container search_content_wrapper">
          <ProductSection data={productData} type="search" />

          <StoreSection name={"Top Stores selling Laptop"} data={storeData} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchPage;
