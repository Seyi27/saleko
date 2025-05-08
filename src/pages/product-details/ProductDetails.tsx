import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import NavHeader from "../../components/nav-header/NavHeader";
import NavHeaderSearch from "../../components/nav-header-search/NavHeaderSearch";
import NavCategories from "../../components/nav-categories/NavCategories";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  BsChevronDown,
  BsChevronRight,
  BsFillCartFill,
  BsHeart,
  BsHeartFill,
  BsShare,
  BsStarFill,
} from "react-icons/bs";
import { features, productData, productReviews } from "../../helpers/Data";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { check_ic, img1 } from "../../assets/images";
import StoreIconGreen from "../../assets/images/svg/StoreIconGreen";
import { Rating } from "react-simple-star-rating";
import Footer from "../../components/footer/Footer";
import ProductSection from "../../components/product-section/ProductSection";
import CustomButton from "../../components/custom-button/CustomButton";
import CustomProgressBar from "../../components/custom-progress-bar/CustomProgressBar";
import { BiCart } from "react-icons/bi";
import ImageSlider from "../../components/image-slider/ImageSlider";
import CustomModal from "../../components/custom-modal/CustomModal";
import NegotiationModal from "../../components/negotiation-modal/NegotiationModal";
import { Product } from "../../types/productTypes";
import { formatPrice } from "../../helpers/helper";
import NegotiateIcon from "../../assets/images/svg/NegotiateIcon";
import ReviewMessage from "../../components/review-message/ReviewMessage";
import { showCustomToast } from "../../components/custom-toast/CustomToast";
import { TailSpin } from "react-loader-spinner";
import PageWrapper from "../../components/page-wrapper/PageWrapper";
import saleko_green from "../../assets/images/svg/saleko_green.svg";
import {
  useLazyGetAllProductsByCategoryQuery,
  useLazyGetProductDetailsWithSkuQuery,
} from "../../services/productsApi";
import {
  useAddGuestCartMutation,
  useAddToCartApiMutation,
  useCreateWishlistApiMutation,
  useDeleteWishlistApiMutation,
  useGetCartApiQuery,
  useGetGuestCartQuery,
  useGetWishlistApiQuery,
} from "../../services/cartsApi";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../slice/cartSlice";
import SocialShareModal from "../../components/social-share-modal/SocialShareModal";
import { RootState } from "../../store/store";
import { getOrCreateGuestId } from "../../helpers/getOrCreateGuestId";
import { useTooltip } from "../../context/TooltipContext";

