import React, { useState } from "react";
import "./BestSellerCard.css";
import { ProductCardProp } from "../../types/types";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { Rating } from "react-simple-star-rating";
import { BiCartAdd } from "react-icons/bi";
import CountdownTimer from "../count-down-timer/CountdownTimer";
import { useNavigate } from "react-router-dom";
import { BestSellerProp } from "../../types/productTypes";
import saleko_green from "../../assets/images/svg/saleko_green.svg";
import { useAddGuestCartMutation, useAddToCartApiMutation } from "../../services/cartsApi";
import { showCustomToast } from "../custom-toast/CustomToast";
import { TailSpin } from "react-loader-spinner";
import { formatPrice } from "../../helpers/helper";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../slice/cartSlice";
import { getOrCreateGuestId } from "../../helpers/getOrCreateGuestId";
import { RootState } from "../../store/store";

const BestSellerCard = ({ item }: BestSellerProp) => {
  // const [rating, setRating] = useState(item.rating);
  const [favouriteClicked, setFavouriteClicked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addToCartApi, { isLoading: addToCartloader }] =
    useAddToCartApiMutation();
  const [addToGuestCartApi, { isLoading: addToGuestCartloader }] =
    useAddGuestCartMutation();

  const user = useSelector((state: RootState) => state.userDetails.user);

  const handleItemClick = () => {
    navigate(`/product/${item.sku}`);
  };

  const handleAddToCart = async () => {
    try {
      const guestId = getOrCreateGuestId();

      const addToCartBody = {
        products: [
          {
            sku: item.sku,
            quantity: 1, // 1 because there is no quantity ui for the product card on the home page
          },
        ],
      };

      const addToGuestCartBody = {
        products: [
          {
            sku: item.sku,
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
    <>
      <div className="best_seller_card_container">
        <div className="best_seller_image_card">
          <div onClick={handleItemClick}>
            <img
              src={item.image_urls[0].local_url ?? saleko_green}
              className="best_seller_image"
            />
          </div>
          <span className="best_seller_percentage_off">
            {Math.ceil(item.percentage_discount ?? 0)}% off
          </span>

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
            {/* <div className="best_seller_rating_container">
              <Rating readonly initialValue={rating} size={12} />
              <span>{item.rating}</span>
            </div> */}
            <div className="best_seller_price_container">
              <span
                className={`best_seller_price ${
                  item.special_price && "best_seller_price_red"
                }`}
              >
                ₦{formatPrice(Number(item.special_price) || 0)}
              </span>
              {item.special_price && (
                <span className="best_seller_former_price">
                  ₦{formatPrice(Number(item.price) || 0)}
                </span>
              )}
            </div>
          </div>

          <button className="best_seller_button" onClick={handleAddToCart}>
            Add to cart
            {addToCartloader || addToGuestCartloader ? (
              <TailSpin
                visible={true}
                height={"23"}
                width={"23"}
                color={"#ffffff"}
                ariaLabel="tail-spin-loading"
                radius="2"
                wrapperStyle={{}}
                strokeWidth={3}
                wrapperClass="product_button_cart_icon"
              />
            ) : (
              <BiCartAdd className="best_seller_button_cart_icon" size={19} />
            )}
          </button>
        </div>
      </div>

      {item.promo_count_down && (
        <CountdownTimer dateTo={item.special_price_to} />
      )}

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
