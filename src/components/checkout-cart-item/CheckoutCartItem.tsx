import React from "react";
import "./CheckoutCartItem.css";
import { ProductCardProp } from "../../types/types";
import { formatPrice } from "../../helpers/helper";

const CheckoutCartItem = ({ item }: ProductCardProp) => {
  return (
    <div>
      <div className="checkout_cart_item_container">
        <img src={item.productImages?.[0].medium_image_url} className="checkout_cart_item_image" />

        <div className="checkout_cart_item_body_container">
          <p style={{ fontWeight: 700 }}>{item.name}</p>

          <p style={{ color: "#474747" }}>₦{formatPrice(item.price)}</p>

          <p style={{ color: "#474747" }}>x1</p>
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
