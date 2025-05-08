import React, { useEffect, useState } from "react";
import "./MenuSidebar.css";
import {
  CategoryDataProp,
  MarketplaceDataProps,
  MenuSidebarProps,
} from "../../types/types";
import saleko_green from "../../assets/images/svg/saleko_green.svg";
import {
  BsChevronDown,
  BsChevronRight,
  BsChevronUp,
  BsX,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {
  useFetchAllCategoriesQuery,
  useMarketplaceApiQuery,
} from "../../services/appApi";
import logout_ic from "../../assets/images/svg/logout_ic.svg";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../slice/userDetailsSlice";
import { removeCreateAccountDataValues } from "../../slice/createAccountDataSlice";
import { removeCart } from "../../slice/cartSlice";
import { removeFromWishlist } from "../../slice/wishlistSlice";
import { RootState } from "../../store/store";
import ProfileSidebar from "../profile-sidebar/ProfileSidebar";

const MenuSidebar = ({ isOpen, closeModal }: MenuSidebarProps) => {
  const [categoryData, setCategoryData] = useState<CategoryDataProp[]>([]);
  const [openCategoryDropdown, setOpenCategoryDropdown] = useState(false);
  const [openMarketDropdown, setOpenMarketDropdown] = useState(false);
  const [marketData, setMarketData] = useState<
    MarketplaceDataProps[] | undefined
  >();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: fetchedCategoryData, isSuccess: fetchedCategorySuccess } =
  useFetchAllCategoriesQuery({});

  const { data: fetchedMarketData, isSuccess: fetchedMarketSuccess } =
    useMarketplaceApiQuery({});

  const user = useSelector((state: RootState) => state.userDetails.user);

  // Category useEffect
  useEffect(() => {
    if (fetchedCategorySuccess) {
      setCategoryData(fetchedCategoryData.data);
    }
  }, [fetchedCategoryData, fetchedCategorySuccess]);

  // Market useEffect
  useEffect(() => {
    if (fetchedMarketSuccess) {
      setMarketData(fetchedMarketData.data);
    }
  }, [fetchedMarketData, fetchedMarketSuccess]);

  if (!isOpen) return null; // If the modal is not open, don't render anything

  const handleCategoryItem = (categoryName: string) => {
    closeModal();
    navigate(`/category?q=${encodeURIComponent(categoryName)}`);
  };

  const handleMarketItem = (marketname: string) => {
    closeModal();
    navigate(`/market?q=${encodeURIComponent(marketname)}`);
  };

  return (
    <div className="menu_sidebar_overlay">
      <div className="menu_sidebar_content">
        {/* Close sidebar container */}
        <div className="close_sidebar_container">
          <img src={saleko_green} className="close_sidebar_saleko_green_logo" />

          <BsX size={30} style={{ cursor: "pointer" }} onClick={closeModal} />
        </div>

        {/* Header text */}
        <div>
          <p className="menu_sidebar_header_text">Hello Shopper 👋</p>
        </div>

        {user && <ProfileSidebar closeModal={closeModal}/>}

        {/* Shop by category */}
        <div
          className="sidebar_shop_by_category_container"
          onClick={() => setOpenCategoryDropdown(!openCategoryDropdown)}
        >
          <p style={{ fontSize: "16px" }}>Shop by category</p>
          {openCategoryDropdown ? (
            <BsChevronUp size={15} color="white" />
          ) : (
            <BsChevronDown size={15} color="white" />
          )}
        </div>

        {/* Shop by category dropdown */}
        {openCategoryDropdown && (
          <div className="sidebar_category_dropdown">
            {categoryData.map((item, index) => (
              <div
                className="sidebar_category_dropdown_item"
                key={index}
                onClick={() => handleCategoryItem(item.name)}
              >
                <p>{item.name}</p>
                <BsChevronRight size={15} />
              </div>
            ))}
          </div>
        )}

        <div style={{ padding: "10px" }} />

        {/* Shop by market */}
        <div
          className="sidebar_shop_by_market_container"
          onClick={() => setOpenMarketDropdown(!openMarketDropdown)}
        >
          <p style={{ fontSize: "16px" }}>Shop by market</p>
          {openMarketDropdown ? (
            <BsChevronUp size={15} />
          ) : (
            <BsChevronDown size={15} />
          )}
        </div>

        {/* Shop by market dropdown */}
        {openMarketDropdown && (
          <div className="sidebar_market_dropdown">
            {marketData?.map((item, index) => (
              <div
                className="sidebar_market_dropdown_item"
                key={index}
                onClick={() => handleMarketItem(item.name)}
              >
                <img
                  src={saleko_green} // item.image ?? saleko_green
                  className="sidebar_market_dropdown_item_image"
                />
                <p>
                  {item.name.charAt(0).toUpperCase() +
                    item.name.slice(1).toLowerCase()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuSidebar;
