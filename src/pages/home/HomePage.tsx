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
  useLazyGetAllProductsByCategoryQuery,
  useLazyGetBestSellerProductsQuery,
  useLazyGetDiscountedProductsQuery,
  useLazyGetTopSellerQuery,
  useLazyNegotiableProductsApiQuery,
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
import PageWrapper from "../../components/page-wrapper/PageWrapper";
import ProductCartSkeleton from "../../components/product-cart-skeleton/ProductCardSkeleton";
import { StoreType } from "../../types/types";
import CountdownTimer from "../../components/count-down-timer/CountdownTimer";
import { SliderItem } from "../../types/appTypes";
import { useFetchBannerQuery } from "../../services/appApi";

const HomePage = () => {
  const [featuredProductsData, setFeaturedProductsData] = useState<Product[]>();
  const [negotiateProductsData, setNegotiateProductsData] =
    useState<Product[]>();
  const [newArrivalsProductsData, setNewArrivalsProductsData] =
    useState<Product[]>();
  const [fashionProductsCategoryData, setFashionProductsCategoryData] =
    useState<Product[]>();
  const [electronicsProductsCategoryData, setElectronicsProductsCategoryData] =
    useState<Product[]>();
  const [phonesProductsCategoryData, setPhonesProductsCategoryData] =
    useState<Product[]>();
  const [computerProductsCategoryData, setComputerProductsCategoryData] =
    useState<Product[]>();
  const [beautyProductsCategoryData, setBeautyProductsCategoryData] =
    useState<Product[]>();
  const [discountedProductsData, setDiscountedProductsData] =
    useState<Product[]>();
  const [bestSellerProductsData, setBestSellerProductsData] =
    useState<Product[]>();
  const [topSellerData, setTopSellerData] = useState<StoreType[]>();
  const [bannerSlides, setBannerSlides] = useState<SliderItem[]>([]);

  const [featuredProducts] = useLazyFeaturedProductsApiQuery();
  const [negotiableProducts] = useLazyNegotiableProductsApiQuery();
  const [newProducts] = useLazyNewProductsApiQuery();
  const [getAllProductsByCategory] = useLazyGetAllProductsByCategoryQuery();
  const [getDiscountedProduct] = useLazyGetDiscountedProductsQuery();
  const [getBestSellerProduct] = useLazyGetBestSellerProductsQuery();
  const [getTopSeller] = useLazyGetTopSellerQuery();
  const { data: bannerdata, isSuccess: bannerSuccess } =
    useFetchBannerQuery("advert");

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const homePaginationProduct = {
    per_page: 6,
    page: 1,
  };

  // Update the state when the window resizes
  useEffect(() => {
    // Function to update the state when the window resizes
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize); // Listen to resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup the event listener when the component unmounts
    };
  }, []);

  useEffect(() => {
    handleFeaturedProductApiCall();
    handleNewProductApiCall();
    handleNegotiateProductApiCall();
    handleDiscountedProductApiCall();
    handleBestSellerProductApiCall();
    handleTopSellerApiCall();

    fetchCategoryProducts("Fashion", "fashion", setFashionProductsCategoryData);
    fetchCategoryProducts(
      "Electronics",
      "electronics",
      setElectronicsProductsCategoryData
    );
    fetchCategoryProducts(
      "Phones and Tablets",
      "phones",
      setPhonesProductsCategoryData
    );
    fetchCategoryProducts(
      "Computers and Accessories",
      "computers",
      setComputerProductsCategoryData
    );
    fetchCategoryProducts(
      "Beauty and Personal Care",
      "beauty",
      setBeautyProductsCategoryData
    );
  }, []);

  useEffect(() => {
    if (bannerSuccess) {
      setBannerSlides(bannerdata.data);
    }
  }, [bannerdata, bannerSuccess]);

  // fetch categories loaders
  const [categoryLoading, setCategoryLoading] = useState<
    Record<string, boolean>
  >({
    featured: false,
    newArrivals: false,
    negotiable: false,
    fashion: false,
    electronics: false,
    phones: false,
    computers: false,
    beauty: false,
    discounted: false,
    bestSeller: false,
    topSeller: false,
  });

  // fetch categories loaders state
  const setCategoryLoader = (categoryLoader: string, isLoading: boolean) => {
    setCategoryLoading((prev) => ({
      ...prev,
      [categoryLoader]: isLoading,
    }));
  };

  // featured product api call
  const handleFeaturedProductApiCall = async () => {
    setCategoryLoader("featured", true);
    try {
      const res = await featuredProducts({
        ...homePaginationProduct,
        type: "featured",
      }).unwrap();
      if (res) {
        setFeaturedProductsData(res.data.products);
        setCategoryLoader("featured", false);
      }
    } catch (error) {
      // showCustomToast({
      //   message: "Failed to load featured products. Please try again later..",
      //   type: "error",
      // });
      setCategoryLoader("featured", true);
    }
  };

  // new arrivals api call
  const handleNewProductApiCall = async () => {
    setCategoryLoader("newArrivals", true);
    try {
      const res = await newProducts({
        ...homePaginationProduct,
        type: "new",
      }).unwrap();
      if (res) {
        setNewArrivalsProductsData(res.data.products);
        setCategoryLoader("newArrivals", false);
      }
    } catch (error) {
      // showCustomToast({
      //   message: "Failed to load new products. Please try again later..",
      //   type: "error",
      // });
      setCategoryLoader("newArrivals", true);
    }
  };

  // negotiable products api call
  const handleNegotiateProductApiCall = async () => {
    setCategoryLoader("negotiable", true);
    try {
      const res = await negotiableProducts({
        ...homePaginationProduct,
        type: "negotiable",
      }).unwrap();
      if (res) {
        setNegotiateProductsData(res.data.products);
        setCategoryLoader("negotiable", false);
      }
    } catch (error) {
      // showCustomToast({
      //   message: "Failed to load negotiable products. Please try again later..",
      //   type: "error",
      // });
      setCategoryLoader("negotiable", true);
    }
  };

  // discounted products api call
  const handleDiscountedProductApiCall = async () => {
    setCategoryLoader("discounted", true);
    try {
      const res = await getDiscountedProduct({
        ...homePaginationProduct,
        per_page: 7,
        type: "discounted",
      }).unwrap();
      if (res) {
        setDiscountedProductsData(res.data.products);
        setCategoryLoader("discounted", false);
      }
    } catch (error) {
      // showCustomToast({
      //   message: "Failed to load negotiable products. Please try again later..",
      //   type: "error",
      // });
      setCategoryLoader("discounted", true);
    }
  };

  // best seller products api call
  const handleBestSellerProductApiCall = async () => {
    setCategoryLoader("bestSeller", true);
    try {
      const res = await getBestSellerProduct({
        ...homePaginationProduct,
        per_page: 7,
      }).unwrap();
      if (res) {
        setBestSellerProductsData(res.data.products);
        setCategoryLoader("bestSeller", false);
      }
    } catch (error) {
      // showCustomToast({
      //   message:
      //     "Failed to load best seller products. Please try again later..",
      //   type: "error",
      // });
      setCategoryLoader("bestSeller", true);
    }
  };

  // fetch categories api call
  const fetchCategoryProducts = async (
    category: string,
    categoryLoader: string,
    setData: React.Dispatch<React.SetStateAction<Product[] | undefined>>
  ) => {
    setCategoryLoader(categoryLoader, true);
    try {
      const res = await getAllProductsByCategory({
        ...homePaginationProduct,
        categoryName: category,
      }).unwrap();
      if (res) {
        setData(res.data.products);
        setCategoryLoader(categoryLoader, false);
      }
    } catch (error) {
      // showCustomToast({
      //   message: `Failed to load ${category} products. Please try again later..`,
      //   type: "error",
      // });
      setCategoryLoader(categoryLoader, true);
    }
    // finally {
    //   setCategoryLoader(categoryLoader, false);
    // }
  };

  // top seller api call
  const handleTopSellerApiCall = async () => {
    setCategoryLoader("topSeller", true);
    try {
      const res = await getTopSeller(homePaginationProduct).unwrap();
      if (res) {
        setTopSellerData(res.data);
        setCategoryLoader("topSeller", false);
      }
    } catch (error) {
      // showCustomToast({
      //   message:
      //     "Failed to load best seller products. Please try again later..",
      //   type: "error",
      // });
      setCategoryLoader("topSeller", true);
    }
  };

  return (
    <PageWrapper classname="home_body_container">
      {/* {windowWidth > 600 ? ( */}
      <HomeCarouselComponent />
      {/* ) : (
        <img src={saleko_home_mobile} className="alt_carousel_image" />
      )} */}

      {/* Featured Products */}
      <ProductSection
        name={"Featured Products"}
        data={featuredProductsData}
        type="home"
        sectionLoader={categoryLoading.featured}
      />

      {/* Negotiable Products */}
      <ProductSection
        name={"Negotiable Products"}
        data={negotiateProductsData}
        type="home"
        sectionLoader={categoryLoading.negotiable}
      />

      {/* New Arrivals */}
      <ProductSection
        name={"New Arrivals"}
        data={newArrivalsProductsData}
        type="home"
        sectionLoader={categoryLoading.newArrivals}
      />

      {/* Fashion */}
      <ProductSection
        name={"Fashion"}
        data={fashionProductsCategoryData}
        type="home"
        sectionLoader={categoryLoading.fashion}
        viewAll={"Fashion"}
      />

      {bannerSlides ? (
        <div className="flex_image_container">
          {bannerSlides.map((slide, index) => (
            <div key={index}>
              <img
                src={slide.image_url}
                alt={`Slide ${index + 1}`}
                style={{ width: "100%" }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex_image_container">
          <img src={saleko_img5} className="homeframe5_img" />
          <img src={saleko_img6} className="homeframe6_img" />
        </div>
      )}

      {/* Electronics */}
      <ProductSection
        name={"Electronics"}
        data={electronicsProductsCategoryData}
        type="home"
        sectionLoader={categoryLoading.electronics}
        viewAll={"Electronics"}
      />

      {/* Phones & Tablets Items */}
      <ProductSection
        name={"Phones & Tablets Items"}
        data={phonesProductsCategoryData}
        type="home"
        sectionLoader={categoryLoading.phones}
        viewAll={"Phones and Tablets"}
      />

      <div className="frame_image_9">
        <img src={saleko_img7} className="homeframe7_img" />
      </div>

      {/* Computer & Accessories */}
      <ProductSection
        name={"Computers & Accessories"}
        data={computerProductsCategoryData}
        type="home"
        sectionLoader={categoryLoading.computers}
        viewAll={"Computers & Accessories"}
      />

      {/* Beauty & Personal Care */}
      <ProductSection
        name={"Beauty & Personal Care"}
        data={beautyProductsCategoryData}
        type="home"
        sectionLoader={categoryLoading.beauty}
        viewAll={"Beauty and Personal Care"}
      />

      {/* Best Seller */}
      <BestSellerSection
        name={"Best Seller"}
        data={discountedProductsData}
        sectionLoader={categoryLoading.discounted}
      />

      {/* Top Stores */}
      <TopStoreSection
        name={"Top Stores"}
        data={topSellerData}
        sectionLoader={categoryLoading.topSeller}
      />
      {/* </div>
      </div> */}
    </PageWrapper>
  );
};

export default HomePage;
