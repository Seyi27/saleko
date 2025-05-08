import React from "react";
import "./TopStoreCard.css";
import { TopStoreCardProp } from "../../types/types";
import StoreIconWhite from "../../assets/images/svg/StoreIconWhite";
import CustomButton from "../custom-button/CustomButton";
import StoreIconGreen from "../../assets/images/svg/StoreIconGreen";
import saleko_green from '../../assets/images/svg/saleko_green.svg'

const TopStoreCard = ({ item }: TopStoreCardProp) => {
  return (
    <div className="store_card_container">
      <img src={item?.logo_image_url ?? saleko_green} className="store_image_placeholder"/>
      
      <p>{item?.shop_title}</p>
      <span>{item?.orders_count} Orders</span>

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

export default TopStoreCard;
