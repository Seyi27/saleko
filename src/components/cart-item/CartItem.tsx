import React, { useEffect, useRef, useState } from "react";
import "./CartItem.css";
import { ProductCardProp } from "../../types/types";
import store_ic from "../../assets/images/svg/store_ic_outline.svg";
import { BsHeart, BsHeartFill, BsTrash3 } from "react-icons/bs";
import { formatPrice } from "../../helpers/helper";
import saleko_green from "../../assets/images/svg/saleko_green.svg";
import { CartItemProp } from "../../types/cartTypes";
import {
  useCreateWishlistApiMutation,
  useDeleteCartApiMutation,
  useDeleteGuestCartMutation,
  useDeleteWishlistApiMutation,
  useGetCartApiQuery,
  useGetGuestCartQuery,
  useGetWishlistApiQuery,
  useUpdateCartApiMutation,
  useUpdateGuestCartMutation,
} from "../../services/cartsApi";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../slice/cartSlice";
import { showCustomToast } from "../custom-toast/CustomToast";
import { TailSpin } from "react-loader-spinner";
import { RootState } from "../../store/store";
import { useTooltip } from "../../context/TooltipContext";
import { getOrCreateGuestId } from "../../helpers/getOrCreateGuestId";

const CartItem = ({ item }: CartItemProp) => {
  const guestId = getOrCreateGuestId();
  const [count, setCount] = useState(item.quantity);
  const [updateLoader, setUpdateLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [disabledState, setDisabledState] = useState(false);
  const [favouriteClicked, setFavouriteClicked] = useState(false);

  const { showTooltip, isVisible, content } = useTooltip();

  const countIncrement = () => {
    // setCount(count + 1);
    handleUpdateCartApiCall(count + 1);
  };

  const countDecrement = () => {
    if (count > 1) {
      // setCount(count - 1);
      handleUpdateCartApiCall(count - 1);
    }
  };

  const { refetch: getCartRefresh } = useGetCartApiQuery({});
  const { refetch: getGuestCartRefresh } = useGetGuestCartQuery({
    guest_id: guestId,
  });
  const { refetch: getWishlistRefresh } = useGetWishlistApiQuery({});

  const [updateCartApi] = useUpdateCartApiMutation();
  const [deleteCartApi] = useDeleteCartApiMutation();

  const [updateGuestCartApi] = useUpdateGuestCartMutation();
  const [deleteGuestCartApi] = useDeleteGuestCartMutation();

  const [addToWishlistApi] = useCreateWishlistApiMutation();
  const [deleteWishlistApi] = useDeleteWishlistApiMutation();

  const dispatch = useDispatch();

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

  // Delete cart api call
  const handleDeleteCartApiCall = async () => {
    setDeleteLoader(true);

    const deleteCartProduct = {
      cart_id: item?.cart_id,
      product_id: item?.product_id,
      cart_item_id: item?.id,
    };

    const deleteGuestProduct = {
      guest_token: guestId,
      sku: item.sku,
    };

    try {
      const res = user
        ? await deleteCartApi(deleteCartProduct).unwrap()
        : await deleteGuestCartApi(deleteGuestProduct).unwrap();
      if (res) {
        showCustomToast({
          message: "Product deleted successfully",
          type: "success",
        });

        if (user) {
          getCartRefresh();
        } else {
          getGuestCartRefresh();
        }

        setDeleteLoader(false);

        // guest res
        if (!res.data) {// empty cart i.e for if the last data is deleted, the data is null
          dispatch(
            addCart({
              cart: [],
              total_price: 0,
            })
          );
        }

        // User res
        if (res.data.cart_deleted) {// empty cart i.e for if the last data is deleted, the data is null
          dispatch(
            addCart({
              cart: [],
              total_price: 0,
            })
          );
        }
      }
    } catch (error) {
      // showCustomToast({
      //   message: "Check your internet connection. Please try again later..",
      //   type: "error",
      // });
      setDeleteLoader(false);
    }
  };

  // Update cart api call
  const handleUpdateCartApiCall = async (countArg: number) => {
    setUpdateLoader(true);
    setDisabledState(true);

    const updateCartProduct = {
      cart_id: item.cart_id,
      product_id: item.product_id,
      quantity: countArg,
    };

    const updateGuestCartProduct = {
      guest_token: guestId,
      sku: item.sku,
      quantity: countArg,
    };

    try {
      const res = user
        ? await updateCartApi(updateCartProduct).unwrap()
        : await updateGuestCartApi(updateGuestCartProduct).unwrap();
      if (res) {
        showCustomToast({
          message: "Product added successfully",
          type: "success",
        });
        setUpdateLoader(false);
        setDisabledState(false);
        setCount(countArg);

        if (user) {
          getCartRefresh();
        } else {
          getGuestCartRefresh();
        }
      }
    } catch (error) {
      showCustomToast({
        message: "Check your internet connection. Please try again later..",
        type: "error",
      });
      setUpdateLoader(false);
      setDisabledState(false);
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
    <div className="cart_item_parent_container">
      {/* Parent left column container */}
      <div className="parent_left_container">
        <img
          src={item.images?.[0] ?? saleko_green}
          className="cart_item_image"
        />

        {/* left column container */}
        <div className="left_column_container">
          <div>
            <div className="row_style">
              <img src={store_ic} />
              <p style={{ color: "#084C3F" }}>{item.seller?.business_name}</p>
            </div>

            <div style={{ padding: "5px" }}></div>

            <p className="cart_item_name">{item.name}</p>

            <p className="cart_item_units">In Stock (500 units)</p>

            <p className="cart_item_price display_no_price_deskop">
              ₦{formatPrice(Number(item?.price) || 0)}
            </p>
          </div>

          <div className="cart_count_increase_decrease_container">
            <div
              onClick={!disabledState ? countDecrement : undefined}
              className="cart_count_operator"
              style={{
                opacity: disabledState ? 0.5 : 1,
                pointerEvents: disabledState ? "none" : "auto",
              }}
            >
              -
            </div>
            <div className="cart_count_value">
              {updateLoader ? (
                <TailSpin
                  visible={true}
                  height={"20"}
                  width={"20"}
                  color={"#084C3F"}
                  ariaLabel="tail-spin-loading"
                  radius="2"
                  wrapperStyle={{}}
                  strokeWidth={3}
                  wrapperClass="product_button_cart_icon"
                />
              ) : (
                count
              )}
            </div>
            <div
              onClick={!disabledState ? countIncrement : undefined}
              className="cart_count_operator"
              style={{
                opacity: disabledState ? 0.5 : 1,
                pointerEvents: disabledState ? "none" : "auto",
              }}
            >
              +
            </div>
          </div>
        </div>
      </div>

      {/* right column container */}
      <div className="right_column_container">
        <p className="cart_item_price display_no_price_mobile">
          ₦{formatPrice(Number(item?.price) || 0)}
        </p>

        <div className="row_style_container">
          <div className="row_style">
            <div style={{ cursor: "pointer" }}>
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
            <p>Add to Wishlist</p>
          </div>
          {deleteLoader ? (
            <TailSpin
              visible={true}
              height={"20"}
              width={"20"}
              color={"red"}
              ariaLabel="tail-spin-loading"
              radius="2"
              wrapperStyle={{}}
              strokeWidth={3}
              wrapperClass="product_button_cart_icon"
            />
          ) : (
            <div
              className="row_style row_style_width"
              onClick={handleDeleteCartApiCall}
              style={{ cursor: "pointer" }}
            >
              <div style={{ cursor: "pointer" }}>
                <BsTrash3 color="#FA5661" />
              </div>
              <p style={{ color: "#FA5661" }}>Delete</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
