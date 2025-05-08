import React, { useEffect, useState } from "react";
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
import no_image from "../../assets/images/all_Images/no_image.png";
import saleko_green from "../../assets/images/svg/saleko_green.svg";
import { showCustomToast } from "../custom-toast/CustomToast";
import { TailSpin } from "react-loader-spinner";
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
import { RootState } from "../../store/store";
import { getOrCreateGuestId } from "../../helpers/getOrCreateGuestId";
import { useTooltip } from "../../context/TooltipContext";

const ProductCard = ({ name, item }: ProductCardProp) => {
  const guestId = getOrCreateGuestId();
  const [rating, setRating] = useState(3);
  const [favouriteClicked, setFavouriteClicked] = useState(false);

  const [openNegotiationModal, setOpenNegotiationModal] = useState(false);

  const { refetch: getCartRefresh } = useGetCartApiQuery({});
  const { refetch: getGuestCartRefresh } = useGetGuestCartQuery({
    guest_id: guestId,
  });
  const { refetch: getWishlistRefresh } = useGetWishlistApiQuery({});

  const [addToCartApi, { isLoading: addToCartloader }] =
    useAddToCartApiMutation();
  const [addToGuestCartApi, { isLoading: addToGuestCartloader }] =
    useAddGuestCartMutation();

  const [addToWishlistApi] = useCreateWishlistApiMutation();
  const [deleteWishlistApi] = useDeleteWishlistApiMutation();
  const { showTooltip, isVisible, content } = useTooltip();

  const user = useSelector((state: RootState) => state.userDetails.user);

  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.wishlistCart
  );

  useEffect(() => {
    if (wishlistItems) {
      const wishlistProduct = wishlistItems?.some(
        (wl) => wl.product_id === item.product_id
      );
      setFavouriteClicked(wishlistProduct);
    }
  }, [wishlistItems, item.product_id]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleItemClick = () => {
    navigate(`/product/${item.sku}`, { state: name });
  };

  // Add to cart api call
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

  // Add to wishlist api call
  const handleAddToWishlist = async () => {
    try {
      if (user) {
        const res = await addToWishlistApi({
          product_id: item.product_id,
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
        product_id: item.product_id,
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
  return (
    <>
      <div className="product_card_main_container">
        <div className="image_card">
          <div onClick={handleItemClick} className="product_link">
            <img
              src={item?.image_urls?.[0].local_url ?? saleko_green}
              className="product_image"
            />
          </div>
          {/* 
          {item.percentage_discount && (
            <span className="percentage_off">{Math.ceil(item.percentage_discount ?? 0)}% off</span>
          ) 
          // : (
          //   <span className="new_container">New</span>
          // )
          } */}

          <div className="favorite_icon">
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
        </div>

        <Link to={`/product/${item.sku}`} className="product_link">
          <div>
            <p className="product_name">{item.name}</p>
            <div className="rating_container">
              <Rating readonly initialValue={rating} size={12} />
              <span>3</span> {/* rating */}
            </div>
            <div className="product_price_container">
              <span
                // className={`product_price ${
                //   item.special_price !== "0.0000" && "product_price_red"
                // }`}
                className="product_price"
              >
                ₦{formatPrice(Number(item?.price) || 0)}
              </span>
              {/* {item.special_price !== "0.0000" && (
                <span className="product_former_price">
                  ₦{formatPrice(Number(item?.special_price) || 0)}
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
            <NegotiateIcon color="#084C3F" />
          </button>
        ) : (
          <button className="product_button" onClick={handleAddToCart}>
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
              <BiCartAdd className="product_button_cart_icon" size={19} />
            )}
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
