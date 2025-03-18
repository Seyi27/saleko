import React from "react";
import "./ReviewMessage.css";
import { Rating } from "react-simple-star-rating";
import { ReviewMessageItemProp } from "../../types/types";

const ReviewMessage = ({ item }: ReviewMessageItemProp) => {
  return (
    <div className="review_message_container">
      <h3>Title: {item.title}</h3>
      <Rating readonly initialValue={item.rating} size={22} />
      <p>{item.review}</p>
      <div>
        <span>{item.date} - </span>
        <span>by {item.person}</span>
      </div>

      <hr
        style={{
          border: "0.5px solid #e5e7eb",
        }}
      />
    </div>
  );
};

export default ReviewMessage;
