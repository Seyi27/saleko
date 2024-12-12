import React, { useState } from "react";
import "./NavHeaderSearch.css";
import AppStore from "../../assets/images/svg/AppStore";
import GoogleStore from "../../assets/images/svg/GoogleStore";
import { BsCart3, BsHeart, BsSearch } from "react-icons/bs";
import StoreIconLogo from "../../assets/images/svg/StoreIconLogo";
import { MarketPlace } from "../../helpers/MarketPlace";
import CustomButton from "../custom-button/CustomButton";
import { useNavigate } from "react-router-dom";

const NavHeaderSearch = () => {
  const [selectedMarket, setSelectedMarket] = useState("");
  const navigate = useNavigate();

  const handleSelectionChange = (e: any) => {
    setSelectedMarket(e.target.value);
  };

  const handleNavigate = () => {
    navigate("/login");
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
          <div className="search_container">
            <input
              placeholder="Search for products, stores and more"
              className="search_textinput"
            />

            <div className="search_icon">
              <BsSearch color="#ffffff" />
            </div>
          </div>

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
              {MarketPlace.map((country, index) => (
                <option key={index} value={country.name}>
                  {country.name}
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
              <div className="cart_number">
                1
              </div>
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
    </div>
  );
};

export default NavHeaderSearch;