const ProductDetails = () => {
  const guestId = getOrCreateGuestId();
  const [productDetailsData, setProductDetailsData] = useState<Product>();
  const [activeTab, setActiveTab] = useState("description");
  const { sku } = useParams();
  const [fetchedCategoryData, setFetchedCategoryData] = useState<Product[]>([]);

  const [totalFetchedCategoryData, setTotalFetchedCategoryData] =
    useState<number>(0);
  const [numberOfDisplayedProducts, setNumberOfDisplayedProducts] =
    useState<number>(6);
  const [viewMoreLoader, setViewMoreLoader] = useState(false);

  const [favouriteClicked, setFavouriteClicked] = useState(false);
  const [count, setCount] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const [openNegotiationModal, setOpenNegotiationModal] = useState(false);
  const [openSocialModal, setOpenSocialModal] = useState(false);

  const { refetch: getCartRefresh } = useGetCartApiQuery({});
  const { refetch: getGuestCartRefresh } = useGetGuestCartQuery({
    guest_id: guestId,
  });
  const { refetch: getWishlistRefresh } = useGetWishlistApiQuery({});

  const [addToWishlistApi] = useCreateWishlistApiMutation();
  const [deleteWishlistApi] = useDeleteWishlistApiMutation();
  const { showTooltip, isVisible, content } = useTooltip();

  const [addToCartApi, { isLoading: addToCartloader }] =
    useAddToCartApiMutation();

  const [addToGuestCartApi, { isLoading: addToGuestCartloader }] =
    useAddGuestCartMutation();

  const [getProductDetailsWithSku, { isLoading: skuLoader }] =
    useLazyGetProductDetailsWithSkuQuery();

  const [getAllProductsByCategory, { isLoading: categoryLoader }] =
    useLazyGetAllProductsByCategoryQuery();

  const user = useSelector((state: RootState) => state.userDetails.user);

  const dispatch = useDispatch();

  const paginationProduct = {
    per_page: numberOfDisplayedProducts,
    page: 1,
  };

  const { state } = useLocation();

  const handleActiveState = (name: string) => {
    setActiveTab(name);
  };

  const countIncrement = () => {
    setCount(count + 1);
  };

  const countDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  // Add to cart
  const handleAddToCart = async () => {
    try {
      const guestId = getOrCreateGuestId();

      const addToCartBody = {
        products: [
          {
            sku: productDetailsData?.sku,
            quantity: count,
          },
        ],
      };

      const addToGuestCartBody = {
        products: [
          {
            sku: productDetailsData?.sku,
            quantity: count, // 1 because there is no quantity ui for the product card on the home page
          },
        ],
        guest_token: guestId,
      };

      const res = user
        ? await addToCartApi(addToCartBody).unwrap()
        : await addToGuestCartApi(addToGuestCartBody).unwrap(); // forces the mutation to return a raw response or throw an error.
      if (res) {
        showCustomToast({
          message: "Product added successfully",
          type: "success",
        });

        if (user) {
          getCartRefresh();
        } else {
          getGuestCartRefresh();
        }
      }
    } catch (error) {
      showCustomToast({
        message: "Error! Please check your network connection and try again..",
        type: "error",
      });
    }
  };

  // Get product with sku
  const handleGetProductWithSkuCall = async () => {
    try {
      const res = await getProductDetailsWithSku(sku as string).unwrap();
      if (res) {
        setProductDetailsData(res.data.products[0]);
      }
    } catch (error) {
      showCustomToast({
        message: "kindly check your network connection, and reload",
        type: "error",
      });
    }
  };

  // fetch category
  const fetchCategoryProducts = async (category: string) => {
    try {
      const res = await getAllProductsByCategory({
        ...paginationProduct,
        categoryName: category,
      }).unwrap();
      if (res) {
        setFetchedCategoryData(res.data.products);
        setTotalFetchedCategoryData(res.data.pagination.total);
        setViewMoreLoader(false);
      }
    } catch (error) {
      showCustomToast({
        message: `Failed to load ${category} products. Please try again later..`,
        type: "error",
      });
      setViewMoreLoader(false);
    }
  };

  // Add to wishlist api call
  const handleAddToWishlist = async () => {
    try {
      if (user) {
        const res = await addToWishlistApi({
          product_id: productDetailsData?.product_id,
        }).unwrap(); // forces the mutation to return a raw response or throw an error.
        if (res) {
          setFavouriteClicked(true);
          showCustomToast({
            message: "Product added to wishlist successfully",
            type: "success",
          });
          getWishlistRefresh();
        }
      } else {
        showTooltip();
      }
    } catch (error) {
      showCustomToast({
        message: "Error! Please check your network connection and try again..",
        type: "error",
      });
      setFavouriteClicked(false);
    }
  };

  // Delete from wishlist api call
  const handleDeleteFromWishlist = async () => {
    try {
      const res = await deleteWishlistApi({
        product_id: productDetailsData?.product_id,
      }).unwrap(); // forces the mutation to return a raw response or throw an error.
      if (res) {
        setFavouriteClicked(false);
        showCustomToast({
          message: "Product removed from wishlist successfully",
          type: "success",
        });
        getWishlistRefresh();
      }
    } catch (error) {
      showCustomToast({
        message: "Error! Please check your network connection and try again..",
        type: "error",
      });
      setFavouriteClicked(true);
    }
  };

  const handleMoreButton = () => {
    setViewMoreLoader(true);
    setNumberOfDisplayedProducts((prev) => prev + 12);
  };

  const ratingReview = [17, 4, 1, 2, 0];

  const handleChooseColor = (color: string) => {
    setSelectedColor(color);
  };

  const handleChooseSize = (size: string) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    handleGetProductWithSkuCall();

    if (productDetailsData?.category_name) {
      fetchCategoryProducts(productDetailsData?.category_name);
    }
  }, [sku, productDetailsData, numberOfDisplayedProducts]);

  const formatDateToMonthDay = (dateString: string): string => {
    const date = new Date(dateString);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = monthNames[date.getMonth()];
    const day = date.getDate();

    return `${month}, ${day}`;
  };

  return (
    <>
      <PageWrapper classname="product_details_container">
        {skuLoader ? (
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
          <>
            <div className="breadcrumbs_container">
              <Link to={"/"} className="product_details_inactive_link">
                Home
              </Link>
              <BsChevronRight color="#A3A9C2" size={13} />
              <Link
                to={`/category?q=${encodeURIComponent(
                  productDetailsData?.category_name as string
                )}`}
                className="product_details_inactive_link"
              >
                {productDetailsData?.category_name}
              </Link>
              <BsChevronRight color="#A3A9C2" size={13} />

              <Link to={""} className="product_details_active_link">
                {productDetailsData?.name}
              </Link>
            </div>

            <div className="product_image_description_container">
              {/* left image container */}
              <div className="product_image_left_container">
                <div className="product_details_image_column">
                  {productDetailsData?.image_urls?.map((img, index) => (
                    <img
                      src={img.local_url ?? saleko_green}
                      className="product_details_image"
                    />
                  ))}
                </div>

                {productDetailsData?.image_urls ? (
                  <ImageSlider images={productDetailsData.image_urls} />
                ) : (
                  <img
                    src={
                      productDetailsData?.image_urls?.[0].local_url ??
                      saleko_green
                    }
                    className="product_details_big_image"
                  />
                )}
              </div>

              {/* right product description container */}
              <div className="product_description_right_container">
                <div className="store_name_container">
                  <div className="store_name_flex">
                    <StoreIconGreen width="20" height="18" />
                    <p>{productDetailsData?.seller.shop_title}</p>
                  </div>

                  <div className="icon_container">
                    <div className="icon_background">
                      {favouriteClicked ? (
                        <BsHeartFill
                          color="#084c3f"
                          size={17}
                          onClick={handleDeleteFromWishlist}
                        />
                      ) : (
                        <BsHeart
                          color="#084c3f"
                          size={17}
                          onClick={handleAddToWishlist}
                        />
                      )}{" "}
                    </div>
                    <div
                      className="icon_background"
                      onClick={() => setOpenSocialModal(true)}
                    >
                      <BsShare color="#084C3F" />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="product_details_name">
                    {productDetailsData?.name}
                  </p>
                </div>

                <div style={{ marginBottom: "5px" }}>
                  <Rating readonly initialValue={3} size={12} />
                  {"   "}
                  <span className="verified_reviews_text">
                    (24 verified reviews)
                  </span>
                </div>

                <div className="product_brand_category_container">
                  <div className="product_brand_wrapper">
                    <span>Brand:</span>
                    <span>{productDetailsData?.brand_name}</span>
                  </div>

                  <hr className="product_brand_mini_divider" />

                  <div className="product_brand_wrapper">
                    <span>Category:</span>
                    <span>{productDetailsData?.category_name}</span>
                  </div>

                  <hr className="product_brand_mini_divider" />

                  <div className="product_brand_wrapper">
                    <span>In Stock:</span>
                    <span>{productDetailsData?.qty} UNITS LEFT</span>
                  </div>

                  <hr className="product_brand_mini_divider" />

                  <div className="product_brand_wrapper">
                    <span>SKU:</span>
                    <span>{productDetailsData?.sku}</span>
                  </div>
                </div>

                <hr className="product_details_divider" />

                {/* Price container */}
                <div className="product_details_price_main_wrapper">
                  {productDetailsData?.special_price != "0.0000" ? (
                    <div className="product_details_price_container">
                      <p
                        className={`product_details_price_figure ${
                          productDetailsData?.special_price ? "price_red" : ""
                        }`}
                      >
                        ₦
                        {formatPrice(
                          Number(productDetailsData?.special_price) || 0
                        )}
                      </p>
                      {productDetailsData?.price && (
                        <p className="product_details_former_price">
                          ₦{formatPrice(Number(productDetailsData?.price) || 0)}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="product_details_price_container">
                      <p className={"product_details_price_figure"}>
                        ₦{formatPrice(Number(productDetailsData?.price) || 0)}
                      </p>
                    </div>
                  )}

                  {(productDetailsData?.percentage_discount ?? 0) > 0 && (
                    <div className="product_price_percentage_container">
                      <span className="product_price_percentage_off">
                        {Math.ceil(
                          productDetailsData?.percentage_discount ?? 0
                        )}
                        % off
                      </span>
                      {productDetailsData?.special_price_to && (
                        <span>
                          Offer ends{" "}
                          {formatDateToMonthDay(
                            productDetailsData?.special_price_to
                          )}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <hr className="product_details_divider" />

                {/* Variant */}
                {productDetailsData?.variants &&
                  productDetailsData?.variants?.length > 0 && (
                    <div>
                      {/* Choose Color */}
                      {productDetailsData.variants.some(
                        // to check if there is color attribute in the variants
                        (variant) => variant.color
                      ) && (
                        <>
                          <div className="choose_color_section">
                            <p>Choose a Color</p>

                            <div className="choose_color_container">
                              {Array.from(
                                new Set( // to avoid duplicates using set
                                  productDetailsData.variants.map(
                                    (variant) => variant.color
                                  )
                                )
                              )
                                .filter((color) => color) // remove undefined/null sizes
                                .map((color, index) => (
                                  <div
                                    className={`choose_color_item ${
                                      selectedColor == color
                                        ? "selectedItem"
                                        : ""
                                    }`}
                                    key={index}
                                    onClick={() => handleChooseColor(color)}
                                  >
                                    <input
                                      type="radio"
                                      id={color}
                                      name="color"
                                      value={color}
                                      checked={selectedColor == color}
                                      onChange={() => handleChooseColor(color)}
                                    />
                                    <p>{color}</p>
                                  </div>
                                ))}
                            </div>
                          </div>

                          <hr className="product_details_divider" />
                        </>
                      )}

                      {/* Choose Size */}
                      {productDetailsData.variants.some(
                        (variant) => variant.size
                      ) && (
                        <div className="choose_color_section">
                          <p>Choose a Size</p>

                          <div className="choose_color_container">
                            {Array.from(
                              new Set( // to avoid duplicates using set
                                productDetailsData.variants.map(
                                  (variant) => variant.size
                                )
                              )
                            )
                              .filter((size) => size) // remove undefined/null sizes
                              .map((size, index) => (
                                <div
                                  className={`choose_color_item ${
                                    selectedSize === size ? "selectedItem" : ""
                                  }`}
                                  key={index}
                                  onClick={() => handleChooseSize(size)}
                                >
                                  <input
                                    type="radio"
                                    name="size"
                                    value={size}
                                    checked={selectedSize === size}
                                    onChange={() => handleChooseSize(size)}
                                  />
                                  <p>{size}</p>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                <div
                  style={{
                    height: "32px",
                  }}
                />

                {/* count and add to cart container */}
                <div className="count_container">
                  <div className="count_increase_decrease_container">
                    <div onClick={countDecrement} className="counter_operator">
                      -
                    </div>
                    <div className="counter_value">{count}</div>
                    <div onClick={countIncrement} className="counter_operator">
                      +
                    </div>
                  </div>

                  {addToCartloader ? (
                    <CustomButton
                      label=""
                      width={"100%"}
                      height="55px"
                      bgColor="#084c3f"
                      borderColor="#DFDFDF"
                      borderWidth="1px"
                      textColor="white"
                      fontSize={14}
                      fontWeight={600}
                      icon={
                        <TailSpin
                          visible={true}
                          height={"25"}
                          width={"25"}
                          color={"#ffffff"}
                          ariaLabel="tail-spin-loading"
                          radius="2"
                          strokeWidth={"3"}
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      }
                      onClick={handleAddToCart}
                    />
                  ) : (
                    <CustomButton
                      label="Add To Cart"
                      width={"100%"}
                      height="55px"
                      bgColor="#084c3f"
                      borderColor="#DFDFDF"
                      borderWidth="1px"
                      textColor="white"
                      fontSize={14}
                      fontWeight={600}
                      icon={<BsFillCartFill color="white" size={19} />}
                      onClick={handleAddToCart}
                    />
                  )}
                </div>

                {state == "Negotiable Products" && (
                  <div style={{ marginTop: "20px" }}>
                    <CustomButton
                      label="Negotiate"
                      width={"100%"}
                      height="55px"
                      bgColor="white"
                      borderColor="#084c3f"
                      borderWidth="1px"
                      textColor="#084c3f"
                      fontSize={14}
                      fontWeight={600}
                      icon={<NegotiateIcon />}
                      onClick={() => setOpenNegotiationModal(true)}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Description and Reviews Tabs */}
            <div>
              <div className="description_nav">
                <p
                  className={`description_nav_item ${
                    activeTab === "description" ? "active_nav_item" : ""
                  }`}
                  onClick={() => handleActiveState("description")}
                >
                  Description
                </p>
                <p
                  className={`description_nav_item ${
                    activeTab === "reviews" ? "active_nav_item" : ""
                  }`}
                  onClick={() => handleActiveState("reviews")}
                >
                  Reviews
                </p>
              </div>

              <div>
                {/* Tab: Description */}
                {activeTab === "description" && (
                  <div style={{ marginTop: "30px" }}>
                    <h3 className="product_description_header">
                      Product Description
                    </h3>

                    <p
                      className="product_description_text"
                      dangerouslySetInnerHTML={{
                        __html: productDetailsData?.description || "",
                      }}
                    ></p>

                    {/* <h3 className="product_description_header">Features</h3>
                      {features.map((feature, index) => (
                        <div className="feature_row">
                          <img src={check_ic} />
                          <p className="product_description_text">
                            {feature.feature}
                          </p>
                        </div>
                      ))} */}
                  </div>
                )}

                {/* Tab: Reviews */}
                {activeTab === "reviews" && (
                  <div>
                    <div className="customer_reviews_container">
                      <h2>Verified Customer Reviews</h2>

                      <div className="customer_reviews_breakdown_container">
                        <div className="customer_reviews_left_side">
                          <p className="customer_reviews_rating">3/5</p>
                          <Rating readonly initialValue={3} size={30} />
                          <p className="customer_verified_reviews">
                            (24 verified reviews)
                          </p>
                        </div>

                        <hr className="customer_reviews_vertical_divider" />

                        <hr className="customer_reviews_horizontal_divider" />

                        <div>
                          {ratingReview
                            .slice() // creates a copy of the ratingReview array
                            .reverse() // order of the array
                            .sort((a, b) => b - a) // Sort rating in descending order
                            .map((rating, index) => (
                              <div
                                key={index}
                                className="customer_rating_review_item"
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

              <div>
                {categoryLoader ? (
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
                  <>
                    <ProductSection
                      name={"Explore"}
                      data={fetchedCategoryData}
                      type="related"
                      nameContainer
                      viewAll
                    />

                    {numberOfDisplayedProducts < totalFetchedCategoryData && (
                      <button
                        className="view_more_buton"
                        onClick={handleMoreButton}
                      >
                        View More
                        {viewMoreLoader ? (
                          <TailSpin
                            visible={true}
                            height={"20"}
                            width={"20"}
                            color={"white"}
                            ariaLabel="tail-spin-loading"
                            radius="2"
                            wrapperStyle={{}}
                            wrapperClass=""
                            strokeWidth={2} // Adjust thickness
                          />
                        ) : (
                          <BsChevronDown size={12} color={"white"} />
                        )}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </PageWrapper>

      <NegotiationModal
        isOpen={openNegotiationModal}
        closeModal={() => setOpenNegotiationModal(false)}
        item={productDetailsData}
      />

      <SocialShareModal
        isOpen={openSocialModal}
        closeModal={() => setOpenSocialModal(false)}
      />
    </>
  );
};

export default ProductDetails;
