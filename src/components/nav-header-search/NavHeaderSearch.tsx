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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CustomModal from "../custom-modal/CustomModal";
import { addActiveScreen } from "../../slice/authValueSlice";

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
  const [isOpenSignup, setIsOpenSignup] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenResetPassword, setIsOpenResetPassword] = useState(false);

  const dispatch = useDispatch();

  // const user = useSelector((state: RootState) => state.userDetails.user);

  useEffect(() => {
    if (isSuccess) {
      setMarketData(data.data);
    }
    // singleMarketplaceApi(7)
  }, [data, isSuccess]);

  const handleSelectionChange = (e: any) => {
    setSelectedMarket(e.target.value);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  // open successful modal
  const handleOpenSignupModal = () => {
    setIsOpenSignup(true);
  };

  const handleOpenLoginModal = () => {
    setIsOpenLogin(true);
  };

  const handleOpenResetPasswordModal = () => {
    setIsOpenResetPassword(true);
  };

  // close successful modal
  const handleCloseSignupModal = () => {
    setIsOpenSignup(false);
    dispatch(addActiveScreen('create_account'));
  };

  const handleCloseLoginModal = () => {
    setIsOpenLogin(false);
    dispatch(addActiveScreen('create_account'));
  };

  const handleCloseResetPasswordModal = () => {
    setIsOpenResetPassword(false);
    dispatch(addActiveScreen('create_account'));
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

          {/* {user ? (
            <div>
              <span>Hi {user.email}</span>
            </div>
          ) : ( */}
          <CustomButton
            label="Login/Register"
            width={"120px"}
            height="51px"
            bgColor="transparent"
            textColor="#FFFFFF"
            fontWeight={600}
            fontSize={16}
            onClick={handleOpenModal}
          />
          {/* )} */}
        </div>
      </div>

      <AuthModal
        isOpen={isOpen}
        handleCloseModal={handleCloseModal}
        handleOpenSignupModal={handleOpenSignupModal}
        handleOpenLoginModal={handleOpenLoginModal}
        handleOpenResetPasswordModal={handleOpenResetPasswordModal}
      />

      <CustomModal
        isOpen={isOpenSignup}
        closeModal={handleCloseSignupModal}
        label="signup"
      />

      <CustomModal
        isOpen={isOpenLogin}
        closeModal={handleCloseLoginModal}
        label="login"
      />

      <CustomModal
        isOpen={isOpenResetPassword}
        closeModal={handleCloseResetPasswordModal}
        label="password_reset"
      />
    </div>
  );
};

export default NavHeaderSearch;
