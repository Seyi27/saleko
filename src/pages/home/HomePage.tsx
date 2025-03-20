import React, { useEffect, useState } from "react";
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
import BestSellerSection from "../../components/best-seller-section/BestSellerSection";
import HomeFrame7 from "../../assets/images/svg/HomeFrame7";
import HomeFrame8 from "../../assets/images/svg/HomeFrame8";
import HomeFrame9 from "../../assets/images/svg/HomeFrame9";
import MastercardIcon from "../../assets/images/svg/MastercardIcon";
import { NewArrivalGif } from "../../assets/images";
import {
  useLazyFeaturedProductsApiQuery,
  useLazyNewProductsApiQuery,
} from "../../services/productsApi";
import { showCustomToast } from "../../components/custom-toast/CustomToast";
import { Product } from "../../types/productTypes";
import { TailSpin } from "react-loader-spinner";
import saleko_img5 from "../../assets/images/all_Images/saleko_img5.png";
import saleko_img6 from "../../assets/images/all_Images/saleko_img6.png";
import saleko_img7 from "../../assets/images/all_Images/saleko_img7.png";
import saleko_home_mobile from "../../assets/images/svg/saleko_home_mobile.svg";
import TopStoreSection from "../../components/top-store-section/TopStoreSection";
import { useLocation, useSearchParams } from "react-router-dom";

const HomePage = () => {
  const [featuredProductsData, setFeaturedProductsData] = useState<Product[]>();
  const [newProductsData, setNewProductsData] = useState<Product[]>();

  const [isFeatureLoading, setIsFeatureLoading] = useState(false);
  const [isNewLoading, setIsNewLoading] = useState(false);

  const [featuredProducts] = useLazyFeaturedProductsApiQuery();
  const [newProducts] = useLazyNewProductsApiQuery();

  const featuredProductBody = {
    pageNumber: 1,
    pageSize: 6,
  };

  useEffect(() => {
    handleFeaturedProductApiCall();
    handleNewProductApiCall();
  }, []);

  const handleFeaturedProductApiCall = async () => {
    setIsFeatureLoading(true);

    try {
      const res = await featuredProducts(featuredProductBody).unwrap();
      if (res) {
        setFeaturedProductsData(res.data);
        setIsFeatureLoading(false);
      }
    } catch (error) {
      showCustomToast({
        message: "Failed to load featured products. Please try again later..",
        type: "error",
      });
      setIsFeatureLoading(false);
    }
  };

  const handleNewProductApiCall = async () => {
    setIsNewLoading(true);

    try {
      const res = await newProducts(featuredProductBody).unwrap();
      if (res) {
        setNewProductsData(res.data);
        setIsNewLoading(false);
      }
    } catch (error) {
      showCustomToast({
        message: "Failed to load new products. Please try again later..",
        type: "error",
      });
      setIsNewLoading(false);
    }
  };

  return (
    <>
      {/* <div className="group_header"> */}
      <NavHeader />

      <NavHeaderSearch />

      <NavCategories />
      {/* </div> */}

      <div className="body_container">
        <div className="body_second_container home_body_container">
          {window.innerWidth > 600 ? (
            <div style={{ paddingTop: "200px" }}>
              <HomeCarouselComponent />
            </div>
          ) : (
            <img src={saleko_home_mobile} className="alt_carousel_image" />
          )}

          {/* Featured Products */}
          {isFeatureLoading ? (
            <div className="loader_container">
              <TailSpin
                visible={true}
                height={"50"}
                width={"50"}
                color={"#084C3F"}
                ariaLabel="tail-spin-loading"
                radius="2"
                wrapperStyle={{}}
                wrapperClass=""
                strokeWidth={5} // Adjust thickness
              />
            </div>
          ) : (
            <ProductSection
              name={"Featured Products"}
              data={featuredProductsData}
              type="home"
            />
          )}

          {/* Negotiable Products */}
          <ProductSection
            name={"Negotiable Products"}
            data={productData}
            type="home"
          />

          {/* New Arrivals */}
          {isNewLoading ? (
            <div className="loader_container">
              <TailSpin
                visible={true}
                height={"50"}
                width={"50"}
                color={"#084C3F"}
                ariaLabel="tail-spin-loading"
                radius="2"
                wrapperStyle={{}}
                wrapperClass=""
                strokeWidth={5} // Adjust thickness
              />
            </div>
          ) : (
            <ProductSection
              name={"New Arrivals"}
              data={newProductsData}
              type="home"
            />
          )}

          {/* Fashion */}
          <ProductSection name={"Fashion"} data={productData} type="home" />

          <div className="flex_image_container">
            <img src={saleko_img5} className="homeframe5_img" />
            <img src={saleko_img6} className="homeframe6_img" />
          </div>

          {/* Electronics */}
          <ProductSection name={"Electronics"} data={productData} type="home" />

          {/* Phones & Tablets Items */}
          <ProductSection
            name={"Phones & Tablets Items"}
            data={productData}
            type="home"
          />

          <div className="frame_image_9">
            <img src={saleko_img7} className="homeframe7_img" />
          </div>

          {/* Computer & Accessories */}
          <ProductSection
            name={"Computer & Accessories"}
            data={productData}
            type="home"
          />

          {/* Beauty & Personal Care */}
          <ProductSection
            name={"Beauty & Personal Care"}
            data={productData}
            type="home"
          />

          {/* Best Seller */}
          <BestSellerSection name={"Best Seller"} data={bestSellerData} />

          {/* Top Stores */}
          <TopStoreSection name={"Top Stores"} data={storeData} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default HomePage;
