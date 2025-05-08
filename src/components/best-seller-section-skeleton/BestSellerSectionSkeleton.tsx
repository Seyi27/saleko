import React from "react";
import "./BestSellerSectionSkeleton.css";
import BestSellerCardSkeleton from "../best-seller-card-skeleton/BestSellerCardSkeleton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BestSellerSectionSkeleton = () => {
  return (
    <div className="best_seller_section_container">
      <div className="best_seller_section_row">
        {/* First Column */}
        <div className="best_seller_section_first_row">
          <BestSellerCardSkeleton cards={3} />
        </div>

        {/* Second Column */}
        <div className="best_seller_section_second_row">
          <div className="best_seller_second_row_image_card">
            <Skeleton height={300} width={300} borderRadius={15} />
          </div>

          <Skeleton />
          <Skeleton style={{ marginTop: "20px" }} />

          <Skeleton style={{ marginTop: "10px" }} />

          <Skeleton
            height={40}
            width={`100%`}
            borderRadius={20}
            style={{ marginTop: "30px" }}
          />
        </div>

        {/* Third Column */}
        <div className="best_seller_section_third_row">
          <BestSellerCardSkeleton cards={3} />
        </div>
      </div>
    </div>
  );
};

export default BestSellerSectionSkeleton;
