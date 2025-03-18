import React, { useEffect, useState } from "react";
import "./NavHeaderSearch.css";
import AppStore from "../../assets/images/svg/AppStore";
import GoogleStore from "../../assets/images/svg/GoogleStore";
import { BsCart3, BsHeart, BsPersonFill, BsSearch } from "react-icons/bs";
import StoreIconLogo from "../../assets/images/svg/StoreIconLogo";
import CustomButton from "../custom-button/CustomButton";
import { Link, useNavigate } from "react-router-dom";
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
import { removeUser } from "../../slice/userDetailsSlice";
import { removeCreateAccountDataValues } from "../../slice/createAccountDataSlice";
import SalekoWhiteLogo from "../../assets/images/svg/SalekoWhiteLogo";
import MarketDropdown from "../market-dropdown/MarketDropdown";
import menu_svg from "../../assets/images/svg/menu_ic.svg";

const NavHeaderSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSignup, setIsOpenSignup] = useState(false);
  const [isOpenResetPassword, setIsOpenResetPassword] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.userDetails.user);

  // handle login modal
  const handleLoginOpenModal = () => {
    setIsOpen(true);
    dispatch(addActiveScreen("login_form"));
  };

  // handle Register modal
  const handleRegisterOpenModal = () => {
    setIsOpen(true);
    dispatch(addActiveScreen("create_account"));
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  // open successful modal
  const handleOpenSignupModal = () => {
    setIsOpenSignup(true);
  };

  const handleOpenResetPasswordModal = () => {
    setIsOpenResetPassword(true);
  };

  // close successful modal
  const handleCloseSignupModal = () => {
    setIsOpenSignup(false);
    dispatch(addActiveScreen("login_form"));
    setIsOpen(true);
  };

  const handleCloseResetPasswordModal = () => {
    setIsOpenResetPassword(false);
    dispatch(addActiveScreen("login_form"));
    setIsOpen(true);
  };

  const handleLogOut = () => {
    dispatch(removeUser());
    dispatch(removeCreateAccountDataValues());
    window.location.reload();
  };

  return (
    <div className="body_container nav_header_search_container">
      <div className="body_second_container nav_header_search_second_container">
        <div className="nav_header_search_left_container">
          <AppStore />
          <GoogleStore />
        </div>

        <Link to={"/"} className="nav_saleko_logo">
          <SalekoWhiteLogo />
        </Link>

        {/* Search Input and dropdown */}
        <div className="search_and_dropdown_container">
          <SearchBar />

          <MarketDropdown />
        </div>

        {/* Favorite and Add to cart */}
        <div
          className="nav_header_search_right_container"
          style={{ gap: "15px" }}
        >
          <div className="nav_menu_ic">
            <img src={menu_svg} />
          </div>

          <div className="nav_header_search_right_container">
            <div className="right_icon heart_icon">
              <BsHeart color="#084c3f" />
            </div>
            <Link to={"/cart"} className="right_icon">
              <BsCart3 color="#084c3f" />
              <div className="cart_number">1</div>
            </Link>
          </div>

          {user ? (
            <>
              {window.innerWidth > 600 ? (
                <div className="userdetails_container">
                  <div className="userIcon_container">
                    <BsPersonFill color="#9c9c9c" size={20} />
                  </div>
                  <div className="userIcon_name">
                    <span>Hi {user.first_name}</span>
                    {/* <p>
                  {user.last_name.charAt(0).toUpperCase() +
                    user.last_name.slice(1).toLowerCase()}{" "}
                  {user.first_name.charAt(0).toUpperCase() + "."}
                </p> */}
                  </div>

                  <div className="userdetails_dropdown_container">
                    <p onClick={handleLogOut}>Log out</p>
                  </div>
                </div>
              ) : (
                <div className="userIcon_container">
                  <BsPersonFill color="#9c9c9c" size={20} />
                </div>
              )}
            </>
          ) : (
            <>
              {window.innerWidth > 600 ? (
                <div className="nav_button_container">
                  <CustomButton
                    label="Login"
                    width={"50px"}
                    height="51px"
                    bgColor="transparent"
                    textColor="#FFFFFF"
                    fontWeight={600}
                    fontSize={16}
                    onClick={handleLoginOpenModal}
                  />

                  <p style={{ color: "white" }}>/</p>

                  <CustomButton
                    label="Register"
                    width={"70px"}
                    height="51px"
                    bgColor="transparent"
                    textColor="#FFFFFF"
                    fontWeight={600}
                    fontSize={16}
                    onClick={handleRegisterOpenModal}
                  />
                </div>
              ) : (
                <p
                  className="login_register_text"
                  onClick={handleLoginOpenModal}
                >
                  Login / Register
                </p>
              )}
            </>
          )}
        </div>
      </div>

      <AuthModal
        isOpen={isOpen}
        handleCloseModal={handleCloseModal}
        handleOpenSignupModal={handleOpenSignupModal}
        handleOpenResetPasswordModal={handleOpenResetPasswordModal}
      />

      <CustomModal
        isOpen={isOpenSignup}
        closeModal={handleCloseSignupModal}
        label="signup"
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
