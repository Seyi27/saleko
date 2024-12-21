import React from "react";
import "./StoreCard.css";
import { StoreCardProp } from "../../types/types";
import StoreIconWhite from "../../assets/images/svg/StoreIconWhite";
import CustomButton from "../custom-button/CustomButton";
import StoreIconGreen from "../../assets/images/svg/StoreIconGreen";

const StoreCard = ({ item }: StoreCardProp) => {
  return (
    <div className="store_card_container">
      {/* <img src={StoreIconGreen} /> */}
      <div className="store_image_placeholder">
        <StoreIconGreen width="50" height="46"/>
      </div>
      
      <p>{item.name}</p>
      <span>{item.orders} Orders</span>

      <CustomButton
        label="View Store"
        width={"100%"}
        height="33px"
        bgColor="#084c3f"
        borderColor="#DFDFDF"
        borderWidth="1px"
        textColor="white"
        fontSize={12}
        fontWeight={600}
        borderRadius="20px"
        icon={<StoreIconWhite />}
      />
    </div>
  );
};

export default StoreCard;
