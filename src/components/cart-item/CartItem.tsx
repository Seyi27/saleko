import React, { useState } from "react";
import "./CartItem.css";
import { ProductCardProp } from "../../types/types";
import store_ic from "../../assets/images/svg/store_ic_outline.svg";
import { BsHeart, BsTrash3 } from "react-icons/bs";
import { formatPrice } from "../../helpers/helper";

const CartItem = ({ item }: ProductCardProp) => {
  const [count, setCount] = useState(0);

  const countIncrement = () => {
    setCount(count + 1);
  };

  const countDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="cart_item_parent_container">
      <img src={item.productImages?.[0].small_image_url} className="cart_item_image" />

      <div className="parent_row_container">
        {/* Top row */}
        <div className="top_row_container">
          <div>
            <div className="row_style">
              <img src={store_ic} />
              <p style={{ color: "#084C3F" }}>ChowMart</p>
            </div>

            <p className="cart_item_name">{item.name}</p>

            <p className="cart_item_units">In Stock (500 units)</p>
          </div>

          <p className="cart_item_price">₦{formatPrice(item.price)}</p>
        </div>

        {/* Bottom row */}
        <div className="bottom_row_container">
          <div className="count_increase_decrease_container">
            <div onClick={countDecrement} style={{ cursor: "pointer" }}>
              -
            </div>
            <div className="count_container count_style">{count}</div>
            <div onClick={countIncrement} style={{ cursor: "pointer" }}>
              +
            </div>
          </div>

          <div className="row_style">
            <div className="row_style">
              <div style={{ cursor: "pointer" }}>
                <BsHeart />
              </div>
              <p>Add to Wishlist</p>
            </div>
            <div className="row_style">
              <div style={{ cursor: "pointer" }}>
                <BsTrash3 color="#FA5661" />
              </div>
              <p style={{ color: "#FA5661" }}>Delete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
