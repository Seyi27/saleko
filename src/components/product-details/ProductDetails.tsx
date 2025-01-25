import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import NavHeader from "../nav-header/NavHeader";
import NavHeaderSearch from "../nav-header-search/NavHeaderSearch";
import NavCategories from "../nav-categories/NavCategories";
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
import { Product } from "../../types/types";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { check_ic, img1 } from "../../assets/images";
import StoreIconGreen from "../../assets/images/svg/StoreIconGreen";
import { Rating } from "react-simple-star-rating";
import Footer from "../footer/Footer";
import ProductSection from "../product-section/ProductSection";
import CustomButton from "../custom-button/CustomButton";
import CustomProgressBar from "../custom-progress-bar/CustomProgressBar";
import { BiCart } from "react-icons/bi";
import ImageSlider from "../image-slider/ImageSlider";
import CustomModal from "../custom-modal/CustomModal";
import NegotiationModal from "../negotiation-modal/NegotiationModal";

const ProductDetails = () => {
  const [productDetailsData, setProductDetailsData] = useState<Product>();
  const [activeTab, setActiveTab] = useState("description");
  const [visibleRows, setVisibleRows] = useState(2);
  const [rowData, setRowData] = useState<Product[][]>([]);
  const { productId } = useParams();

  const [favouriteClicked, setFavouriteClicked] = useState(false);
  const [count, setCount] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const [openNegotiationModal, setOpenNegotiationModal] = useState(false);

  const { state } = useLocation();

  const handleActiveState = (name: string) => {
    setActiveTab(name);
  };

  const countIncrement = () => {
    setCount(count + 1);
  };

  const countDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const filterProduct = () => {
    const filteredProducts = productData.find(
      (item) => item.id.toString() === productId
    );
    setProductDetailsData(filteredProducts);
  };

  const handleMoreButton = () => {
    setVisibleRows((prev) => prev + 1);
  };

  const chooseColor = ["Red", "Green", "Yellow", "Purple"];

  const chooseSize = ["Small", "Medium", "Large", "Extra Large", "XXL"];

  const ratingReview = [17, 4, 1, 2, 0];

  const handleChooseColor = (color: string) => {
    setSelectedColor(color);
  };

  const handleChooseSize = (size: string) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    filterProduct();
  }, [productId]);

  return (
    <>
      <div>
        <NavHeader />

        <NavHeaderSearch />

        <NavCategories />

        <div className="body_container">
          <div className="body_second_container">
            <div className="product_details_container">
              <div className="breadcrumbs_container">
                <Link to={""} className="inactive_link">
                  Home
                </Link>
                <BsChevronRight color="#A3A9C2" size={13} />
                <Link to={""} className="inactive_link">
                  {productDetailsData?.category}
                </Link>
                <BsChevronRight color="#A3A9C2" size={13} />

                <Link to={""} className="inactive_link">
                  {productDetailsData?.subCategory[0]}
                </Link>
                <BsChevronRight color="#A3A9C2" size={13} />

                <Link to={""} className="active_link">
                  {productDetailsData?.name}
                </Link>
              </div>

              <div className="product_image_description_container">
                {/* left image container */}
                <div className="product_image_left_container">
                  <div className="product_details_image_column">
                    {productDetailsData?.image.map((img, index) => (
                      <img src={img} className="product_details_image" />
                    ))}
                  </div>

                  {productDetailsData?.image ? (
                    <ImageSlider images={productDetailsData?.image} />
                  ) : (
                    <img
                      src={productDetailsData?.image[0]}
                      className="product_details_big_image"
                    />
                  )}
                </div>

                {/* right product description container */}
                <div className="product_description_right_container">
                  <div className="store_name_container">
                    <div className="store_name_flex">
                      <StoreIconGreen width="20" height="18" />
                      <p>Store name</p>
                    </div>

                    <div className="icon_container">
                      <div
                        className="icon_background"
                        onClick={() => setFavouriteClicked(!favouriteClicked)}
                      >
                        {favouriteClicked ? (
                          <BsHeartFill color="#084c3f" size={17} />
                        ) : (
                          <BsHeart color="#084c3f" size={17} />
                        )}{" "}
                      </div>
                      <div className="icon_background">
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
                    <Rating
                      readonly
                      initialValue={productDetailsData?.rating}
                      size={12}
                    />
                    {"   "}
                    <span className="verified_reviews_text">
                      (24 verified reviews)
                    </span>
                  </div>

                  <div className="product_brand_category_container">
                    <div>
                      <span>Brand:</span>
                      <span> Chanel</span>
                    </div>

                    <hr
                      style={{
                        border: "0.8px solid #084C3F",
                        height: "12px",
                        margin: 0,
                      }}
                    />

                    <div>
                      <span>Category:</span>
                      <span> Fashion</span>
                    </div>

                    <hr
                      style={{
                        border: "0.8px solid #084C3F",
                        height: "12px",
                        margin: 0,
                      }}
                    />

                    <div>
                      <span>In Stock:</span>
                      <span> 206 UNITS LEFT</span>
                    </div>

                    <hr
                      style={{
                        border: "0.8px solid #084C3F",
                        height: "12px",
                        margin: 0,
                      }}
                    />
                    <div>
                      <span>SKU:</span>
                      <span> ifwx</span>
                    </div>
                  </div>

                  <hr
                    style={{
                      border: "1px solid #E4E4E4",
                      width: "100%",
                      marginTop: "15px",
                      marginBottom: "15px",
                    }}
                  />

                  {/* Price container */}
                  <div className="product_details_price_container">
                    <div className="product_details_price">
                      <p
                        className={`product_details_price_figure ${
                          productDetailsData?.former_price ? "price_red" : ""
                        }`}
                      >
                        ₦{productDetailsData?.price}
                      </p>
                      {productDetailsData?.former_price && (
                        <p className="product_details_former_price">
                          ₦{productDetailsData?.former_price}
                        </p>
                      )}
                    </div>
                    {productDetailsData?.former_price && (
                      <div className="product_price_percentage_container">
                        <span className="product_price_percentage_off">
                          10% off
                        </span>
                        <span>Offer ends April, 27</span>
                      </div>
                    )}
                  </div>

                  <hr
                    style={{
                      border: "1px solid #E4E4E4",
                      width: "100%",
                      marginTop: "15px",
                      marginBottom: "15px",
                    }}
                  />

                  {/* Choose Color */}
                  <div className="choose_color_section">
                    <p>Choose a Color</p>

                    <div className="choose_color_container">
                      {chooseColor.map((color, index) => (
                        <div
                          className={`choose_color_item ${
                            selectedColor == color ? "selectedItem" : ""
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

                  <hr
                    style={{
                      border: "1px solid #E4E4E4",
                      width: "100%",
                      marginTop: "15px",
                      marginBottom: "15px",
                    }}
                  />

                  {/* Choose Size */}
                  <div className="choose_color_section">
                    <p>Choose a Size</p>

                    <div className="choose_color_container">
                      {chooseSize.map((size, index) => (
                        <div
                          className={`choose_color_item ${
                            selectedSize == size ? "selectedItem" : ""
                          }`}
                          key={index}
                          onClick={() => handleChooseSize(size)}
                        >
                          <input
                            type="radio"
                            name="size"
                            value={size}
                            checked={selectedSize == size}
                            onChange={() => handleChooseSize(size)}
                          />
                          <p>{size}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      height: "32px",
                    }}
                  />

                  {/* add to Cart container */}
                  <div className="count_container">
                    <div className="count_increase_decrease_container">
                      <div
                        onClick={countDecrement}
                        style={{ cursor: "pointer" }}
                      >
                        -
                      </div>
                      <div className="count_container">{count}</div>
                      <div
                        onClick={countIncrement}
                        style={{ cursor: "pointer" }}
                      >
                        +
                      </div>
                    </div>
                    <CustomButton
                      label="Add To Cart"
                      width={"350px"}
                      height="55px"
                      bgColor="#084c3f"
                      borderColor="#DFDFDF"
                      borderWidth="1px"
                      textColor="white"
                      fontSize={14}
                      fontWeight={600}
                      icon={<BsFillCartFill color="white" size={19} />}
                    />
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
                        onClick={() => setOpenNegotiationModal(true)}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Description, Delivery Details and Reviews Tabs */}
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
                      activeTab === "delivery" ? "active_nav_item" : ""
                    }`}
                    onClick={() => handleActiveState("delivery")}
                  >
                    Delivery Details
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

                      <p className="product_description_text">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Vel eaque totam quo omnis iusto et, cum iure
                        tempore ratione, molestias enim, nulla facilis quia?
                        Ipsa in quos deleniti rerum laudantium. Lorem ipsum
                        dolor sit amet consectetur adipisicing elit. Enim neque
                        placeat at delectus nulla quae qui, repudiandae,
                        voluptate ullam fuga vero excepturi nemo aspernatur
                        dolorem corporis totam veniam. Voluptatum, temporibus.
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Sed ipsam possimus neque. Numquam ab deleniti
                        voluptate aperiam magnam ut dolorum eos. Cumque laborum
                        assumenda corporis. Quidem accusantium veniam voluptate
                        est!
                      </p>

                      <h3 className="product_description_header">Features</h3>
                      {features.map((feature, index) => (
                        <div className="feature_row">
                          <img src={check_ic} />
                          <p className="product_description_text">
                            {feature.feature}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tab: Delivery */}
                  {activeTab === "delivery" && <></>}

                  {/* Tab: Reviews */}
                  {activeTab === "reviews" && (
                    <div>
                      <div className="customer_reviews_container">
                        <h2>Verified Customer Reviews</h2>

                        <div className="customer_reviews_breakdown_container">
                          <div className="customer_reviews_left_side">
                            <p className="customer_reviews_rating">
                              {productDetailsData?.rating}/5
                            </p>
                            <Rating
                              readonly
                              initialValue={productDetailsData?.rating}
                              size={30}
                            />
                            <p className="customer_verified_reviews">
                              (24 verified reviews)
                            </p>
                          </div>

                          <hr
                            style={{
                              border: "0.8px solid #e5e7eb",
                              height: "100px",
                            }}
                          />

                          <div>
                            {ratingReview
                              .slice() // creates a copy of the ratingReview array
                              .reverse() // order of the array
                              .sort((a, b) => b - a) // Sort rating in descending order
                              .map((rating, index) => (
                                <div
                                  key={index}
                                  className="rating_review_container"
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
                          <div className="customer_review_message">
                            <h3>Title: {review.title}</h3>
                            <Rating
                              readonly
                              initialValue={review.rating}
                              size={22}
                            />
                            <p>{review.review}</p>
                            <div>
                              <span>{review.date} - </span>
                              <span>by {review.person}</span>
                            </div>

                            <hr
                              style={{
                                border: "0.5px solid #e5e7eb",
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <ProductSection
                    name={"Explore"}
                    data={productData}
                    type="related"
                    visibleRows={visibleRows}
                    setRowData={setRowData}
                  />

                  {visibleRows < rowData.length && (
                    <button
                      className="view_more_buton"
                      onClick={handleMoreButton}
                    >
                      View More
                      <BsChevronDown size={12} color={"white"} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>

      <NegotiationModal
        isOpen={openNegotiationModal}
        closeModal={() => setOpenNegotiationModal(false)}
        item={productDetailsData}
      />
    </>
  );
};

export default ProductDetails;
