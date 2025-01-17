import React, { useState } from "react";
import "./HomePage.css";
import NavHeader from "../../components/nav-header/NavHeader";
import AppStore from "../../assets/images/svg/AppStore";
import GoogleStore from "../../assets/images/svg/GoogleStore";
import { BsCart3, BsHeart, BsSearch } from "react-icons/bs";
import { countryCallingCodes } from "../../helpers/CountryCallingCodes";
import StoreIconLogo from "../../assets/images/svg/StoreIconLogo";
import CustomButton from "../../components/custom-button/CustomButton";
import NavCategories from "../../components/nav-categories/NavCategories";
import NavHeaderSearch from "../../components/nav-header-search/NavHeaderSearch";
import HomeCarouselComponent from "../../components/home-carousel-component/HomeCarouselComponent";
import ProductSection from "../../components/product-section/ProductSection";
import {
  bestSellerData,
  negotiableData,
  productData,
  storeData,
} from "../../helpers/Data";
import Footer from "../../components/footer/Footer";
import StoreSection from "../../components/store-section/StoreSection";
import BestSellerSection from "../../components/best-seller-section/BestSellerSection";
import HomeFrame7 from "../../assets/images/svg/HomeFrame7";
import HomeFrame8 from "../../assets/images/svg/HomeFrame8";
import HomeFrame9 from "../../assets/images/svg/HomeFrame9";
import MastercardIcon from "../../assets/images/svg/MastercardIcon";
import { NewArrivalGif } from "../../assets/images";

const HomePage = () => {
  return (
    <>
      {/* <div className="group_header"> */}
      <NavHeader />

      <NavHeaderSearch />

      <NavCategories />
      {/* </div> */}

      <div className="body_container">
        <div className="body_second_container">
          <div className="slide_container">
            <HomeCarouselComponent />

            <div className="frame_container_right">
              {/* <img src={Frame1} className="frame_image" />
              <img src={Frame2} className="frame_image" /> */}

              <div className="frame_image" />
              <img src={NewArrivalGif}  />
            </div>
          </div>

          <ProductSection name={"Negotiable Products"} data={negotiableData} type="home"/>

          <ProductSection name={"New Arrivals"} data={productData} type="home"/>

          <ProductSection name={"Fashion"} data={productData} type="home"/>

          <div className="flex_image_container">
            <HomeFrame7 />
            <HomeFrame8 />
          </div>

          <ProductSection name={"Electronics"} data={productData} type="home"/>

          <ProductSection name={"Phones & Tablets Items"} data={productData} type="home"/>

          <div className="frame_image_9">
            <HomeFrame9 />
          </div>

          <ProductSection name={"Computer & Accessories"} data={productData} type="home"/>

          <ProductSection name={"Beauty & Personal Care"} data={productData} type="home"/>

          <BestSellerSection name={"Best Seller"} data={bestSellerData} />

          <StoreSection name={"Top Stores"} data={storeData} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default HomePage;
