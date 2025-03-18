import React from "react";
import "./TopStoreSection.css";
import { TopStoreSectionProps } from "../../types/types";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import TopStoreCard from "../top-store-card/TopStoreCard";

const TopStoreSection = ({ name, data }: TopStoreSectionProps) => {
  const navigate = useNavigate();

  const displayStoreData = data.slice(0, 5); // Limit to the first 6 products

  return (
    <div className="store_section_container">
      <div className="store_name_container">
        <span>{name}</span>

        <div
          className="store_view_container"
          onClick={() => navigate("/store-list")}
        >
          <span>View All</span>
          <BsArrowRight size={12} />
        </div>
      </div>

      <hr style={{ border: "0.5px solid #e5e7eb" }} />

      <div className="store_section_row">
        {displayStoreData.map((item, index) => (
          <TopStoreCard item={item} />
        ))}
      </div>
    </div>
  );
};

export default TopStoreSection;
