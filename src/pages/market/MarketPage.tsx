import React, { useState } from "react";
import "./MarketPage.css";
import NavHeader from "../../components/nav-header/NavHeader";
import NavHeaderSearch from "../../components/nav-header-search/NavHeaderSearch";
import SearchFilterNav from "../../components/search-filter-nav/SearchFilterNav";
import Footer from "../../components/footer/Footer";
import ProductSection from "../../components/product-section/ProductSection";
import { productData } from "../../helpers/Data";
import { useLocation } from "react-router-dom";
import StoreIconGreen from "../../assets/images/svg/StoreIconGreen";
import saleko_green from "../../assets/images/svg/saleko_green.svg";
import { BsSearch } from "react-icons/bs";
import PageWrapper from "../../components/page-wrapper/PageWrapper";

const MarketPage = () => {
  const [marketSearch, setMarketSearch] = useState("");
  const searchParams = new URLSearchParams(useLocation().search);
  const query = searchParams.get("q");

  return (
    <PageWrapper classname="market_content_wrapper" filterNav>
      <div className="market_header_container">
        <StoreIconGreen width="20" height="18" />
        <p>
          {query &&
            query.charAt(0).toUpperCase() + query.slice(1).toLowerCase()}
        </p>
      </div>

      <div className="market_details_container">
        <img src={saleko_green} className="market_image" />
        <div className="market_details_second_container">
          <p>
            168
            <br></br>
            Sellers
          </p>

          <div className="market_divider" />

          <p>
            50k+
            <br></br>
            Sold
          </p>

          <div className="market_divider" />

          <p>
            10k+
            <br></br>
            Products
          </p>
        </div>
        <div className="market_search_input_container">
          <BsSearch size={15} />
          <input
            value={marketSearch}
            onChange={(e) => setMarketSearch(e.target.value)}
            className="market_search_input"
            placeholder="Search for products"
          />
        </div>{" "}
      </div>

      <ProductSection
        data={productData}
        type="related"
        name="Trending Product"
      />
    </PageWrapper>
  );
};

export default MarketPage;
