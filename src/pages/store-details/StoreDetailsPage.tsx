import React, { useEffect, useRef, useState } from "react";
import "./StoreDetailsPage.css";
import NavHeader from "../../components/nav-header/NavHeader";
import NavHeaderSearch from "../../components/nav-header-search/NavHeaderSearch";
import NavCategories from "../../components/nav-categories/NavCategories";
import saleko_green from "../../assets/images/svg/saleko_green.svg";
import { useParams } from "react-router-dom";
import { productData, productReviews, storelistdata } from "../../helpers/Data";
import { StoreListCardProp } from "../../types/types";
import CustomButton from "../../components/custom-button/CustomButton";
import {
  BsArrowDown,
  BsCaretDown,
  BsChevronDown,
  BsGeoAltFill,
  BsReply,
  BsReplyAll,
  BsSearch,
  BsStarFill,
} from "react-icons/bs";
import Footer from "../../components/footer/Footer";
import share_ic from "../../assets/images/svg/share_ic.svg";
import saleko_img7 from "../../assets/images/all_Images/saleko_img7.png";
import ProductSection from "../../components/product-section/ProductSection";
import { Rating } from "react-simple-star-rating";
import CustomProgressBar from "../../components/custom-progress-bar/CustomProgressBar";
import ReviewMessage from "../../components/review-message/ReviewMessage";
import SocialShareModal from "../../components/social-share-modal/SocialShareModal";

const StoreDetailsPage = () => {
  const { storeId } = useParams();
  const [filteredStoreData, setfilteredStoreData] = useState<
    StoreListCardProp | undefined
  >();
  const [activeTab, setActiveTab] = useState("products");
  const [productSearch, setProductSearch] = useState("");
  const [showSortByDropdown, setShowSortByDropdown] = useState(false);
  const [openSocialModal, setOpenSocialModal] = useState(false);

  useEffect(() => {
    filterStores();
  }, [storeId]);

  const filterStores = () => {
    const filteredstores = storelistdata.find(
      (item) => item.id.toString() === storeId
    );
    setfilteredStoreData(filteredstores);
  };

  const handleActiveState = (name: string) => {
    setActiveTab(name);
  };

  const sortByOptions = [
    "All Product",
    "Price: High to Low",
    "Price: Low to High",
    "From A - Z",
    "From Z - A",
    "Newest Releases",
    "Popularity",
    "Sale Items",
    "Negotiable Items",
  ];

  const ratingReview = [17, 4, 1, 2, 0];

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleDropdownState = () => {
    setShowSortByDropdown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowSortByDropdown(false);
      }
    };

    if (showSortByDropdown) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showSortByDropdown]);

  return (
    <>
      <div>
        <NavHeader />

        <NavHeaderSearch />

        <NavCategories />

        <div className="body_container">
          <div className="body_second_container store_details_body_container">
            {/*  Banner container  */}
            <div className="store_details_banner_container">
              {/* Left image container */}
              <div className="store_details_banner_left_container">
                <div className="store_details_banner_left_header_container">
                  <img
                    src={saleko_green}
                    className="store_details_banner_left_img"
                  />

                  <div className="store_details_banner_left_header_body">
                    <p className="store_details_name">
                      {filteredStoreData?.store_name}
                    </p>

                    <p className="store_details_quantity">18K+ Sold</p>

                    <div className="banner_divider"/>

                    <p className="store_details_market">
                      <BsGeoAltFill /> {filteredStoreData?.store_market}
                    </p>
                  </div>
                </div>

                <div
                  className="store_details_share_button"
                  onClick={() => setOpenSocialModal(true)}
                >
                  Share
                  <img
                    src={share_ic}
                    className="store_details_share_ic"
                  />
                </div>

                <p className="store_details_date">Member since 20 Jan 2023</p>
              </div>

              {/* Right image container */}
              <div className="store_details_banner_right_container">
                <img src={saleko_green} className="store_details_right_img" />
              </div>
            </div>

            <div style={{ padding: "20px" }} />

            {/* Tab top header */}
            <div className="store_details_tab_header_wrapper">
              {/* Product and review tab */}
              <div className="store_details_tab">
                <p
                  className={`store_details_tab_item ${
                    activeTab === "products" ? "active_tab_item" : ""
                  }`}
                  onClick={() => handleActiveState("products")}
                >
                  Products (30)
                </p>
                <p
                  className={`store_details_tab_item ${
                    activeTab === "reviews" ? "active_tab_item" : ""
                  }`}
                  onClick={() => handleActiveState("reviews")}
                >
                  Reviews (4.5)
                </p>
              </div>

              {/* Search and Sort By Container */}
              <div className="store_details_search_and_sort_wrapper">
                {/* Search input container */}
                <div className="store_details_search_input_container">
                  <BsSearch size={15} />
                  <input
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="store_details_search_input"
                    placeholder="Search for products"
                  />
                </div>

                {/* Sort By container */}
                <div className="store_details_sort_wrapper">
                  <div
                    className="store_details_sort_container"
                    onClick={handleDropdownState}
                    ref={buttonRef}
                  >
                    <p>Sort by</p>
                    <BsChevronDown size={12} />
                  </div>

                  {showSortByDropdown && (
                    <div
                      className="store_details_sort_dropdown_container"
                      ref={dropdownRef}
                    >
                      {sortByOptions.map((item, index) => (
                        <p
                          className="store_details_sort_dropdown_item"
                          onClick={() => setShowSortByDropdown(false)}
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              {/* Tab: products */}
              {activeTab === "products" && (
                <ProductSection data={productData} type="search" />
              )}

              {/* Tab: reviews */}
              {activeTab === "reviews" && (
                <div>
                  <div className="store_details_reviews_container">
                    <h2>Verified Customer Reviews</h2>

                    <div className="store_details_reviews_breakdown_container">
                      <div className="store_details_reviews_left_side">
                        <p className="store_details_reviews_rating">3/5</p>
                        <Rating readonly initialValue={3} size={30} />
                        <p className="store_details_verified_reviews">
                          (24 verified reviews)
                        </p>
                      </div>

                      <hr className="store_details_reviews_vertical_divider" />

                      <hr className="store_details_reviews_horizontal_divider" />

                      <div>
                        {ratingReview
                          .slice() // creates a copy of the ratingReview array
                          .reverse() // order of the array
                          .sort((a, b) => b - a) // Sort rating in descending order
                          .map((rating, index) => (
                            <div
                              key={index}
                              className="store_details_rating_review_item"
                            >
                              <BsStarFill size={12} color={"#FFB119"} />
                              {ratingReview.length - index}
                              <CustomProgressBar progress={`${rating}`} />
                              {rating}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ paddingTop: "50px" }}>
                    {productReviews.map((review, index) => (
                      <React.Fragment key={index}>
                        <ReviewMessage item={review} />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ padding: "20px" }} />

            <div className="store_details_img_container">
              <img src={saleko_img7} className="store_details_img" />
            </div>
          </div>
        </div>

        <Footer />
      </div>

      <SocialShareModal
        isOpen={openSocialModal}
        closeModal={() => setOpenSocialModal(false)}
      />
    </>
  );
};

export default StoreDetailsPage;
