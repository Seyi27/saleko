import React, { useState } from "react";
import "./ProductCard.css";
import { ProductCardProp } from "../../types/types";
import { BsFillHeartFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { Rating } from "react-simple-star-rating";
import CustomButton from "../custom-button/CustomButton";
import { BiCartAdd } from "react-icons/bi";
import NegotiateIcon from "../../assets/images/svg/NegotiateIcon";

const ProductCard = ({ name, item }: ProductCardProp) => {
  const [rating, setRating] = useState(item.rating);
  const [favouriteClicked, setFavouriteClicked] = useState(false);

  return (
    <div>
      <div className="image_card">
        <img src={item.image} className="image" />

        {item.former_price ? (
          <span className="percentage_off">10% off</span>
        ) : (
          <span className="new_container">New</span>
        )}

        <div className="favorite_icon">
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
          )}{" "}
        </div>
      </div>

      <div>
        <p className="product_name">{item.name}</p>
        <div className="rating_container">
          <Rating readonly initialValue={rating} size={12} />
          <span>{item.rating}</span>
        </div>
        <div className="product_price_container">
          <span
            className={`product_price ${
              item.former_price && "product_price_red"
            }`}
          >
            ₦{item.price}
          </span>
          {item.former_price && (
            <span className="product_former_price">₦{item.former_price}</span>
          )}
        </div>
      </div>

      {name == "Negotiable Products" ? (
        <button className="product_button">
          Negotiate
          <NegotiateIcon />
        </button>
      ) : (
        <button className="product_button">
          Add to cart
          <BiCartAdd className="product_button_cart_icon" size={19} />
        </button>
      )}
    </div>
  );
};

export default ProductCard;
