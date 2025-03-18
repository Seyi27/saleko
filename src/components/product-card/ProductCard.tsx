import React, { useState } from "react";
import "./ProductCard.css";
import { ProductCardProp } from "../../types/types";
import { BsFillHeartFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { Rating } from "react-simple-star-rating";
import CustomButton from "../custom-button/CustomButton";
import { BiCartAdd } from "react-icons/bi";
import NegotiateIcon from "../../assets/images/svg/NegotiateIcon";
import { Link, useNavigate } from "react-router-dom";
import NegotiationModal from "../negotiation-modal/NegotiationModal";
import { formatPrice } from "../../helpers/helper";
import no_image from '../../assets/images/all_Images/no_image.png'
import saleko_green from "../../assets/images/svg/saleko_green.svg";

const ProductCard = ({ name, item }: ProductCardProp) => {
  const [rating, setRating] = useState(3);
  const [favouriteClicked, setFavouriteClicked] = useState(false);

  const [openNegotiationModal, setOpenNegotiationModal] = useState(false);

  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/product/${item.id}`, { state: name });
  };

  return (
    <>
      <div className="product_card_main_container">
        <div className="image_card">
          <div onClick={handleItemClick} className="product_link">
            <img
              src={item.productImages?.length ? item.productImages[0].medium_image_url : saleko_green}
              className="product_image"
            />
          </div>

          {/* {item.former_price ? (
            <span className="percentage_off">10% off</span>
          ) : (
            <span className="new_container">New</span>
          )} */}

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

        <Link to={`product/${item.id}`} className="product_link">
          <div>
            <p className="product_name">{item.name}</p>
            <div className="rating_container">
              <Rating readonly initialValue={rating} size={12} />
              <span>3</span> {/* rating */}
            </div>
            <div className="product_price_container">
              <span
                // className={`product_price ${
                //   item.former_price && "product_price_red"
                // }`}
                className="product_price"
              >
                ₦{formatPrice(item.price)}
              </span>
              {/* {item.former_price && (
                <span className="product_former_price">
                  ₦{item.former_price}
                </span>
              )} */}
            </div>
          </div>
        </Link>

        {name == "Negotiable Products" ? (
          <button
            className="product_button"
            onClick={() => setOpenNegotiationModal(true)}
          >
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

      <NegotiationModal
        isOpen={openNegotiationModal}
        closeModal={() => setOpenNegotiationModal(false)}
        item={item}
      />
    </>
  );
};

export default ProductCard;
