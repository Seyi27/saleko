import React, { useState } from "react";
import "./BestSellerSection.css";
import { ProductSectionProps } from "../../types/types";
import BestSellerCard from "../best-seller-card/BestSellerCard";
import { BsArrowRight, BsHeart, BsHeartFill } from "react-icons/bs";
import { Rating } from "react-simple-star-rating";
import { BiCartAdd } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../helpers/helper";
import { BestSellerSectionProps } from "../../types/productTypes";
import saleko_green from "../../assets/images/svg/saleko_green.svg";
import {
  useAddGuestCartMutation,
  useAddToCartApiMutation,
} from "../../services/cartsApi";
import { showCustomToast } from "../custom-toast/CustomToast";
import { TailSpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../slice/cartSlice";
import BestSellerSectionSkeleton from "../best-seller-section-skeleton/BestSellerSectionSkeleton";
import { getOrCreateGuestId } from "../../helpers/getOrCreateGuestId";
import { RootState } from "../../store/store";

const BestSellerSection = ({
  name,
  data,
  sectionLoader,
}: BestSellerSectionProps) => {
  const displayBestSellerData = data?.slice(0, 7); // to check if data is an array and Limit to the first 6 products

  const firstColumnData = displayBestSellerData?.slice(0, 3); // Limit to the first 3 products
  const secondColumnData = displayBestSellerData?.[3]; // the fourth product
  const thirdColumnData = displayBestSellerData?.slice(4); // Limit to the last 4 products

  // const [rating, setRating] = useState(secondColumnData.rating);
  const [favouriteClicked, setFavouriteClicked] = useState(false);

  const [addToCartApi, { isLoading: addToCartloader }] =
    useAddToCartApiMutation();
  const [addToGuestCartApi, { isLoading: addToGuestCartloader }] =
    useAddGuestCartMutation();

  const user = useSelector((state: RootState) => state.userDetails.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (sectionLoader) {
    return <BestSellerSectionSkeleton />;
  }

  const handleItemClick = (sku: string | undefined) => {
    navigate(`/product/${sku}`);
  };

  const truncateWords = (text: string, wordLimit: number): string => {
    const div = document.createElement("div");
    div.innerHTML = text; // Strip HTML tags if needed
    const plainText = div.textContent || div.innerText || "";

    const words = plainText.trim().split(/\s+/);
    if (words.length <= wordLimit) return text;

    return words.slice(0, wordLimit).join(" ") + "...";
  };

  // for second column data
  const handleAddToCart = async () => {
    try {
      const guestId = getOrCreateGuestId();

      const addToCartBody = {
        products: [
          {
            sku: secondColumnData?.sku,
            quantity: 1, // 1 because there is no quantity ui for the product card on the home page
          },
        ],
      };

      const addToGuestCartBody = {
        products: [
          {
            sku: secondColumnData?.sku,
            quantity: 1, // 1 because there is no quantity ui for the product card on the home page
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
      }
    } catch (error) {
      showCustomToast({
        message: "Error! Please check your network connection and try again..",
        type: "error",
      });
    }
  };

  return (
    <div className="best_seller_section_container">
      <div className="best_seller_name_container">
        <span>{name}</span>

        <div className="best_seller_view_container">
          <span>View All</span>
          <BsArrowRight size={12} />
        </div>
      </div>

      <hr style={{ border: "0.5px solid #e5e7eb" }} />

      <div className="best_seller_section_row">
        {/* First Column */}
        <div className="best_seller_section_first_row">
          {firstColumnData?.map((item, index) => (
            <div key={index}>
              <BestSellerCard item={item} />
            </div>
          ))}
        </div>

        {/* Second Column */}
        <div className="best_seller_section_second_row">
          <div className="best_seller_second_row_image_card">
            <img
              src={secondColumnData?.image_urls[0].local_url ?? saleko_green}
              className="best_seller_second_row_image"
              onClick={() => handleItemClick(secondColumnData?.sku)}
            />

            <span className="best_seller_second_row_percentage_off">
              {Math.ceil(secondColumnData?.percentage_discount ?? 0)}% off
            </span>

            <div className="best_seller_second_row_favorite_icon">
              {favouriteClicked ? (
                <BsHeartFill
                  color="#084c3f"
                  size={29}
                  onClick={() => setFavouriteClicked(!favouriteClicked)}
                />
              ) : (
                <BsHeart
                  color="#084c3f"
                  size={29}
                  onClick={() => setFavouriteClicked(!favouriteClicked)}
                />
              )}{" "}
            </div>
          </div>

          <div>
            <p className="best_seller_second_row_product_name">
              {secondColumnData?.name}
            </p>
            {/* <div className="best_seller_second_row_rating_container">
              <Rating readonly initialValue={rating} size={12} />
              <span>{secondColumnData.rating}</span>
            </div> */}
            <div className="best_seller_second_row_price_container">
              <span
                className={`best_seller_second_row_price ${
                  secondColumnData?.special_price &&
                  "best_seller_second_row_price_red"
                }`}
              >
                ₦{formatPrice(Number(secondColumnData?.special_price) || 0)}
              </span>
              <span className="best_seller_second_row_former_price">
                ₦{formatPrice(Number(secondColumnData?.price) || 0)}
              </span>
            </div>
            <div className="best_seller_second_row_description_container">
              <span
                className="best_seller_second_row_description"
                dangerouslySetInnerHTML={{
                  __html: truncateWords(
                    secondColumnData?.description || "",
                    20
                  ),
                }}
              ></span>
            </div>

            <hr
              style={{
                border: "0.5px solid #e5e7eb",
                width: "100%",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            />

            <div className="best_seller_second_row_product_runout">
              <span>This product is about to run out</span>
              <div className="best_seller_linear_gradient"></div>
              <span>
                available only:{" "}
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "black",
                  }}
                >
                  38
                </span>
              </span>
            </div>
          </div>

          <button
            className="best_seller_second_row_button"
            onClick={handleAddToCart}
          >
            {addToCartloader || addToGuestCartloader ? (
              <TailSpin
                visible={true}
                height={"20"}
                width={"20"}
                color={"#ffffff"}
                ariaLabel="tail-spin-loading"
                radius="2"
                wrapperStyle={{}}
                strokeWidth={3}
                wrapperClass="product_button_cart_icon"
              />
            ) : (
              <BiCartAdd color="white" size={19} />
            )}
            Add to cart
          </button>
        </div>

        {/* Third Column */}
        <div className="best_seller_section_third_row">
          {thirdColumnData?.map((item, index) => (
            <div key={index}>
              <BestSellerCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSellerSection;
