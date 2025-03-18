import React, { useState } from "react";
import "./BestSellerCard.css";
import { BestSellerProp, ProductCardProp } from "../../types/types";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { Rating } from "react-simple-star-rating";
import { BiCartAdd } from "react-icons/bi";
import CountdownTimer from "../count-down-timer/CountdownTimer";
import { useNavigate } from "react-router-dom";

const BestSellerCard = ({ item }: BestSellerProp) => {
  const [rating, setRating] = useState(item.rating);
  const [favouriteClicked, setFavouriteClicked] = useState(false);
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/product/${item.id}`);
  };

  return (
    <>
      <div className="best_seller_card_container">
        <div className="best_seller_image_card">
          <div onClick={handleItemClick}>
            <img src={item.image} className="best_seller_image" />
          </div>
          <span className="best_seller_percentage_off">10% off</span>

          <div className="best_seller_favorite_icon">
            {favouriteClicked ? (
              <BsHeartFill
                color="#084c3f"
                size={17}
                onClick={() => setFavouriteClicked(!favouriteClicked)}
              />
            ) : (
              <BsHeart
                color="#084c3f"
                size={17}
                onClick={() => setFavouriteClicked(!favouriteClicked)}
              />
            )}
          </div>
        </div>

        <div className="best_seller_product_details">
          <div>
            <p className="best_seller_product_name">{item.name}</p>
            <div className="best_seller_rating_container">
              <Rating readonly initialValue={rating} size={12} />
              <span>{item.rating}</span>
            </div>
            <div className="best_seller_price_container">
              <span
                className={`best_seller_price ${
                  item.former_price && "best_seller_price_red"
                }`}
              >
                ₦{item.price}
              </span>
              <span className="best_seller_former_price">
                ₦{item.former_price}
              </span>
            </div>
          </div>

          <button className="best_seller_button">
            Add to cart
            <BiCartAdd className="best_seller_button_cart_icon" size={19} />
          </button>
        </div>
      </div>

      <CountdownTimer targetDate={item.targetDate} />

      <hr
        style={{
          border: "0.5px solid #e5e7eb",
          width: "100%",
        }}
      />
    </>
  );
};

export default BestSellerCard;
