import React from "react";
import "./StoreListCard.css";
import { StoreListCardItemProp, StoreListCardProp } from "../../types/types";
import saleko_green from "../../assets/images/svg/saleko_green.svg";
import CustomButton from "../custom-button/CustomButton";
import { useNavigate } from "react-router-dom";

const StoreListCard = ({ item }: StoreListCardItemProp) => {
  const navigate = useNavigate();

  const truncateText = (text: string): string => {
    return text.length > 10 ? text.slice(0, 10) + "..." : text;
  };

  const handleViewStore = (id: number) => {
    navigate(`/store-details/${id}`);
  };

  return (
    <div className="store_list_card_container">
      <div className="store_list_card_image_wrapper">
        <img src={saleko_green} className="store_list_card_bg_img" />

        <span className="store_list_card_category_pill">{item.category}</span>

        <span className="store_list_card_market_pill">
          {truncateText(item.store_market)}
        </span>

        <img src={saleko_green} className="store_list_card_store_img" />
      </div>

      <div className="store_list_card_storename_container">
        <p>{item.store_name}</p>

        <CustomButton
          label="Visit Store"
          width={"40%"}
          height="25px"
          bgColor="#084C3F"
          textColor="white"
          borderRadius="30px"
          fontSize={10}
          fontWeight={600}
          onClick={() => handleViewStore(item.id)}
        />
      </div>
    </div>
  );
};

export default StoreListCard;
