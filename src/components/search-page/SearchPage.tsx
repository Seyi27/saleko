import React, { useEffect } from "react";
import "./SearchPage.css";
import NavHeader from "../nav-header/NavHeader";
import NavHeaderSearch from "../nav-header-search/NavHeaderSearch";
import SearchFilterNav from "../search-filter-nav/SearchFilterNav";
import Footer from "../footer/Footer";
import StoreSection from "../store-section/StoreSection";
import { productData, storeData } from "../../helpers/Data";
import ProductSection from "../product-section/ProductSection";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const searchParams = new URLSearchParams(useLocation().search);
  const query = searchParams.get("q");

  console.log("query", query);

  //   useEffect(() => {
  //   }, [])

  return (
    <div>
      <NavHeader />

      <NavHeaderSearch />

      <SearchFilterNav />

      <div className="body_container">
        <div className="body_second_container" style={{ paddingTop: "140px" }}>
          <ProductSection data={productData} type="search" />

          <StoreSection name={"Top Stores selling Laptop"} data={storeData} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchPage;
