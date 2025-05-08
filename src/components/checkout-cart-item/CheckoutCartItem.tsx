import React from "react";
import "./CheckoutCartItem.css";
import { ProductCardProp } from "../../types/types";
import { formatPrice } from "../../helpers/helper";
import saleko_green from "../../assets/images/svg/saleko_green.svg";
import { CartItemProp } from "../../types/cartTypes";

const CheckoutCartItem = ({ item }: CartItemProp) => {
  return (
    <div>
      <div className="checkout_cart_item_container">
        <img
          src={item.images?.[0] ?? saleko_green}
          className="checkout_cart_item_image"
        />

        <div className="checkout_cart_item_body_container">
          <p style={{ fontWeight: 700 }}>{item.name}</p>

          <p style={{ color: "#474747" }}>
            {" "}
            ₦{formatPrice(Number(item?.price) || 0)}
          </p>

          <p style={{ color: "#474747" }}>x{item.quantity}</p>
        </div>
      </div>

      <hr
        style={{
          border: "0.5px solid #E7E9EB",
          marginTop: "15px",
          marginBottom: "15px",
        }}
      />
    </div>
  );
};

export default CheckoutCartItem;
