import React from "react";
import "./MyWishlistPage.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const MyWishlistPage = () => {
  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.wishlistCart
  );
  return (
    <div className="profile_outlet_wrapper">
      <div className="profile_outlet_header_container">
        <div className="wishlist_header_left">
          <span className="wishlist_header_text">My Wishlist</span>
          <span className="wishlist_header_item">{wishlistItems?.length} items</span>
        </div>

        <div className="wishlist_header_right">
          <span className="wishlist_header_sort">Sort by:</span>
          <span className="wishlist_header_sort">Newest</span>
        </div>
      </div>

      <div>
        
      </div>
    </div>
  );
};

export default MyWishlistPage;
