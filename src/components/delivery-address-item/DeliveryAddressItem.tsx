import React from "react";
import { BiEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import "./DeliveryAddressItem.css";
import { DeliveryAddressItemProp } from "../../types/appTypes";

const DeliveryAddressItem = ({ item, index }: DeliveryAddressItemProp) => {
  return (
    <div className="address_item_wrapper">
      <div className="address_street_wrapper">
        <p>Address {index + 1}</p>
        <p>{item.address}, {item.city}, {item.state}.</p>
      </div>

      <div className="address_icon_container">
        <div className="address_icon">
          <BiEdit color="#084C3F" />
          <p style={{ color: "#084C3F" }}>Edit</p>
        </div>
        <div className="address_icon">
          <BsTrash color="red" />
          <p style={{ color: "red" }}>Delete</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddressItem;
