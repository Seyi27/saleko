import React, { useEffect, useState } from "react";
import "./NavHeaderSearch.css";
import AppStore from "../../assets/images/svg/AppStore";
import GoogleStore from "../../assets/images/svg/GoogleStore";
import { BsCart3, BsHeart, BsSearch } from "react-icons/bs";
import StoreIconLogo from "../../assets/images/svg/StoreIconLogo";
import CustomButton from "../custom-button/CustomButton";
import { useNavigate } from "react-router-dom";
import SearchBar from "../search-bar/SearchBar";
import {
  useMarketplaceApiQuery,
  useLazySingleMarketplaceApiQuery,
} from "../../services/appApi";
import { MarketplaceDataProps } from "../../types/types";
import AuthModal from "../auth/auth-modal/AuthModal";

const NavHeaderSearch = () => {
  const navigate = useNavigate();
  const [selectedMarket, setSelectedMarket] = useState("");
  const [marketData, setMarketData] = useState<
    MarketplaceDataProps[] | undefined
  >();
  const { data, isSuccess, isLoading, isError, error } = useMarketplaceApiQuery(
    {}
  );

  const [isOpen, setIsOpen] = useState(false);

  const [singleMarketplaceApi, { data: singleMarket }] =
    useLazySingleMarketplaceApiQuery();

  useEffect(() => {
    if (isSuccess) {
      setMarketData(data.data);
    }
    // singleMarketplaceApi(7)
  }, [data, isSuccess]);

  const handleSelectionChange = (e: any) => {
    setSelectedMarket(e.target.value);
  };

  const handleNavigate = () => {
    // navigate("/login");
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="nav_header_search_container">
      <div className="nav_header_search_second_container">
        <div className="nav_header_search_left_container">
          <AppStore />
          <GoogleStore />
        </div>

        {/* Search Input and dropdown */}
        <div className="search_and_dropdown_container">
          <SearchBar />

          <div className="select_dropdown_container">
            <StoreIconLogo />

            <select
              id="country-code"
              value={selectedMarket}
              onChange={handleSelectionChange}
              style={{
                padding: "5px",
                margin: "10px 0",
                color: "#8E8E8E",
                border: "none",
                outline: "none",
              }}
            >
              {marketData?.map((market, index) => (
                <option key={index} value={market.name}>
                  {market.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Favorite and Add to cart */}
        <div className="nav_header_search_right_container">
          <div className="right_icon">
            <BsHeart color="#084c3f" />
          </div>
          <div className="right_icon">
            <BsCart3 color="#084c3f" />
            <div className="cart_number">1</div>
          </div>

          <CustomButton
            label="Login/Register"
            width={"120px"}
            height="51px"
            bgColor="transparent"
            textColor="#FFFFFF"
            fontWeight={600}
            fontSize={16}
            onClick={handleNavigate}
          />
        </div>
      </div>

      <AuthModal isOpen={isOpen} handleCloseModal={handleCloseModal} />
    </div>
  );
};

export default NavHeaderSearch;
