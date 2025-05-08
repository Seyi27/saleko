import React from "react";
import "./ProfileSidebar.css";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { removeUser } from "../../slice/userDetailsSlice";
import { removeCreateAccountDataValues } from "../../slice/createAccountDataSlice";
import { removeCart } from "../../slice/cartSlice";
import { removeFromWishlist } from "../../slice/wishlistSlice";
import NegotiateIcon from "../../assets/images/svg/NegotiateIcon";
import wishlist_ic from "../../assets/images/svg/wishlist_ic.svg";
import wishlist_ic_green from "../../assets/images/svg/wishlist_ic_green.svg";
import store_add from "../../assets/images/svg/store_add.svg";
import user_circle from "../../assets/images/svg/user_circle.svg";
import user_circle_green from "../../assets/images/svg/user_circle_green.svg";
import logout_ic from "../../assets/images/svg/logout_ic.svg";
import { BsBoxSeam, BsGeoAlt, BsGeoAltFill, BsWallet } from "react-icons/bs";

type ProfileSidebarProps = {
  closeModal?: () => void;
};

const ProfileSidebar = ({ closeModal }: ProfileSidebarProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(removeUser());
    dispatch(removeCreateAccountDataValues());
    dispatch(removeCart());
    dispatch(removeFromWishlist());
    localStorage.clear();

    navigate("/");
    setTimeout(() => window.location.reload(), 0); // to reinitiate the redux store
  };

  const location = useLocation();

  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <div className="profile_sidebar_container">
      <div className="profile_sidebar_item_header">
        <p>My Account</p>
      </div>
      <Link
        to={"/profile/personal-details"}
        className={`profile_sidebar_item_container ${
          isActive("/profile/personal-details") && "active_tab"
        }`}
        onClick={closeModal}
      >
        <img
          src={
            isActive("/profile/personal-details")
              ? user_circle_green
              : user_circle
          }
        />{" "}
        <p
          className={`profile_sidebar_text ${
            isActive("/profile/personal-details") && "active_tab_text"
          }`}
        >
          Personal Details
        </p>
      </Link>

      <Link
        to={"/profile/delivery-address"}
        className={`profile_sidebar_item_container ${
          isActive("/profile/delivery-address") && "active_tab"
        }`}
        onClick={closeModal}
      >
        {isActive("/profile/delivery-address") ? (
          <BsGeoAltFill color="#084c3f" />
        ) : (
          <BsGeoAlt />
        )}
        <p
          className={`profile_sidebar_text ${
            isActive("/profile/delivery-address") && "active_tab_text"
          }`}
        >
          Delivery Address
        </p>
      </Link>

      <div className="profile_sidebar_item_container" onClick={closeModal}>
        <BsWallet />
        <p className="profile_sidebar_text">Wallet</p>
      </div>

      <div className="profile_sidebar_item_container" onClick={closeModal}>
        <BsBoxSeam />
        <p className="profile_sidebar_text">My Orders</p>
      </div>

      <Link
        to={"/profile/my-wishlist"}
        className={`profile_sidebar_item_container ${
          isActive("/profile/my-wishlist") && "active_tab"
        }`}
        onClick={closeModal}
      >
        <img
          src={
            isActive("/profile/my-wishlist") ? wishlist_ic_green : wishlist_ic
          }
        />
        <p
          className={`profile_sidebar_text ${
            isActive("/profile/my-wishlist") && "active_tab_text"
          }`}
        >
          My Wishlist
        </p>
      </Link>

      <div className="profile_sidebar_item_container" onClick={closeModal}>
        <NegotiateIcon color="black" />
        <p className="profile_sidebar_text">Negotiation</p>
      </div>

      <div className="profile_sidebar_item_container" onClick={closeModal}>
        <img src={store_add} />
        <p className="profile_sidebar_text">Become a Seller</p>
      </div>

      <div
        className="profile_sidebar_item_container logout_container"
        onClick={handleLogOut}
      >
        <img src={logout_ic} />
        <p className="profile_sidebar_text" style={{ color: "red" }}>
          Logout
        </p>
      </div>
    </div>
  );
};

export default ProfileSidebar;
