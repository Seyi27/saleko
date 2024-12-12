import React, { useState } from "react";
import "./BestSellerSection.css";
import { BestSellerSectionProps, ProductSectionProps } from "../../types/types";
import BestSellerCard from "../best-seller-card/BestSellerCard";
import { BsArrowRight, BsHeart, BsHeartFill } from "react-icons/bs";
import { Rating } from "react-simple-star-rating";
import { BiCartAdd } from "react-icons/bi";

const BestSellerSection = ({ name, data }: BestSellerSectionProps) => {
  const displayBestSellerData = data.slice(0, 7); // Limit to the first 6 products

  const firstColumnData = displayBestSellerData.slice(0, 3); // Limit to the first 3 products
  const secondColumnData = displayBestSellerData[3]; // the fourth product
  const thirdColumnData = displayBestSellerData.slice(4); // Limit to the last 4 products

  const [rating, setRating] = useState(secondColumnData.rating);
  const [favouriteClicked, setFavouriteClicked] = useState(false);

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
        <div className="best_seller_section_first_row">
          {firstColumnData.map((item, index) => (
            <div key={index}>
              <BestSellerCard item={item} />
            </div>
          ))}
        </div>

        <div className="best_seller_section_second_row">
          <div className="best_seller_second_row_image_card">
            <img
              src={secondColumnData.image}
              className="best_seller_second_row_image"
            />

            <span className="best_seller_second_row_percentage_off">
              10% off
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
              {secondColumnData.name}
            </p>
            <div className="best_seller_second_row_rating_container">
              <Rating readonly initialValue={rating} size={12} />
              <span>{secondColumnData.rating}</span>
            </div>
            <div className="best_seller_second_row_price_container">
              <span className={`best_seller_second_row_price ${secondColumnData.former_price && "best_seller_second_row_price_red"}`}>
                ₦{secondColumnData.price}
              </span>
              <span className="best_seller_second_row_former_price">₦{secondColumnData.former_price}</span>
            </div>
            <div className="best_seller_second_row_description_container">
              <span className="best_seller_second_row_description">
                {secondColumnData.description}
              </span>
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

          <button className="best_seller_second_row_button">
            <BiCartAdd color="white" size={19} />
            Add to cart
          </button>
        </div>

        <div className="best_seller_section_third_row">
          {thirdColumnData.map((item, index) => (
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
