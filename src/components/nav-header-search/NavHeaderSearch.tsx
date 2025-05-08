import React, { useEffect, useState } from "react";
import "./NavHeaderSearch.css";
import AppStore from "../../assets/images/svg/AppStore";
import GoogleStore from "../../assets/images/svg/GoogleStore";
import { BsCart3, BsHeart, BsPersonFill, BsSearch, BsX } from "react-icons/bs";
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
import MenuSidebar from "../menu-sidebar/MenuSidebar";
import { addCart, addUserCart, removeCart } from "../../slice/cartSlice";
import {
  useAddToCartApiMutation,
  useGetCartApiQuery,
  useGetGuestCartQuery,
  useGetWishlistApiQuery,
} from "../../services/cartsApi";
import { showCustomToast } from "../custom-toast/CustomToast";
import { addToWishlist } from "../../slice/wishlistSlice";
import { getOrCreateGuestId } from "../../helpers/getOrCreateGuestId";
import { useTooltip } from "../../context/TooltipContext";
import { CartItem } from "../../types/cartTypes";

import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const isFetchBaseQueryError = (
  error: unknown
): error is FetchBaseQueryError => {
  return (error as FetchBaseQueryError).status !== undefined;
};

const NavHeaderSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSignup, setIsOpenSignup] = useState(false);
  const [isOpenResetPassword, setIsOpenResetPassword] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const [openSidebar, setOpenSidebar] = useState(false);

  const { showTooltip, hideTooltip, isVisible } = useTooltip();

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.userDetails.user);
  const cartItems = useSelector(
    (state: RootState) => state.cart.user_cart?.items
  );
  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.wishlistCart
  );

  const guestId = getOrCreateGuestId();

  const {
    data: cartData,
    isSuccess: isCartSuccess,
    refetch: getCartRefresh,
  } = useGetCartApiQuery({}, { skip: !user }); // should skip if there is no user

  const { data: wishlistData, isSuccess: isWishlistSuccess } =
    useGetWishlistApiQuery({}, { skip: !user });

  const {
    data: guestCartData,
    isSuccess: isGuestCartSuccess,
    isError: isGuestCartError,
    error: guestCartError,
  } = useGetGuestCartQuery({ guest_id: guestId });

  const [addToCartApi] = useAddToCartApiMutation();

  // More efficient method
  // Load cart for authenticated user
  useEffect(() => {
    if (user && isCartSuccess && cartData?.data?.data?.length) {
      const userCart = cartData.data.data[0]; // Make sure this is the correct structure
      dispatch(addUserCart(userCart));
    }

    if (user && isWishlistSuccess && wishlistData?.data) {
      dispatch(addToWishlist(wishlistData.data));
    }
  }, [user, isCartSuccess, cartData, isWishlistSuccess, wishlistData]);

  // Load cart for guest user
  useEffect(() => {
    if (!user) {
      if (isGuestCartSuccess && guestCartData?.data) {
        dispatch(
          addCart({
            cart: guestCartData.data.cart_items,
            total_price: guestCartData.data.total_price,
          })
        );
      }
    }
  }, [user, isGuestCartSuccess, guestCartData, isGuestCartError]);

  // Load guest cart into user cart
  useEffect(() => {
    if (user && guestCartData?.data?.cart_items?.length) {
      mergeGuestToAuthenticatedUser();
    }
  }, [user, guestCartData]);

  useEffect(() => {
    // Function to update the state when the window resizes
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Listen to resize events
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const mergeGuestToAuthenticatedUser = async () => {
    if (user && guestCartData?.data?.cart_items?.length > 0) {
      try {
        const products = guestCartData.data.cart_items.map(
          (item: CartItem) => ({
            sku: item.sku,
            quantity: item.quantity,
          })
        );

        const addToCartBody = { products };

        const res = await addToCartApi(addToCartBody).unwrap();

        if (res) {
          dispatch(
            addCart({
              cart: [],
              total_price: 0,
            })
          );
          getCartRefresh();
          localStorage.removeItem("guest_id");
        }
      } catch (error:any) {
        // showCustomToast({
        //   message:
        //     "Error! Please check your network connection and try again..",
        //   type: "error",
        // });
      }
    }
  };

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

  const handleWishlistNavigation = () => {
    if (user) {
      navigate("/profile/my-wishlist");
    } else {
      showTooltip();
    }
  };

  return (
    <div className="body_container nav_header_search_container">
      <div className="body_second_container nav_header_search_second_container">
        <div className="nav_header_search_left_container">
          <AppStore />
          <GoogleStore />
        </div>

        <div className="mobile_saleko_left_container">
          <div className="nav_menu_ic" onClick={() => setOpenSidebar(true)}>
            <img src={menu_svg} />
          </div>

          <MenuSidebar
            isOpen={openSidebar}
            closeModal={() => setOpenSidebar(false)}
          />

          <Link to={"/"} className="nav_saleko_logo">
            <SalekoWhiteLogo />
          </Link>
        </div>

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
          <div className="nav_header_search_right_container">
            <div className="right_icon" onClick={handleWishlistNavigation}>
              <BsHeart color="#084c3f" />
              {wishlistItems && wishlistItems?.length > 0 && (
                <div className="cart_number">{wishlistItems?.length}</div>
              )}
            </div>
            <Link to={"/cart"} className="right_icon">
              <BsCart3 color="#084c3f" />
              {cartItems && cartItems?.length > 0 && (
                <div className="cart_number">{cartItems?.length}</div>
              )}
            </Link>
          </div>

          {user ? (
            <div>
              <div onClick={() => navigate("/profile/personal-details")}>
                {windowWidth > 600 ? (
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
                  </div>
                ) : (
                  <div
                    className="userIcon_container"
                    onClick={() => setOpenSidebar(true)}
                  >
                    <BsPersonFill color="#9c9c9c" size={20} />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {windowWidth > 600 ? (
                <>
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

                  {isVisible && (
                    <div className="tool_tip_container">
                      <BsX
                        size={20}
                        color="white"
                        className="tool_tip_close"
                        onClick={hideTooltip}
                      />
                      <p className="tool_tip_text">
                        Login / Register to save your shopping cart to your
                        account.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <p
                    className="mobile_login_register_text"
                    onClick={handleLoginOpenModal}
                  >
                    Login / Register
                  </p>
                </>
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
